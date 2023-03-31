# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.6] - 2023-03-30

#### Changed

- admin console now is using a single store for state
- lowered the pixel width and height of the admin page svgs

#### Added

- started state values for the admin metrics page

## [0.8.5] - 2023-03-30

#### Added

- wip svg icons for the admin console
- admin consoles site version shower is now set by a github api fetch call, and not manually set now

#### Fixed

- set `user-select: none;` on some text that shouldn't be selectable

## [0.8.4] - 2023-03-29

#### Fixed

- removed line in themes.js causing an execution bug on first load of the site

## [0.8.3] - 2023-03-29

#### Changed

- more ui adjustements to the settings/themer tab

#### Added

- pink and purple themes were added

#### Fixed

- some of the css theme colors were not setting the right color for the featured post background

## [0.8.2] - 2023-03-27

#### Changed

- more ui updates to the themer options | still work in progress
- more progress on dark/light css variables

#### Fixed

- adjusted some css to work better on webkit for iOS and older devices

## [0.8.1] - 2023-03-24

#### Fixed

- theme switcher settings dropdown now correctly handles `click` events for different states

## [0.8.0] - 2023-03-23

#### Added

- theme switcher for dark/light and color
  - heavy wip
  - lots of work required for this area
  - might turn more into a whole site setting panel versus just a themer
  - heavy css modifications to get this working correctly
  - missing a lot of styles and design in the drop down content menu right now4

## [0.7.5] - 2023-03-22

#### Changed

- put `#[allow(unused)]` on unused `Post {}` methods

#### Fixed

- uri check on navbar askama template restored for `active` class
- boolean checkboxes on the admin updater form were setting the passed prop `Accessor<IPost>` values [still not sure why, could be a bug; but I think it was because `Accessor<T>()` returns `() => T` not `T`] when they should have only set the local signal. Updated the `setPostData()` signal method to take a spread `{ ...props.post() }` of the prop instead of setting the accessor to the signal

#### Added

- placed a proxy on the SolidJs dev server, may not use this but nice to have

## [0.7.4] - 2023-03-22

#### Changed

- moved SQL dates to `timestampz`
  - better supports corredct timezones in JavaScript
- updated all `NaiveDateTime` types on the SQL models to `DateTime<Utc>`
  - makes handling the JSON date string much easier on the frontend
- big style changes to the admin ui
- some more main site color changes

## [0.7.3] - 2023-03-21

#### Changed

- adjusted colors and design on the admin page
- reset main ui colors back to original design for now

## [0.7.2] - 2023-03-20

#### Changed

- some ui colors (testing colors)
- started bring all the colors back to css variables from local set values

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
