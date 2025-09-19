import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { buildMoviesEndpoint, tmdbJson } from "../api/tmdb";
import updateSearchCount from "../api/appwrite";

function useMovieSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 700, [searchTerm]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        let cancelled = false;

        async function fetchMovies(query = "", pageNum = 1) {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const endpoint = buildMoviesEndpoint(query, pageNum);
                const data = await tmdbJson(endpoint);

                if (!Array.isArray(data.results)) {
                    if (!cancelled) {
                        setMovieList([]);
                        setTotalPages(1);
                        setErrorMessage("HTTP call success. But unexpected response from TMDB.");
                    }
                    return;
                }

                if (!cancelled) {
                    setMovieList(data.results);
                    const apiTotal = Number(data.total_pages) || 1;
                    setTotalPages(Math.min(500, Math.max(1, apiTotal)));
                }

                if (query && pageNum === 1 && data.results.length > 0) {
                    await updateSearchCount(query, data.results[0]);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(`Error fetching movies: ${error}`);
                    setErrorMessage("Error fetching movies. Please try again later");
                    setMovieList([]);
                    setTotalPages(1);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchMovies(debouncedSearchTerm, page);
        return () => {
            cancelled = true;
        };
    }, [debouncedSearchTerm, page]);

    return {
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        movieList,
        isLoading,
        errorMessage,
        page,
        setPage,
        totalPages,
    };
}

export default useMovieSearch;
