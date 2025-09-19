const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

function buildMoviesEndpoint(query = "", page = 1) {
    const q = String(query ?? "").trim();
    const p = Math.max(1, Number(page) || 1);

    return q
        ? `/search/movie?query=${encodeURIComponent(q)}&page=${p}`
        : `/discover/movie?sort_by=popularity.desc&page=${p}`;
}

async function tmdbFetch(path) {
    if (!path.startsWith("/")) {
        throw new Error("tmdbFetch: path must start with '/'");
    }
    return fetch(`${API_BASE_URL}${path}`, API_OPTIONS);
}

async function tmdbJson(path) {
    if (!path.startsWith("/")) {
        throw new Error("tmdbJson: path must start with '/'");
    }

    const res = await tmdbFetch(path);

    if (!res.ok) {
        throw new Error(`TMDB HTTP ${res.status} for ${res.url}`);
    }

    return res.json();
}

function tmdbImage(path, size = "w500") {
    if (!path) return undefined;
    const p = path.startsWith("/") ? path : `${path}`;

    return `https://image.tmdb.org/t/p/${size}${p}`;
}

export { buildMoviesEndpoint, tmdbFetch, tmdbJson, tmdbImage };
