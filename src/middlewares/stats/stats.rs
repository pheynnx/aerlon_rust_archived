use axum::response::Response;
use futures::future::BoxFuture;
use http::Request;
use std::{io::Error, sync::Arc};
use tokio::task;
use tower::{Layer, Service};

use crate::{services::get_metas_sorted, AppState};

#[derive(Clone)]
pub struct StatsLayer {
    pub state: Arc<AppState>,
}

impl<S> Layer<S> for StatsLayer {
    type Service = StatsService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        StatsService {
            inner,
            state: self.state.clone(),
        }
    }
}

#[derive(Clone)]
pub struct StatsService<S> {
    inner: S,
    pub state: Arc<AppState>,
}

impl<S, B> Service<Request<B>> for StatsService<S>
where
    S: Service<Request<B>, Response = Response> + Send + 'static,
    S::Future: Send + 'static,
{
    type Response = S::Response;

    type Error = S::Error;

    type Future = BoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(
        &mut self,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        println!("[POLL]");
        self.inner.poll_ready(cx)
    }

    fn call(&mut self, req: Request<B>) -> Self::Future {
        println!("[CALL]");
        let future = self.inner.call(req);
        let cloned_state = self.state.clone();

        Box::pin(async move {
            println!("[BOX MOVE]");
            let response: Response = future.await?;

            task::spawn(async move {
                println!("[SLEEP START]");
                tokio::time::sleep(tokio::time::Duration::from_secs(5)).await;
                println!("[SLEEP END]");

                // let redis_con = cloned_state.databases.redis.new_connection().await.unwrap();
                // let metas = get_metas_sorted(redis_con).await.unwrap();
                // println!("{:#?}", metas);
            });

            println!("[BOX END]");
            Ok(response)
        })
    }
}
