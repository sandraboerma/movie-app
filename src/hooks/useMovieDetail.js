import { useEffect, useState } from "react";
import { tmdbJson } from "../api/tmdb";

function useMovieDetail(id) {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const data = await tmdbJson(`/movie/${id}`);
                if (!cancelled) setMovie(data);
            } catch (error) {
                if (!cancelled) setErrorMessage("Could not load movie details.", error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return { movie, isLoading, errorMessage };
}

export default useMovieDetail;
