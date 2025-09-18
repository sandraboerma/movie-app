import { useEffect, useState } from "react";
import { tmdbJson } from "../api/tmdb";

function useMoviesByIds(ids = []) {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrormessage] = useState("");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setErrormessage("");

            if (!Array.isArray(ids) || ids.length === 0) {
                setMovieList([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const results = await Promise.allSettled(ids.map((id) => tmdbJson(`/movie/${id}`)));

                if (cancelled) return;

                const movies = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
                setMovieList(movies);
            } catch {
                if (!cancelled) setErrormessage("Could not load favorites.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [ids]);

    return { movieList, isLoading, errorMessage };
}

export default useMoviesByIds;
