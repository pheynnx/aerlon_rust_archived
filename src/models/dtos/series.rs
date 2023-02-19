use serde::{Deserialize, Serialize};

use crate::{database::redis::RedisConnection, errors::AppError};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Series {
    pub series: String,
    pub published: bool,
}

impl Series {
    pub async fn get_series_redis(mut redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
        let series: Vec<Series> = redis_con.get_cache_redis().await?;

        Ok(series)
    }
}
