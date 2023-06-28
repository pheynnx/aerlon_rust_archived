use askama::Template;
use axum::{
    error_handling::HandleErrorLayer,
    extract::{Path, State},
    handler::Handler,
    middleware,
    response::{Html, IntoResponse},
    routing::{get, post},
    BoxError, Router,
};
use comrak::{markdown_to_html, ComrakOptions};
use dotenvy::dotenv;
use generator::CachedBlogState;
use http::{Request, StatusCode};
use models::post::Post;
use std::{collections::HashMap, net::SocketAddr, sync::Arc};
use tokio::{fs, sync::Mutex};
use tower::ServiceBuilder;
use tower_cookies::CookieManagerLayer;
use tower_governor::{errors::display_error, governor::GovernorConfigBuilder, GovernorLayer};
use tower_http::services::{ServeDir, ServeFile};
use utilities::templates::HtmlTemplate;

use database::{initialize_connections, DatabaseState};
use errors::AppError;
use handlers::{
    admin::{
        admin_handler, admin_logout_me_handler, get_admin_login_handler, post_admin_login_handler,
    },
    admin_api::{
        admin_create_post_handler, admin_get_post_api, admin_get_posts_api, admin_update_post_api,
    },
    blog::{get_metas_handler, get_post_handler},
    rng::{rng_hander, rng_value},
};
use middlewares::{
    admin::{admin_api_middleware, admin_auth_middleware, admin_login_middleware},
    metrics::layer::MetricsMiddleware,
};

mod database;
mod errors;
mod generator;
mod handlers;
mod middlewares;
mod models;
mod utilities;

#[derive(Clone)]
pub struct AppState {
    pub databases: DatabaseState,
    pub cache_blog_state: CachedBlogState,
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    dotenv().expect(".env file not found");

    let database_state = initialize_connections().await?;
    let cache_blog_state = CachedBlogState::generator(&database_state).await;

    let shared_state = Arc::new(Mutex::new(AppState {
        databases: database_state,
        cache_blog_state,
    }));

    let governor_conf = Box::new(
        GovernorConfigBuilder::default()
            .per_second(1)
            .burst_size(10)
            .finish()
            .unwrap(),
    );

    let site_router = Router::new()
        .route(
            "/",
            get(|| async {
                HtmlTemplate(StationTemplate {
                    uri: "".to_string(),
                })
            }),
        )
        .route("/blog", get(get_metas_handler))
        .route("/blog/:slug", get(get_post_handler))
        // .route("/series", get(get_series_handler))
        // .route("/series/:series", get(get_series_metas_handler))
        // .route("/category/:category", get(get_categories_handler))
        .route("/benchmarks", get(benchmarks_handler))
        .route("/rng", get(rng_hander))
        .route("/rng_value", get(rng_value))
        .route("/readme", get(readme_handler));
    // .layer(
    // ServiceBuilder::new()
    //     .layer(HandleErrorLayer::new(|_: BoxError| async move {
    //         StatusCode::REQUEST_TIMEOUT
    //     }))
    //     .layer(MetricsMiddleware::new(shared_state.clone()))
    //     .layer(HandleErrorLayer::new(|e: BoxError| async move {
    //         display_error(e)
    //     }))
    //     .layer(GovernorLayer {
    //         config: Box::leak(governor_conf),
    //     }),
    // );

    let admin_router = Router::new()
        .nest(
            "/",
            Router::new()
                .route("/", get(admin_handler))
                .layer(middleware::from_fn(admin_auth_middleware)),
        )
        .nest(
            "/login",
            Router::new().route(
                "/",
                get(get_admin_login_handler.layer(middleware::from_fn(admin_login_middleware)))
                    .post(post_admin_login_handler),
            ),
        )
        .nest(
            "/logout",
            Router::new().route(
                "/",
                post(admin_logout_me_handler).layer(middleware::from_fn(admin_api_middleware)),
            ),
        )
        .nest(
            "/api",
            Router::new()
                .route(
                    "/post",
                    get(admin_get_posts_api).post(admin_create_post_handler),
                )
                .route(
                    "/post/:id",
                    get(admin_get_post_api).post(admin_update_post_api),
                )
                .layer(middleware::from_fn(admin_api_middleware)),
        );

    let app = Router::new()
        .route_service(
            "/favicon.ico",
            ServeFile::new("./public/favicon/favicon.ico"),
        )
        .nest("/", site_router)
        .nest("/admin", admin_router)
        .nest_service("/public", ServeDir::new("./public"))
        .fallback(error_fallback)
        .layer(ServiceBuilder::new().layer(CookieManagerLayer::new()))
        .with_state(shared_state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8040));
    println!("🔶 startup: listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service_with_connect_info::<SocketAddr>())
        .await
        .unwrap();

    Ok(())
}

#[derive(Template)]
#[template(path = "station.html.j2")]
struct StationTemplate {
    uri: String,
}

#[derive(Template)]
#[template(path = "error.html.j2")]
struct ErrorTemplate {
    error: String,
    status_code: u16,
    uri: String,
}

// Temp handler; need to be handled correctly and moved
async fn error_fallback<T>(req: Request<T>) -> Result<impl IntoResponse, AppError> {
    let template = ErrorTemplate {
        status_code: StatusCode::NOT_FOUND.as_u16(),
        error: format!("path {} not found", req.uri().to_string()),
        uri: req.uri().to_string(),
    };
    Ok((StatusCode::NOT_FOUND, HtmlTemplate(template)))
}

#[derive(Template)]
#[template(path = "readme.html.j2")]
struct ReadmeTemplate {
    readme_markdown: String,
    uri: String,
}

// Temp handler; need to be handled correctly and moved
async fn readme_handler<T>(req: Request<T>) -> Result<impl IntoResponse, AppError> {
    let file_contents = fs::read_to_string("./README.md").await.unwrap_or_default();

    let readme_markdown = markdown_to_html(&file_contents, &ComrakOptions::default());

    Ok(HtmlTemplate(ReadmeTemplate {
        readme_markdown,
        uri: req.uri().to_string(),
    }))
}

#[derive(Template)]
#[template(path = "benchmarks.html.j2")]
struct BenchmarksTemplate {
    uri: String,
}

async fn benchmarks_handler<T>(req: Request<T>) -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(BenchmarksTemplate {
        uri: req.uri().to_string(),
    }))
}
