use askama::Template;
use axum::response::{Html, IntoResponse};
use rand::Rng;

use crate::{errors::AppError, utilities::templates::HtmlTemplate};

#[derive(Template)]
#[template(path = "rng.html.j2")]
struct RngTemplate {
    uri: String,
}

pub async fn rng_hander() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(RngTemplate {
        uri: "/rng".to_string(),
    }))
}

pub async fn rng_value() -> Result<impl IntoResponse, AppError> {
    let num = rand::thread_rng().gen_range(0..100);

    Ok(Html(num.to_string()))
}
