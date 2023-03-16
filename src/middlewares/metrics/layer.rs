use std::sync::Arc;
use tower::Layer;

use super::MetricsMiddlewareService;
use crate::AppState;

#[derive(Clone)]
pub struct MetricsMiddleware {
    state: Arc<AppState>,
}

impl MetricsMiddleware {
    pub fn new(state: Arc<AppState>) -> Self {
        Self { state }
    }
}

impl<S> Layer<S> for MetricsMiddleware {
    type Service = MetricsMiddlewareService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        MetricsMiddlewareService {
            inner,
            state: self.state.clone(),
        }
    }
}
