use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{errors::AppError, models::post::Post};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Meta {
    #[serde(rename = "id")]
    pub post_id: Option<Uuid>,
    pub date: DateTime<Utc>,
    pub slug: String,
    pub title: String,
    pub series: String,
    pub categories: Vec<String>,
    pub post_snippet: String,
    pub published: bool,
    pub featured: bool,
}

impl From<Post> for Meta {
    fn from(value: Post) -> Self {
        Self {
            post_id: value.post_id,
            date: value.date,
            slug: value.slug,
            title: value.title,
            series: value.series,
            categories: value.categories,
            post_snippet: value.post_snippet,
            published: value.published,
            featured: value.featured,
        }
    }
}

// redis methods
impl Meta {
    // pub async fn get_metas_redis(mut redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
    //     let metas: Vec<Meta> = redis_con.get_cache_redis().await?;

    //     Ok(metas)
    // }

    // pub async fn get_metas_sorted(redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
    //     let mut meta = Self::get_metas_redis(redis_con).await?;

    //     meta.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    //     Ok(meta)
    // }

    // pub async fn get_series_metas_sorted_by_name(
    //     redis_con: RedisConnection,
    //     series_name: &str,
    // ) -> Result<Vec<Self>, AppError> {
    //     let meta = Self::get_metas_redis(redis_con).await?;

    //     let mut series = meta
    //         .into_iter()
    //         .filter(|m| m.series == series_name)
    //         .collect::<Vec<Self>>();

    //     series.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    //     Ok(series)
    // }

    // pub async fn get_categories_metas_sorted_by_name(
    //     redis_con: RedisConnection,
    //     category_name: &str,
    // ) -> Result<Vec<Self>, AppError> {
    //     let meta = Self::get_metas_redis(redis_con).await?;

    //     let mut meta = meta
    //         .into_iter()
    //         .filter(|m| m.categories.contains(&category_name.to_string()))
    //         .collect::<Vec<Self>>();

    //     meta.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

    //     Ok(meta)
    // }
}
