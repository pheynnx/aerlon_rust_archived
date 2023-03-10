use axum::extract::State;
use axum::{http::Request, middleware::Next, response::Response};
use std::sync::Arc;
use tokio::task;
use tokio::time::{sleep, Duration};

use crate::AppState;

pub async fn threaded_middleware<B>(
    State(state): State<Arc<AppState>>,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, ()> {
    let uri = req.uri().to_string();

    task::spawn(async move {
        println!("[THREAD] spawned");
        sleep(Duration::from_secs(5)).await;
        println!("[THREAD] 5 seconds");
        println!("[THREAD] uri: {}", uri);
    });

    Ok(next.run(req).await)
}
