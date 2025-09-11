const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

export function buildMoviesEndpoint(query = "") {
    const q = String(query ?? "").trim();
    return q
        ? `/search/movie?query=${encodeURIComponent(q)}`
        : `/discover/movie?sort_by=popularity.desc`;
}

export async function tmdbFetch(path) {
    if (!path.startsWith("/")) {
        throw new Error("tmdbFetch: path must start with '/'");
    }
    return fetch(`${API_BASE_URL}${path}`, API_OPTIONS);
}
