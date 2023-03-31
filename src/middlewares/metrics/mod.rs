use axum::{http::Request, response::Response};
use futures::future::BoxFuture;
use http::HeaderValue;
use sqlx::query_as;
use std::env;
use std::sync::Arc;
use std::task::{Context, Poll};
use tokio::task;
use tower::{BoxError, Service};

use crate::AppState;

pub mod layer;
pub mod metric;

#[derive(Clone)]
pub struct MetricsMiddlewareService<S> {
    inner: S,
    state: Arc<AppState>,
}

impl<S, B> Service<Request<B>> for MetricsMiddlewareService<S>
where
    S: Service<Request<B>, Response = Response> + Send + 'static,
    S::Error: Into<BoxError>,
    S::Future: Send + 'static,
{
    type Response = Response;
    type Error = BoxError;
    type Future = BoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.inner.poll_ready(cx).map_err(Into::into)
    }

    fn call(&mut self, req: Request<B>) -> Self::Future {
        let postgres_pool = self.state.databases.postgres.postgres_pool.clone();

        let _header_user_agent = req.headers().get("user-agent").unwrap().to_owned();
        let uri = req.uri().to_string();
        let _method = req.method().to_string();
        let _version = req.version();

        let rust_env = env::var("RUST_ENV");

        match rust_env {
            Ok(r_env) => match r_env.as_str() {
                "production" => {
                    let header_user_forwarded = req
                        .headers()
                        .get("X-Forwarded-For")
                        .unwrap_or(&HeaderValue::from_str("not set").unwrap())
                        .to_owned();

                    task::spawn(async move {
                        query_as!(
                            Metric,
                            r#"insert into metric (path, ip) values ($1, $2)"#,
                            &uri,
                            &header_user_forwarded.to_str().unwrap()
                        )
                        .fetch_optional(&postgres_pool)
                        .await
                        .unwrap();
                    });
                }
                _ => (),
            },
            Err(_) => (),
        };

        let response_future = self.inner.call(req);

        Box::pin(async move {
            let response = response_future.await.map_err(Into::into).unwrap();

            Ok(response)
        })
    }
}
