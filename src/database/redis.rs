use redis::{aio, AsyncCommands, Client};
use std::env;

use crate::errors::AppError;

#[derive(Clone)]
pub struct RedisDatabase {
    pub redis_client: redis::Client,
}

pub struct RedisConnection {
    pub redis_connection: aio::Connection,
}

impl RedisDatabase {
    pub async fn connect_to_redis() -> Result<RedisDatabase, AppError> {
        let redis_address = env::var("REDIS_ADDRESS").unwrap();

        let redis_client = Client::open(format!("redis://{}", redis_address))?;

        Ok(RedisDatabase { redis_client })
    }

    pub async fn new_connection(&self) -> Result<RedisConnection, AppError> {
        let redis_connection = self.redis_client.get_async_connection().await?;

        Ok(RedisConnection { redis_connection })
    }
}

impl RedisConnection {
    pub async fn set_cache_redis<T: serde::Serialize>(
        &mut self,
        model: &Vec<T>,
    ) -> Result<(), AppError> {
        let serial = serde_json::to_string(model)?;

        let _ = self.redis_connection.set("posts_cache", serial).await?;

        Ok(())
    }

    pub async fn get_cache_redis<T: for<'de> serde::Deserialize<'de>>(
        &mut self,
    ) -> Result<Vec<T>, AppError> {
        let cache: String = self.redis_connection.get("posts_cache").await?;

        let posts: Vec<T> = serde_json::from_str(&cache)?;

        Ok(posts)
    }
}
