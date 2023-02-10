use askama::Template;
use axum::{
    extract::{Path, State},
    response::IntoResponse,
};
use std::{collections::HashMap, sync::Arc};

use crate::{
    errors::AppError,
    models::dtos::{meta::Meta, series::Series},
    services::{get_series_metas_sorted_by_name, get_series_sorted},
    utilities::templates::HtmlTemplate,
    AppState,
};

#[derive(Template)]
#[template(path = "series.html.j2")]
struct SeriesTemplate {
    series: Vec<Series>,
}

pub async fn get_series_handler(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let series = get_series_sorted(redis_con).await?;

    let template = SeriesTemplate { series };

    Ok(HtmlTemplate(template))
}

#[derive(Template)]
#[template(path = "series_$series.html.j2")]
struct SeriesMetaTemplate {
    metas: Vec<Meta>,
}

pub async fn get_series_metas_handler(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
) -> Result<impl IntoResponse, AppError> {
    let series_name = params.get("series");

    let redis_con = state.databases.redis.new_connection().await?;

    match series_name {
        Some(series_name) => {
            let metas = get_series_metas_sorted_by_name(redis_con, series_name).await?;

            let template = SeriesMetaTemplate { metas };

            Ok(HtmlTemplate(template))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
