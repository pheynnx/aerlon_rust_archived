use askama::Template;
use axum::{
    extract::{Path, State},
    response::{Html, IntoResponse},
};
use http::Request;
use std::{collections::HashMap, sync::Arc};

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
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let index = state.cache_blog_state.blog_index.clone();

    Ok(Html(index))
}

pub async fn get_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_slug = params.get("slug");

    match post_slug {
        Some(post_slug) => match state.cache_blog_state.blog_posts_map.get(post_slug) {
            Some(v) => Ok(Html(v.clone())),
            None => Err(AppError::Custom("not found".to_string())),
        },
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
