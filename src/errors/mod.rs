use crate::utilities::templates::HtmlTemplate;
use askama::Template;
use axum::response::IntoResponse;
use http::StatusCode;
use redis::RedisError;

#[derive(Debug)]
pub enum AppError {
    Custom(String),
    Redis(RedisError),
    SerdeJson(serde_json::Error),
    Sqlx(sqlx::Error),
    Uuid(uuid::Error),
}

impl From<uuid::Error> for AppError {
    fn from(inner: uuid::Error) -> Self {
        AppError::Uuid(inner)
    }
}

impl From<sqlx::Error> for AppError {
    fn from(inner: sqlx::Error) -> Self {
        AppError::Sqlx(inner)
    }
}

impl From<RedisError> for AppError {
    fn from(inner: RedisError) -> Self {
        AppError::Redis(inner)
    }
}

impl From<serde_json::Error> for AppError {
    fn from(inner: serde_json::Error) -> Self {
        AppError::SerdeJson(inner)
    }
}

#[derive(Template)]
#[template(path = "error.html.j2")]
struct ErrorTemplate {
    error: String,
    status_code: StatusCode,
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        let (status, error_message) = match self {
            AppError::Redis(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::SerdeJson(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::Custom(error) => (StatusCode::UNPROCESSABLE_ENTITY, error),
            AppError::Sqlx(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
            AppError::Uuid(error) => (StatusCode::UNPROCESSABLE_ENTITY, error.to_string()),
        };

        let template = ErrorTemplate {
            error: error_message,
            status_code: status,
        };

        (StatusCode::UNPROCESSABLE_ENTITY, HtmlTemplate(template)).into_response()
    }
}
