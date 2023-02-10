## Ericarthurc.com

Project version: `0.1.0 alpha | 02/09/2023`

## Project Layout

### Project stack

- Rust | handling all things https
  - Axum
  - Askama
  - Comrak
- Node | used for compiling the static assets for the admin console
  - Vite
  - Solidjs

### Database stack

- CockroachDB
- Redis

### Functionality

- main blog site is handled by Axum and Askama templates (dynamic pages)
- admin console is multi-SPAs rendered from Vite and then served by Axum
  - solidjs is broken up into multiple entry points and then rendered to html/css/js for each respective 'view'; then Axum/Askama handles serving these at their own router points. This lets me run backend middleware before each page is rendered to the frontend and perform authentication and redirection as needed.

## Previous stacks

##### A list of stacks and the reason I moved on

- Node Remix | (2023)
  - missing a good middleware solution and like writing in Go/Rust better
- Rust Axum | SolidJs (2022/2023)
  - wanted to get away from api fetching on SPAs for my blog
- Rust Axum | Leptos (2022)
  - tooling is not mature enough yet, but very interested in its SSR partial hydration
- Rust Axum | Askama/Preact/Webpack (2022)
  - missing the SPA user feel
- Go Gin | Pongo2 (2022)
  - didn't enjoy working with gin
- Go Echo | Pongo2 (2022)
  - wanted to move to Rust
- Go Fiber | Pongo2 (2022)
  - fiber isn't built on net/http
- F# Giraffe (2022)
  - F# is an awesome language, just very niche and still relies on .Net. I just have a hard time finding a use case for F#
- C# Blazor/Razor (2022)
  - want to love C# but don't enjoy the .Net framework; and I am a bigger fan of functional/procedural coding styles over OOP
- Nim Prologue | Karax (2021)
  - nim is an amazing language but still very immature
- Deno Oak | ETA (2021)
  - deno was a little to new at the time
- Node Koa | React (2021)
  - wanted to move to Deno
- Node Express | EJS (2020)
  - started everything here a couple years back; express
