# Yet Another Movie App

![CI](https://github.com/sandraboerma/movie-app/actions/workflows/ci.yml/badge.svg)

A small React + Vite app where users can search for movies via the TMDB API and view results as cards. Styled with Tailwind CSS. Appwrite stores simple stats (e.g., top searches).
This is a school/learning project inspired by a JavaScript Mastery tutorial, then refactored and adapted for continued learning and practice.

## Features (current)

- Search movies (TMDB) with debounced input
- List and detail pages (`/` and `/item/:id`)
- Favorites with `localStorage` + `/favorites` page
- Loading, error, and empty states
- Responsive layout
- Simple navbar (Home / Favorites)
- ESLint + Prettier
- Basic CI (lint, format check, Vite build)

## Routes

- `/` – list view
- `/item/:id` – detail page (works on refresh)
- `/favorites` – saved favorites
- `*` – 404 page

## Tech stack

- React 18 + Vite
- React Router
- Tailwind CSS
- TMDB API
- Appwrite (Cloud) Databases
- react-use (for debounce)

## Attribution

- TMDB
    > This product uses the TMDB API but is not endorsed or certified by TMDB.

## License

- MIT (see LICENSE)
