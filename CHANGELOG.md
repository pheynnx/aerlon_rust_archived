# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.1] - 2023-03-20

#### Changed

- metric middleware now makes a basic SQL call, storing the uri and ip on main route requests

## [0.7.0] - 2023-03-17

#### Changed

- color scheme on admin console to match site theme

#### Added

- reset admin back to home
- admin post style containers

#### Fixed

- admin log out button

## [0.6.7] - 2023-03-17

#### Changed

- cookie security is now being set by the environment

#### Added

- sample.env
- RUST_ENV environmental variable

## [0.6.6] - 2023-03-15

#### Changed

- metrics middleware was adjusted to use Tower middleware `trait Service<Request>`
  - middleware is very early still
  - currently only printing some raw request information to stdout
  - plans are to store metric data in PostgreSQL
    - SQL still needs to be built out

## [0.6.5] - 2023-03-15

#### Added

- changelog.md
- metrics middleware

#### Fixed

- favicon

#### Changed

- removed `get_service()` and `handle_error()` from local asset services
