# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.12.12] - 2023-07-13

#### Changed

- html background color to a darker gradient for space
- cards and featured cards are styled a little different now

## [0.12.11] - 2023-07-12

#### Added

- aerlon logo in navbar
- station page now contains the logo as well

#### Changed

- page headers now scale a little better

#### Fixed

- overflow-x issue on navbar-links in expanded mode
  - this is now written much better in css

## [0.12.10] - 2023-07-11

#### Added

- font Pondar.otf
- \_mixins.scss

#### Changed

- moving towards a more future space voyager theme now

#### Removed

- alagard font

## [0.12.9] - 2023-07-11

#### Changed

- adjusted class and css tags for all top level divs on pages
- lots of css cleaning

#### Added

- changelog is now being parsed to html for the `/readme` page

#### Removed

- all webpack npm dependencies in package.json

## [0.12.8] - 2023-07-10

#### Added

- Alagard font
- preload font scripts from html head

#### Changed

- reworked askama templates to use a higher level block
  - so now everything draws from a main frame and then either an app layout or station layout
- adjusted some of the header to use new font
  - working on logoing still
- lightened the background gradient color, so site looks better on mobile screens with lower brightness

## [0.12.7] - 2023-07-07

#### Changed

- another big change of the card styling
- more navbar adjustments... again

## [0.12.6] - 2023-07-06

#### Changed

- cards collapse to a smaller view on mobile size screens
- more changes to the navbar

## [0.12.5] - 2023-07-05

#### Added

- css stars that slowly move near the top of the page

#### Removed

- day and night background cycling
  - I like the idea of something more unique, but its hard to get the visuals right for two very different looks

## [0.12.4] - 2023-07-04

#### Changed

- turned off rate governer for now; as htmx conflicts with the returned error html

## [0.12.3] - 2023-07-04

#### Added

- `#![allow(unused)]` to the top of `main.rs` to ignore these compiler warnings for now; placed a `TODO` on it to clean this up in a later version

#### Changed

- more work on the cards post system and css styling

## [0.12.2] - 2023-07-04

#### Changed

- started shortening some css variable names
- cleaning up some of the css variables

#### Fixed

- navbar active color
- html background color view height for page changes on mobile
- expanded class wasn't being removed on resize event
- admin site background color

## [0.12.1] - 2023-07-04

#### Fixed

- node scripts work correct now for build\*

## [0.12.0] - 2023-07-03

#### Added

- cleaned up a lot of pages and added heads for a more polished look
  - this is missing a lot of art and styling but trying to get back to a publishable place

#### Changed

- moved to a day and night only cycle
  - easier to manage and looks better
- webpack has been completely removed; all esbuild now
  - issues with code splitting in esbuild though, might have to rethink this area in the future

#### Fixed

- `expanded` class was not being removed from the navigation bar on close

## [0.11.4] - 2023-06-30

#### Added

- script to adjust background gradient to match the real world sky and set night or day theming

#### Changed

- more navbar changes

#### Removed

- title header
  - need a logo soon

## [0.11.3] - 2023-06-26

#### Added

- resize and scroll events for the navigation bar

#### Changed

- a lot of work on the navbar and it's expansion when screen width is below `530px`
  - removing all sidebar naming and labeling
- messing around with some more css

## [0.11.2] - 2023-06-26

#### Changed

- cleaning up a lot of stuff thats just 'haning' in messy code mode haha
- lots of css changes
- changed index naming to 'station'
- webpack is still in use but will be migrated to esbuild most likely
- more work with htmx, getting `<a>` tags to work correctly with boosting

## [0.11.1] - 2023-06-25

#### Added

- working on using a `Arc<Mutex<>>` for AppState that will allow me to take a mutable reference to an underlying HashMap with generated html strings

## [0.11.0] - 2023-06-25

#### Changed

- Aerlon naming/theming
- moving towards using htmx and esbuild for all things frontend

## [0.10.1] - 2023-05-30

#### Added

- adjusted route `/` to a home page with its own index template

#### Changed

- moved all routes behind `/blog` to the experimental prerendering caching system
- `/` was migrated to `/blog` and `/blog/:slug`

## [0.10.0] - 2023-05-29

#### Added

- [not in production] testing prerendering the blog index and content in a in-memory `hashmap<String, String>` for really fast content draw times
  - askama is very quick, but I/O is not; so real-time rendering with all the I/O calls are slowing things down a lot
  - early tests show roughly ~40x more requests per second when the HTML is prerendered and then served from application memory verse realtime rendering

#### Changed

- migrated all ui updates from the sveltekit build
- a lot of changes to the navbar; more to come

#### Removed

- color changing of the site; could come back in the future

## [0.9.3] - 2023-05-16

#### Fixed

- adjusted webpack to compile the admin panel correctly now
  - all original spa builds are now built in webpack correctly

#### Changed

- more css changes and clean up

## [0.9.2] - 2023-05-14

#### Added

- a warning about the site being a wip

#### Changed

- more adjustements to some of the css
  - css is now minifed by dart sass
- moved all scripts to be compiled by webpack
  - admin site still broken

## [0.9.1] - 2023-05-12 | build will not compile

#### Changed

- continuing to migrate vite to webpack for better control over the scripts and build flow
- updated a lot of css to matched latest ui design
  - still wip

## [0.9.0] - 2023-05-12 | build will not compile

#### Changed

- move spa scripts to webpack from vite; this is just to clean up the build workflow a ton
  - this also comes with a ton of refactoring of a lot of stuff

## [0.8.11] - 2023-04-06

#### Added

- the navbar will now hide at <= 380 pixel screen width and links will now appear in the sidebar

#### Changed

- renamed themer.html.j2 to sidebar.html.j2 to better describe the function change
  - css class names will be changed in a future update, most of the current classes on this file are already placeholder names anyway

## [0.8.10] - 2023-04-05

#### Changed

- about page is now the readme.md page with the readme markdown parsed to html and the projects source code linked | wip

#### Fixed

- rng pages button hover color was getting stuck in a set position on mobile, fixed with media queries and `:focus:active` selectors

## [0.8.9] - 2023-04-05

#### Changed

- adjusted the error html page templates | still wip but better now
- put the navbar back to its original design with the logo on the left
- series card background color was adjusted to match other button like elements on the site
- `\admin` is now named `\vite`, this change is due to the vite builds being apart of more than just the admin console

#### Added

- the RNG page just for fun, will expand that more in the future

## [0.8.8] - 2023-04-03

#### Changed

- moved the redis service functions to methods on their respective struct
- removed themer out of navbar and to a absolute position
- messing with new mirror navbar

## [0.8.7] - 2023-03-31

#### Added

- admin api creator post route
- admin console post creator now is first level functional

#### Fixed

- handle the date better on the updater and creator in the admin console

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
