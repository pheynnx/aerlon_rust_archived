use serde::{Deserialize, Serialize};

use crate::{database::redis::RedisConnection, errors::AppError};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Series {
    pub series: String,
    pub published: bool,
    pub featured: bool,
    pub series_snippet: String,
}

// redis methods
impl Series {
    pub async fn get_series_redis(mut redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
        let series: Vec<Series> = redis_con.get_cache_redis().await?;

        Ok(series)
    }

    pub async fn get_series_sorted(redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
        let mut series = Self::get_series_redis(redis_con).await?;

        series.sort_by(|a, b| a.series.cmp(&b.series));
        series.dedup_by(|a, b| a.series == b.series);

        Ok(series)
    }
}
