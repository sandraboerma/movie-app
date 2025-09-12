import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/appwrite.js";

function useTrendingMovies() {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        async function loadTrending() {
            try {
                const movies = await getTrendingMovies();
                setTrendingMovies(Array.isArray(movies) ? movies : []);
            } catch (e) {
                console.error("Error fetching trending movies:", e);
                setTrendingMovies([]);
            }
        }
        loadTrending();
    }, []);

    return trendingMovies;
}

export default useTrendingMovies;
