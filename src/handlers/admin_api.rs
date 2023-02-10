use axum::extract::{Path, State};
use axum::response::IntoResponse;
use axum::Json;
use std::collections::HashMap;
use std::sync::Arc;

use crate::errors::AppError;
use crate::models::post::Post;
use crate::AppState;

pub async fn admin_get_posts_api(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let posts = Post::get_posts_postgres(&state.databases.postgres.postgres_pool).await?;

    Ok(Json(posts))
}

pub async fn admin_get_post_api(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let post_id = params.get("id");

    match post_id {
        Some(post_id) => {
            let post =
                Post::get_post_by_id_postgres(&state.databases.postgres.postgres_pool, post_id)
                    .await?;

            Ok(Json(post))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}

// pub async fn admin_create_post_handler(
//     State(state): State<Arc<AppState>>,
//     extract::Json(post_payload): extract::Json<Post>,
// ) -> Result<impl IntoResponse, AppError> {
//     let postgres_con = state.databases.postgres.new_connection().await?;

//     let created_post = Post::create_post_postgres(postgres_con, post_payload).await?;
//     state.databases.update_cache().await?;
//     Ok(Json(created_post))
// }

// pub async fn admin_update_post_handler(
//     State(state): State<Arc<AppState>>,
//     Path(params): Path<HashMap<String, String>>,
//     extract::Json(post_payload): extract::Json<Post>,
// ) -> Result<impl IntoResponse, AppError> {
//     let post_id = params.get("id");

//     let postgres_con = state.databases.postgres.new_connection().await?;

//     match post_id {
//         Some(post_id) => {
//             let updated_post =
//                 Post::update_post_postgres(postgres_con, post_id, post_payload).await?;
//             state.databases.update_cache().await?;
//             Ok(Json(updated_post))
//         }
//         None => Err(AppError::Custom(String::from("missing parameter"))),
//     }
// }

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
