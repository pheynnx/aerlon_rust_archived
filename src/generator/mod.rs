use askama::Template;
use std::collections::HashMap;

use crate::{database::DatabaseState, models::post::Post};

#[derive(Template)]
#[template(path = "index_$post.html.j2")]
struct IndexPostTemplate {
    post: Post,
    uri: String,
}

pub async fn generator(databases: DatabaseState) -> HashMap<String, String> {
    let posts = Post::get_published_posts_postgres(&databases.postgres.postgres_pool)
        .await
        .unwrap();

    let mut map = HashMap::new();

    for mut post in posts {
        post.convert_markdown_to_html();

        let index_post_template = IndexPostTemplate {
            post: post.clone(),
            uri: "".to_string(),
        };
        let render = index_post_template.render().unwrap();
        map.insert(post.slug.clone(), render);
    }

    map
}
