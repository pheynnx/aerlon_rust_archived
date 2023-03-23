use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct Metric {
    pub metric_id: Option<i8>,
    pub path: String,
    pub ip: String,
    #[serde(rename = "created_at")]
    pub metric_created_at: Option<DateTime<Utc>>,
}
