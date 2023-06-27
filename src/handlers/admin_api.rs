use axum::extract::{self, Path, State};
use axum::response::IntoResponse;
use axum::Json;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::errors::AppError;
use crate::generator::CachedBlogState;
use crate::models::post::Post;
use crate::AppState;

pub async fn admin_get_posts_api(
    State(state): State<Arc<Mutex<AppState>>>,
) -> Result<impl IntoResponse, AppError> {
    let mut data = state.lock().await.clone();

    let posts = Post::get_posts_postgres(&data.databases.postgres.postgres_pool).await?;

    Ok(Json(posts))
}

pub async fn admin_get_post_api(
    State(state): State<Arc<Mutex<AppState>>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    let data = state.lock().await;

    match post_id {
        Some(post_id) => {
            let post =
                Post::get_post_by_id_postgres(&data.databases.postgres.postgres_pool, post_id)
                    .await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}

pub async fn admin_create_post_handler(
    State(state): State<Arc<Mutex<AppState>>>,
    extract::Json(post_payload): extract::Json<Post>,
) -> Result<impl IntoResponse, AppError> {
    let mut guard = state.lock().await;

    let deref_state = &mut *guard;

    let created_post =
        Post::create_post_postgres(&deref_state.databases.postgres.postgres_pool, post_payload)
            .await?;

    deref_state
        .cache_blog_state
        .updater(&deref_state.databases)
        .await;

    Ok(Json(created_post))
}

pub async fn admin_update_post_api(
    State(state): State<Arc<Mutex<AppState>>>,
    Path(params): Path<HashMap<String, String>>,
    extract::Json(post_payload): extract::Json<Post>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    let mut guard = state.lock().await;

    let deref_state = &mut *guard;

    match post_id {
        Some(post_id) => {
            let updated_post = Post::update_post_postgres(
                &deref_state.databases.postgres.postgres_pool,
                post_id,
                post_payload,
            )
            .await?;
            deref_state
                .cache_blog_state
                .updater(&deref_state.databases)
                .await;

            Ok(Json(updated_post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}

// pub async fn admin_delete_post_handler(
//     State(state): State<Arc<AppState>>,
//     Path(params): Path<HashMap<String, String>>,
// ) -> Result<impl IntoResponse, AppError> {
//     let post_id = params.get("id");

//     let postgres_con = state.databases.postgres.new_connection().await?;
//     match post_id {
//         Some(post_id) => {
//             Post::delete_post_postgres(postgres_con, post_id).await?;
//             state.databases.update_cache().await?;
//             Ok((StatusCode::OK).into_response())
//         }
//         None => Err(AppError::Custom(String::from("missing parameter"))),
//     }
// }
