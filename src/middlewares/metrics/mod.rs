use axum::{http::Request, response::Response};
use futures::future::BoxFuture;
use http::HeaderValue;
use std::env;
use std::sync::Arc;
use std::task::{Context, Poll};
use tokio::task;
use tower::{BoxError, Layer, Service};

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
        let header_user_agent = req.headers().get("user-agent").unwrap().to_owned();
        let uri = req.uri().to_string();
        let method = req.method().to_string();
        let version = req.version();

        let rust_env = env::var("RUST_ENV");

        match rust_env {
            Ok(r_env) => match r_env.as_str() {
                "development" => {
                    task::spawn(async move {
                        println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        println!("{:#?}", uri);
                        println!("{:#?}", header_user_agent);
                        println!("{:#?}", method);
                        println!("{:#?}", version);
                        println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
                    });
                }
                "production" => {
                    let header_user_forwarded = req
                        .headers()
                        .get("X-Forwarded-For")
                        .unwrap_or(&HeaderValue::from_str("not set").unwrap())
                        .to_owned();

                    task::spawn(async move {
                        // make database calls
                    });
                }
                _ => (),
            },
            Err(e) => (),
        };

        let response_future = self.inner.call(req);

        Box::pin(async move {
            let response = response_future.await.map_err(Into::into).unwrap();

            Ok(response)
        })
    }
}
