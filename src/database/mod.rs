use self::{postgres::PostgresDatabase, redis::RedisDatabase};
use crate::{errors::AppError, models::post::Post};

pub mod postgres;
pub mod redis;

pub struct DatabaseState {
    pub redis: RedisDatabase,
    pub postgres: PostgresDatabase,
}

pub async fn initialize_connections() -> Result<DatabaseState, AppError> {
    let redis = RedisDatabase::connect_to_redis().await?;

    let postgres = PostgresDatabase::connect_to_postgres().await?;

    Ok(DatabaseState { redis, postgres })
}

impl DatabaseState {
    pub async fn startup_cache(&self) -> Result<(), AppError> {
        let posts = Post::get_published_posts_postgres(&self.postgres.postgres_pool).await?;

        let mut redis_con = self.redis.new_connection().await?;

        redis_con.set_cache_redis(&posts).await?;

        println!("💾 pre-startup: posts cached in redis");

        Ok(())
    }

    pub async fn update_cache(&self) -> Result<(), AppError> {
        let posts = Post::get_published_posts_postgres(&self.postgres.postgres_pool).await?;

        let mut redis_con = self.redis.new_connection().await?;

        redis_con.set_cache_redis(&posts).await?;

        let now = chrono::offset::Local::now();

        println!("💾 runtime: posts updated in redis cache, {}", now);

        Ok(())
    }
}
