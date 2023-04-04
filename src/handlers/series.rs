use askama::Template;
use axum::{
    extract::{Path, State},
    response::IntoResponse,
};
use http::Request;
use std::{collections::HashMap, sync::Arc};

use crate::{
    errors::AppError,
    models::dtos::{meta::Meta, series::Series},
    utilities::templates::HtmlTemplate,
    AppState,
};

#[derive(Template)]
#[template(path = "series.html.j2")]
struct SeriesTemplate {
    series: Vec<Series>,
    uri: String,
}

pub async fn get_series_handler<T>(
    State(state): State<Arc<AppState>>,
    req: Request<T>,
) -> Result<impl IntoResponse, AppError> {
    let redis_con = state.databases.redis.new_connection().await?;

    let series = Series::get_series_sorted(redis_con).await?;

    let template = SeriesTemplate {
        series,
        uri: req.uri().to_string(),
    };

    Ok(HtmlTemplate(template))
}

#[derive(Template)]
#[template(path = "series_$series.html.j2")]
struct SeriesMetaTemplate {
    metas: Vec<Meta>,
    series_name: String,
    uri: String,
}

pub async fn get_series_metas_handler<T>(
    State(state): State<Arc<AppState>>,
    Path(params): Path<HashMap<String, String>>,
    req: Request<T>,
) -> Result<impl IntoResponse, AppError> {
    let series_name = params.get("series");

    let redis_con = state.databases.redis.new_connection().await?;

    match series_name {
        Some(series_name) => {
            let metas = Meta::get_series_metas_sorted_by_name(redis_con, series_name).await?;

            let template = SeriesMetaTemplate {
                metas,
                series_name: series_name.to_string(),
                uri: req.uri().to_string(),
            };

            Ok(HtmlTemplate(template))
        }
        None => Err(AppError::Custom(String::from("missing parameter"))),
    }
}
