use chrono::Utc;
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, Algorithm, DecodingKey, EncodingKey, Header, Validation,
};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Claims {
    password: String,
    pin: String,
    exp: i64,
}

pub fn generate_auth_jwt(
    password: String,
    pin: String,
) -> Result<String, jsonwebtoken::errors::Error> {
    match encode(
        &Header::default(),
        &Claims {
            password,
            pin,
            exp: Utc::now().timestamp()
                + env::var("JWT_EXPIRATION").unwrap().parse::<i64>().unwrap(),
        },
        &EncodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_bytes()),
    ) {
        Ok(t) => Ok(t),
        Err(err) => Err(err),
    }
}

pub fn validate_auth_jwt(token: &str) -> Result<bool, jsonwebtoken::errors::Error> {
    let validation = Validation::new(Algorithm::HS256);

    match decode::<Claims>(
        &token,
        &DecodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_bytes()),
        &validation,
    ) {
        Ok(c) => {
            match c.claims.password == env::var("ADMIN_PASSWORD").unwrap()
                && c.claims.pin == env::var("ADMIN_PIN").unwrap()
            {
                true => Ok(true),
                false => {
                    Err(ErrorKind::MissingRequiredClaim("Password and Pin".to_string()).into())
                }
            }
        }
        Err(err) => match *err.kind() {
            ErrorKind::InvalidToken => Err(err),
            ErrorKind::ExpiredSignature => Err(err),
            _ => Err(err),
        },
    }
}
