use axum::extract::State;
use axum::{http::Request, middleware::Next, response::Response};
use std::sync::Arc;
use tokio::task;

use crate::AppState;

/// v0.0.1
pub async fn threaded_middleware<B>(
    State(_state): State<Arc<AppState>>,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, ()> {
    let header_user_agent = req.headers().get("user-agent").unwrap().to_owned();
    let uri = req.uri().to_string();
    let header_host = req.headers().get("host").unwrap().to_owned();
    let method = req.method().to_string();
    let version = req.version();

    task::spawn(async move {
        println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        println!("{:#?}", uri);
        println!("{:#?}", header_user_agent);
        println!("{:#?}", header_host);
        println!("{:#?}", method);
        println!("{:#?}", version);
        println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    });

    Ok(next.run(req).await)
}
