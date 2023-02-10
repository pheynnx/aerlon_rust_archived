use chrono::NaiveDateTime;
use comrak::{
    markdown_to_html_with_plugins,
    plugins::syntect::{SyntectAdapter, SyntectAdapterBuilder},
    ComrakOptions, ComrakPlugins,
};
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use sqlx::{query_as, FromRow, Pool, Postgres};
use syntect::highlighting::ThemeSet;
use uuid::Uuid;

use crate::{database::redis::RedisConnection, errors::AppError};

static SYNTECT_ADAPTER: Lazy<SyntectAdapter> = {
    Lazy::new(|| {
        let themes = ThemeSet::load_from_folder("./themes").unwrap();
        SyntectAdapterBuilder::new()
            .theme_set(themes)
            .theme("halcyon")
            .build()
    })
};

#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct Post {
    #[serde(rename = "id")]
    pub post_id: Option<Uuid>,
    pub date: NaiveDateTime,
    pub slug: String,
    pub title: String,
    pub series: String,
    pub categories: Vec<String>,
    pub markdown: String,
    #[serde(rename = "created_at")]
    pub post_created_at: Option<NaiveDateTime>,
    #[serde(rename = "updated_at")]
    pub post_updated_at: Option<NaiveDateTime>,
}

// state modifiers
impl Post {
    pub fn convert_markdown_to_html(&mut self) {
        let mut options = ComrakOptions::default();
        options.extension.autolink = true;
        options.extension.header_ids = Some(String::from(""));
        options.render.unsafe_ = true;
        let mut plugins = ComrakPlugins::default();

        plugins.render.codefence_syntax_highlighter = Some(&*SYNTECT_ADAPTER);

        let converted = markdown_to_html_with_plugins(&self.markdown, &options, &plugins);
        self.markdown = converted;
    }
}

// redis methods
impl Post {
    pub async fn get_posts_redis(mut redis_con: RedisConnection) -> Result<Vec<Self>, AppError> {
        let posts: Vec<Post> = redis_con.get_cache_redis().await?;

        Ok(posts)
    }
}

// postgres methods
impl Post {
    pub async fn get_posts_postgres(postgres_pool: &Pool<Postgres>) -> Result<Vec<Self>, AppError> {
        let posts = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, created_at as "post_created_at?", updated_at as "post_updated_at?" from post"#)
            .fetch_all(postgres_pool)
            .await?;

        Ok(posts)
    }

    pub async fn get_post_by_id_postgres(
        postgres_pool: &Pool<Postgres>,
        post_id: &str,
    ) -> Result<Self, AppError> {
        let id = Uuid::parse_str(&post_id)?;

        let post = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, created_at as "post_created_at?", updated_at as "post_updated_at?" from post where id = $1"#, &id)
            .fetch_one(postgres_pool)
            .await?;

        Ok(post)
    }

    // pub async fn create_post_postgres<'a>(
    //     postgres_pool: &Pool<Postgres>,
    //     new_post: Post,
    // ) -> Result<Self, AppError> {
    //     let row = query_as!(Post, r#"INSERT INTO post (slug, title, series, categories, markdown, date) VALUES ($1, $2, $3, $4, $5, $6) returning id as "post_id?", date, slug, title, series, categories, markdown, created_at as "post_created_at?", updated_at as "post_updated_at?""#, new_post.slug, new_post.title, new_post.series, &new_post.categories, new_post.markdown, new_post.date).fetch_one(postgres_pool).await?;

    //     Ok(row)
    // }

    // pub async fn update_post_postgres<'a>(
    //     postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
    //     post_id: &str,
    //     updated_post: Post,
    // ) -> Result<Self, AppError> {
    //     let id = uuid::Uuid::parse_str(&post_id).unwrap();

    //     let row = postgres_con.query_one("UPDATE post SET title = $2, series = $3, categories = $4, markdown = $5, date = $6 WHERE id = $1 RETURNING *", &[&id, &updated_post.title, &updated_post.series, &updated_post.categories, &updated_post.markdown, &updated_post.date]).await?;

    //     Ok(Post::try_from(row).unwrap())
    // }

    // pub async fn delete_post_postgres<'a>(
    //     postgres_con: PooledConnection<'a, PostgresConnectionManager<MakeTlsConnector>>,
    //     post_id: &str,
    // ) -> Result<(), AppError> {
    //     let id = uuid::Uuid::parse_str(&post_id).unwrap();

    //     let _ = postgres_con
    //         .query_one("DELETE FROM post WHERE id = $1", &[&id])
    //         .await;

    //     Ok(())
    // }
}
