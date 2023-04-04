use askama::Template;
use axum::{
    error_handling::HandleErrorLayer,
    handler::Handler,
    middleware,
    response::{Html, IntoResponse},
    routing::{get, post},
    BoxError, Router,
};
use dotenvy::dotenv;
use http::{Request, StatusCode};
use std::{net::SocketAddr, sync::Arc};
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
    category::get_categories_handler,
    index::{get_metas_handler, get_post_handler},
    series::{get_series_handler, get_series_metas_handler},
};
use middlewares::{
    admin::{admin_api_middleware, admin_auth_middleware, admin_login_middleware},
    metrics::layer::MetricsMiddleware,
};

mod database;
mod errors;
mod handlers;
mod middlewares;
mod models;
mod utilities;

#[derive(Clone)]
pub struct AppState {
    pub databases: DatabaseState,
}

#[tokio::main]
async fn main() -> Result<(), AppError> {
    dotenv().expect(".env file not found");

    let database_state = initialize_connections().await?;

    database_state.startup_cache().await?;

    let shared_state = Arc::new(AppState {
        databases: database_state,
    });

    let governor_conf = Box::new(
        GovernorConfigBuilder::default()
            .per_second(1)
            .burst_size(10)
            .finish()
            .unwrap(),
    );

    let site_router = Router::new()
        .route("/", get(get_metas_handler))
        .route("/:slug", get(get_post_handler))
        .route("/series", get(get_series_handler))
        .route("/series/:series", get(get_series_metas_handler))
        .route("/category/:category", get(get_categories_handler))
        .route("/about", get(about_handler))
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(|_: BoxError| async move {
                    StatusCode::REQUEST_TIMEOUT
                }))
                .layer(MetricsMiddleware::new(shared_state.clone()))
                .layer(HandleErrorLayer::new(|e: BoxError| async move {
                    display_error(e)
                }))
                .layer(GovernorLayer {
                    config: Box::leak(governor_conf),
                }),
        );

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

// Temp handler; need to be handled correctly and moved
async fn error_fallback() -> Result<impl IntoResponse, AppError> {
    Ok((StatusCode::NOT_FOUND, Html("<h3>404</h3>")))
}

#[derive(Template)]
#[template(path = "about.html.j2")]
struct AboutTemplate {
    uri: String,
}
// Temp handler; need to be handled correctly and moved
async fn about_handler<T>(req: Request<T>) -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AboutTemplate {
        uri: req.uri().to_string(),
    }))
}
