use axum::{http::Request, response::Response};
use futures::future::BoxFuture;
use http::HeaderValue;
use std::sync::Arc;
use std::task::{Context, Poll};
use tokio::task;
use tower::{BoxError, Layer, Service};

use crate::AppState;

#[derive(Clone)]
pub struct CustomHeaderMiddleware {
    state: Arc<AppState>,
}

impl CustomHeaderMiddleware {
    pub fn new(state: Arc<AppState>) -> Self {
        Self { state }
    }
}

impl<S> Layer<S> for CustomHeaderMiddleware {
    type Service = CustomHeaderMiddlewareService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        CustomHeaderMiddlewareService {
            inner,
            state: self.state.clone(),
        }
    }
}

#[derive(Clone)]
pub struct CustomHeaderMiddlewareService<S> {
    inner: S,
    state: Arc<AppState>,
}

impl<S, B> Service<Request<B>> for CustomHeaderMiddlewareService<S>
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
        let header_user_forwarded = req
            .headers()
            .get("X-Forwarded-For")
            .unwrap_or(&HeaderValue::from_str("no-value").unwrap())
            .to_owned();
        let uri = req.uri().to_string();
        let header_host = req.headers().get("host").unwrap().to_owned();
        let method = req.method().to_string();
        let version = req.version();

        task::spawn(async move {
            println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            println!("{:#?}", uri);
            println!("{:#?}", header_user_agent);
            println!("{:#?}", header_user_forwarded);
            println!("{:#?}", header_host);
            println!("{:#?}", method);
            println!("{:#?}", version);
            println!("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        });

        let response_future = self.inner.call(req);

        Box::pin(async move {
            let response = response_future.await.map_err(Into::into).unwrap();

            Ok(response)
        })
    }
}
