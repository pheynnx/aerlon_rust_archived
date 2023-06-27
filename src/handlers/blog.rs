use askama::Template;
use axum::{
    extract::{Path, State},
    response::{Html, IntoResponse},
};
use http::Request;
use std::{collections::HashMap, sync::Arc};
use tokio::sync::Mutex;

use crate::{
    errors::AppError,
    models::{dtos::meta::Meta, post::Post},
    utilities::templates::HtmlTemplate,
    AppState,
};

// #[derive(Template)]
// #[allow(dead_code)]
// #[template(path = "blog.html.j2")]
// struct BlogTemplate {
//     metas: Vec<Meta>,
//     featured: Vec<Meta>,
//     uri: String,
// }

pub async fn get_metas_handler(
    State(state): State<Arc<Mutex<AppState>>>,
) -> Result<impl IntoResponse, AppError> {
    let data = state.lock().await;

    let index = data.cache_blog_state.blog_index.clone();

    Ok(Html(index))
}

pub async fn get_post_handler(
    State(state): State<Arc<Mutex<AppState>>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_slug = params.get("slug");

    let data = state.lock().await;

    match post_slug {
        Some(post_slug) => match data.cache_blog_state.blog_posts_map.get(post_slug) {
            Some(v) => Ok(Html(v.clone())),
            None => Err(AppError::Custom("not found".to_string())),
        },
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
