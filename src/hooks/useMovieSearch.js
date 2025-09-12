import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { buildMoviesEndpoint, tmdbFetch } from "../api/tmdb";
import updateSearchCount from "../appwrite";

function useMovieSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 700, [searchTerm]);

    useEffect(() => {
        const fetchMovies = async (query = "") => {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const endpoint = buildMoviesEndpoint(query);
                const response = await tmdbFetch(endpoint);

                if (!response.ok) {
                    throw new Error("Failed to fetch movies.");
                }

                const data = await response.json();

                if (!Array.isArray(data.results)) {
                    setErrorMessage(
                        "HTTP call success. But unexpected response from TMDB."
                    );
                    setMovieList([]);
                    return;
                }

                setMovieList(data.results);

                if (query && data.results.length > 0) {
                    await updateSearchCount(query, data.results[0]);
                }
            } catch (error) {
                console.error(`Error fetching movies: ${error}`);
                setErrorMessage(
                    "Error fetching movies. Please try again later"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        movieList,
        isLoading,
        errorMessage,
    };
}

export default useMovieSearch;
