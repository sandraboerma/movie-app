# Movie App

A small React + Vite app where users can search for movies via the TMDB API and view results as cards. Styled with Tailwind CSS. Appwrite stores simple stats (e.g., top searches).
This is a school/learning project inspired by a JavaScript Mastery tutorial, then refactored and adapted for continued learning and practice.

## Features (current)

- Search movies (TMDB)
- Debounced input to reduce API calls
- Loading and error states
- Responsive layout
- “Trending” strip based on my Appwrite database

## Planned

- Routing with React Router:
- / list view
- /item/:id detail page (works on refresh)
- /favorites (save in localStorage)
-   - 404 page
- Empty-state message for “no results”
- Additonal small UX/accessibility tweaks

## Tech stack

- React 18 + Vite
- Tailwind CSS
- TMDB API
- Appwrite (Cloud) Databases
- react-use (for debounce)

## Attribution

- TMDB
    > This product uses the TMDB API but is not endorsed or certified by TMDB.

## Liscense

- MIT (see LISCENCE)
