use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(FromRow, Debug, Serialize, Deserialize)]
pub struct Metric {
    pub metric_id: Option<Uuid>,
    pub path: String,
    pub ip: String,
    #[serde(rename = "created_at")]
    pub metric_created_at: Option<NaiveDateTime>,
}
