use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use std::env;

use crate::errors::AppError;

pub struct PostgresDatabase {
    pub postgres_pool: Pool<Postgres>,
}

impl PostgresDatabase {
    pub async fn connect_to_postgres() -> Result<PostgresDatabase, AppError> {
        let postgres_url = env::var("DATABASE_URL").unwrap();

        let postgres_pool = PgPoolOptions::new()
            .max_connections(5)
            .connect(&postgres_url)
            .await?;

        Ok(PostgresDatabase { postgres_pool })
    }
}
