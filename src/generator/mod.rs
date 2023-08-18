use askama::Template;
use sqlx::{Pool, Postgres};
use std::collections::HashMap;

use crate::{
    database::DatabaseState,
    handlers::blog,
    models::{dtos::meta::Meta, post::Post},
};

#[derive(Clone)]
pub struct CachedBlogState {
    pub blog_index: String,
    pub blog_posts_map: HashMap<String, String>,
}

#[derive(Template)]
#[template(path = "blog_$post.aska")]
struct BlogPostTemplate {
    post: Post,
    uri: String,
}

#[derive(Template)]
#[allow(dead_code)]
#[template(path = "blog.aska")]
struct BlogTemplate {
    metas: Vec<Meta>,
    featured: Vec<Meta>,
    uri: String,
}

impl CachedBlogState {
    pub async fn generator(databases: &DatabaseState) -> Self {
        let posts = Post::get_published_posts_postgres(&databases.postgres.postgres_pool)
            .await
            .unwrap();

        let mut blog_index_vec: Vec<Meta> = vec![];
        let mut blog_posts_map = HashMap::new();

        for mut post in posts {
            post.convert_markdown_to_html();

            let blog_post_template = BlogPostTemplate {
                post: post.clone(),
                uri: "".to_string(),
            };
            let render = blog_post_template.render().unwrap();
            blog_posts_map.insert(post.slug.clone(), render);

            blog_index_vec.push(Meta::from(post))
        }

        blog_index_vec.sort_by(|a, b| b.date.cmp(&a.date).then(a.title.cmp(&b.title)));

        let (featured, metas) = blog_index_vec.into_iter().partition(|p| p.featured);

        let blog_index_template = BlogTemplate {
            metas,
            featured,
            uri: "/".to_string(),
        };
        let render = blog_index_template.render().unwrap();

        Self {
            blog_index: render,
            blog_posts_map,
        }
    }

    pub async fn updater(&mut self, databases: &DatabaseState) {
        let cache = Self::generator(databases).await;

        self.blog_index = cache.blog_index;
        self.blog_posts_map = cache.blog_posts_map;
    }
}
