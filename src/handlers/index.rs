use askama::Template;
use axum::{
    extract::{Path, State},
    response::IntoResponse,
};
use http::Request;
use std::{collections::HashMap, sync::Arc};

use crate::{
    errors::AppError,
    models::{dtos::meta::Meta, post::Post},
    utilities::templates::HtmlTemplate,
    AppState,
};

#[derive(Template)]
#[allow(dead_code)]
#[template(path = "index.html.j2")]
struct IndexTemplate {
    metas: Vec<Meta>,
    featured: Vec<Meta>,
    uri: String,
}

pub async fn get_metas_handler<T>(
    State(state): State<Arc<AppState>>,
    req: Request<T>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let metas = Meta::get_metas_sorted(redis_con).await?;

    let (featured, metas) = metas.into_iter().partition(|p| p.featured);

    let template = IndexTemplate {
        metas,
        featured,
        uri: req.uri().to_string(),
    };

    Ok(HtmlTemplate(template))
}

#[derive(Template)]
#[template(path = "index_$post.html.j2")]
struct IndexPostTemplate {
    post: Post,
    uri: String,
}

pub async fn get_post_handler<T>(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
    req: Request<T>,
) -> Result<impl IntoResponse, AppError> {
    let post_slug = params.get("slug");

    let redis_con = state.databases.redis.new_connection().await?;

    match post_slug {
        Some(post_slug) => {
            let post = Post::get_post_by_slug(redis_con, post_slug).await?;

            let template = IndexPostTemplate {
                post,
                uri: req.uri().to_string(),
            };

            Ok(HtmlTemplate(template))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
