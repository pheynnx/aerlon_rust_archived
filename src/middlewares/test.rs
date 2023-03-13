use axum::extract::State;
use axum::{http::Request, middleware::Next, response::Response};
use std::sync::Arc;
use tokio::task;
use tokio::time::{sleep, Duration};

use crate::AppState;

pub async fn threaded_middleware<B>(
    State(_state): State<Arc<AppState>>,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, ()> {
    // let uri = req.uri().to_string();
    dbg!(req.headers());
    dbg!(req.headers().get("host"));
    dbg!(req.method());
    dbg!(req.uri());
    dbg!(req.version());

    // task::spawn(async move {});

    Ok(next.run(req).await)
}
