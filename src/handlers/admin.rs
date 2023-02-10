use askama::Template;
use axum::{extract, response::IntoResponse, response::Response};
use http::StatusCode;
use serde::{Deserialize, Serialize};
use std::env;
use tower_cookies::{Cookie, Cookies};

use crate::utilities::templates::HtmlTemplate;
use crate::{errors::AppError, utilities::jwt::generate_auth_jwt};

#[derive(Template)]
#[template(path = "compiled/admin.html")]
struct AdminTemplate {}

pub async fn admin_handler() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AdminTemplate {}))
}

#[derive(Template)]
#[template(path = "compiled/admin_new.html")]
struct AdminNewTemplate {}

pub async fn admin_new_handler() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AdminNewTemplate {}))
}

#[derive(Template)]
#[template(path = "compiled/admin_update.html")]
struct AdminUpdateTemplate {}

pub async fn admin_update_handler() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AdminUpdateTemplate {}))
}

#[derive(Template)]
#[template(path = "compiled/admin_login.html")]
struct AdminLoginTemplate {}

pub async fn get_admin_login_handler() -> Result<impl IntoResponse, AppError> {
    Ok(HtmlTemplate(AdminLoginTemplate {}))
}

#[derive(Serialize, Deserialize, Debug)]
#[allow(dead_code)]
pub struct LoginInput {
    password: String,
    pin: String,
}

pub async fn post_admin_login_handler(
    cookies: Cookies,
    extract::Json(login_payload): extract::Json<LoginInput>,
) -> Result<Response, AppError> {
    if login_payload.password == env::var("ADMIN_PASSWORD").unwrap()
        && login_payload.pin == env::var("ADMIN_PIN").unwrap()
    {
        let token = generate_auth_jwt(login_payload.password, login_payload.pin).unwrap();

        let cookie = Cookie::build("auth", token)
            .max_age(cookie::time::Duration::days(3))
            // Needs to be true for production
            .secure(false)
            .http_only(true)
            .path("/")
            .finish();

        cookies.add(cookie);
        return Ok((StatusCode::OK).into_response());
    }
    Ok((StatusCode::UNAUTHORIZED).into_response())
}

// pub async fn admin_logout_me_handler(cookies: Cookies) -> Result<impl IntoResponse, AppError> {
//     let cookie = Cookie::build("auth", "")
//         .max_age(cookie::time::Duration::days(3))
//         .secure(true)
//         .http_only(true)
//         .path("/")
//         .finish();

//     cookies.remove(cookie);
//     return Ok(StatusCode::OK);
// }
