import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { buildMoviesEndpoint, tmdbJson } from "../api/tmdb";
import updateSearchCount from "../api/appwrite";

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

                const data = await tmdbJson(endpoint);

                if (!Array.isArray(data.results)) {
                    setErrorMessage("HTTP call success. But unexpected response from TMDB.");
                    setMovieList([]);
                    return;
                }

                setMovieList(data.results);

                if (query && data.results.length > 0) {
                    await updateSearchCount(query, data.results[0]);
                }
            } catch (error) {
                console.error(`Error fetching movies: ${error}`);
                setErrorMessage("Error fetching movies. Please try again later");
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
