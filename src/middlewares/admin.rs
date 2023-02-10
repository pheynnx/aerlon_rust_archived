use axum::{
    http::Request,
    middleware::Next,
    response::{IntoResponse, Redirect, Response},
};
use http::StatusCode;
use tower_cookies::Cookies;

use crate::utilities::jwt::validate_auth_jwt;

pub async fn admin_auth_middleware<B>(
    cookies: Cookies,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, Response> {
    let auth_cookie = cookies.get("auth");

    match auth_cookie {
        Some(auth_c) => match validate_auth_jwt(auth_c.value()) {
            Ok(_) => Ok(next.run(req).await),
            Err(_) => Err(Redirect::to("/admin/login").into_response()),
        },
        None => Err(Redirect::to("/admin/login").into_response()),
    }
}

pub async fn admin_login_middleware<B>(
    cookies: Cookies,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, Response> {
    let auth_cookie = cookies.get("auth");

    match auth_cookie {
        Some(auth_c) => match validate_auth_jwt(auth_c.value()) {
            Ok(_) => Ok(Redirect::to("/admin").into_response()),
            Err(_) => Err(next.run(req).await),
        },
        None => Err(next.run(req).await),
    }
}

pub async fn admin_api_middleware<B>(
    cookies: Cookies,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    let auth_cookie = cookies.get("auth");

    match auth_cookie {
        Some(auth_c) => match validate_auth_jwt(auth_c.value()) {
            Ok(_) => Ok(next.run(req).await),
            Err(_) => Err(StatusCode::UNAUTHORIZED),
        },
        None => Err(StatusCode::UNAUTHORIZED),
    }
}
