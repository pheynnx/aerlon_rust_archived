use chrono::{DateTime, Utc};
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
        let themes = ThemeSet::load_from_folder("./code_themes").unwrap();
        SyntectAdapterBuilder::new()
            .theme_set(themes)
            .theme("eac")
            .build()
    })
};

#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct Post {
    #[serde(rename = "id")]
    pub post_id: Option<Uuid>,
    pub date: DateTime<Utc>,
    pub slug: String,
    pub title: String,
    pub series: String,
    pub categories: Vec<String>,
    pub markdown: String,
    pub published: bool,
    pub featured: bool,
    #[serde(rename = "created_at")]
    pub post_created_at: Option<DateTime<Utc>>,
    #[serde(rename = "updated_at")]
    pub post_updated_at: Option<DateTime<Utc>>,
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

// postgres site methods checking for published state
impl Post {
    pub async fn get_published_posts_postgres(
        postgres_pool: &Pool<Postgres>,
    ) -> Result<Vec<Self>, AppError> {
        let posts = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, published, featured, created_at as "post_created_at?", updated_at as "post_updated_at?" from post where published = true"#)
            .fetch_all(postgres_pool)
            .await?;

        Ok(posts)
    }

    #[allow(unused)]
    pub async fn get_published_post_by_id_postgres(
        postgres_pool: &Pool<Postgres>,
        post_id: &str,
    ) -> Result<Self, AppError> {
        let id = Uuid::parse_str(&post_id)?;

        let post = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, published, featured, created_at as "post_created_at?", updated_at as "post_updated_at?" from post where id = $1 and published = true"#, &id)
            .fetch_one(postgres_pool)
            .await?;

        Ok(post)
    }
}

// postgres admin api methods
impl Post {
    pub async fn get_posts_postgres(postgres_pool: &Pool<Postgres>) -> Result<Vec<Self>, AppError> {
        let posts = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, published, featured, created_at as "post_created_at?", updated_at as "post_updated_at?" from post"#)
            .fetch_all(postgres_pool)
            .await?;

        Ok(posts)
    }

    pub async fn get_post_by_id_postgres(
        postgres_pool: &Pool<Postgres>,
        post_id: &str,
    ) -> Result<Self, AppError> {
        let id = Uuid::parse_str(&post_id)?;

        let post = query_as!(Post, r#"select id as "post_id?", date, slug, title, series, categories, markdown, published, featured, created_at as "post_created_at?", updated_at as "post_updated_at?" from post where id = $1"#, &id)
            .fetch_one(postgres_pool)
            .await?;

        Ok(post)
    }

    #[allow(unused)]
    pub async fn create_post_postgres<'a>(
        postgres_pool: &Pool<Postgres>,
        new_post: Post,
    ) -> Result<Self, AppError> {
        let post = query_as!(Post, r#"insert into post (date, slug, title, series, categories, markdown, published, featured) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id as "post_id?", date, slug, title, series, categories, markdown, published, featured, created_at as "post_created_at?", updated_at as "post_updated_at?""#, &new_post.date, &new_post.slug, &new_post.title, &new_post.series, &new_post.categories, &new_post.markdown, &new_post.published, &new_post.featured).fetch_one(postgres_pool).await?;

        Ok(post)
    }

    pub async fn update_post_postgres<'a>(
        postgres_pool: &Pool<Postgres>,
        post_id: &str,
        updated_post: Post,
    ) -> Result<(), AppError> {
        let id = uuid::Uuid::parse_str(&post_id).unwrap();

        // let post = query_as!(Post, r#"update post SET title = $2, series = $3, categories = $4, markdown = $5, date = $6 where id = $1 returning id as "post_id?", date, slug, title, series, categories, markdown, published, created_at as "post_created_at?", updated_at as "post_updated_at?""#, &id, &updated_post.title, &updated_post.series, &updated_post.categories, &updated_post.markdown, &updated_post.date).fetch_one(postgres_pool).await?;

        let _ = query_as!(Post, r#"update post set date = $2, title = $3, slug = $4, series = $5, categories = $6, markdown = $7, published = $8, featured = $9 where id = $1"#, &id, &updated_post.date, &updated_post.title, &updated_post.slug, &updated_post.series, &updated_post.categories, &updated_post.markdown, &updated_post.published, &updated_post.featured).execute(postgres_pool).await?;

        Ok(())
    }

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
