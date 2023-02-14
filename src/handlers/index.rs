use askama::Template;
use axum::{
    extract::{Path, State},
    response::IntoResponse,
};
use http::{Request, Uri};
use std::{collections::HashMap, sync::Arc};

use crate::{
    errors::AppError,
    models::{dtos::meta::Meta, post::Post},
    services::{get_metas_sorted, get_post_by_slug},
    utilities::templates::HtmlTemplate,
    AppState,
};

#[derive(Template)]
#[template(path = "index.html.j2")]
struct IndexTemplate {
    metas: Vec<Meta>,
    url: String,
}

pub async fn get_metas_handler<T>(
    State(state): State<Arc<AppState>>,
    req: Request<T>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let metas = get_metas_sorted(redis_con).await?;

    let template = IndexTemplate {
        metas,
        url: req.uri().to_string(),
    };

    Ok(HtmlTemplate(template))
}

#[derive(Template)]
#[template(path = "index_$post.html.j2")]
struct IndexPostTemplate {
    post: Post,
}

pub async fn get_post_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_slug = params.get("slug");

    let redis_con = state.databases.redis.new_connection().await?;

    match post_slug {
        Some(post_slug) => {
            let post = get_post_by_slug(redis_con, post_slug).await?;

            let template = IndexPostTemplate { post };

            Ok(HtmlTemplate(template))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
