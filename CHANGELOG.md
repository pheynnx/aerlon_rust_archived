# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
