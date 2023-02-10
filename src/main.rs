use askama::Template;
use axum::{
    handler::Handler,
    middleware,
    response::{Html, IntoResponse},
    routing::{get, get_service},
    Router,
};
use dotenvy::dotenv;
use http::StatusCode;
use std::{net::SocketAddr, sync::Arc};
use tower_cookies::CookieManagerLayer;
use tower_http::services::ServeDir;
use utilities::templates::HtmlTemplate;

use crate::{
    handlers::{
        admin::{
            admin_handler, admin_new_handler, admin_update_handler, get_admin_login_handler,
            post_admin_login_handler,
        },
        admin_api::{admin_get_post_api, admin_get_posts_api},
    },
    middlewares::admin::{admin_api_middleware, admin_auth_middleware, admin_login_middleware},
};
use database::{initialize_connections, DatabaseState};
use errors::AppError;
use handlers::{
    category::get_categories_handler,
    index::{get_metas_handler, get_post_handler},
    series::{get_series_handler, get_series_metas_handler},
};

mod database;
mod errors;
mod handlers;
mod middlewares;
mod models;
mod services;
mod utilities;

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

    let site_router = Router::new()
        .route("/", get(get_metas_handler))
        .route("/:slug", get(get_post_handler))
        .route("/series", get(get_series_handler))
        .route("/series/:series", get(get_series_metas_handler))
        .route("/category/:category", get(get_categories_handler))
        .route("/about", get(about_handler));

    let admin_router = Router::new()
        .route("/", get(admin_handler))
        .route("/new", get(admin_new_handler))
        .route("/update", get(admin_update_handler))
        .layer(middleware::from_fn(admin_auth_middleware));

    let admin_login_router = Router::new().route(
        "/",
        get(get_admin_login_handler.layer(middleware::from_fn(admin_login_middleware)))
            .post(post_admin_login_handler),
    );

    let admin_api_router = Router::new()
        .route("/post", get(admin_get_posts_api))
        .route("/post/:id", get(admin_get_post_api))
        .layer(middleware::from_fn(admin_api_middleware));

    let app = Router::new()
        .nest("/", site_router)
        .nest("/admin", admin_router)
        .nest("/admin/login", admin_login_router)
        .nest("/admin/api", admin_api_router)
        .nest_service(
            "/public",
            get_service(ServeDir::new("./public")).handle_error(
                |error: std::io::Error| async move {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("unhandled internal error: {}", error),
                    )
                },
            ),
        )
        .fallback(error_fallback)
        .layer(CookieManagerLayer::new())
        .with_state(shared_state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8040));
    println!("🔶 startup: listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}

async fn error_fallback() -> Result<impl IntoResponse, AppError> {
    Ok((StatusCode::NOT_FOUND, Html("<h3>404</h3>")))
}

#[derive(Template)]
#[template(path = "about.html.j2")]
struct AboutTemplate {}

async fn about_handler() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AboutTemplate {}))
}
