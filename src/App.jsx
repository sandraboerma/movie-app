import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import hero from "./assets/hero.png";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import AllMovies from "./components/AllMovies.jsx";
import updateSearchCount, { getTrendingMovies } from "./appwrite.js";
import { buildMoviesEndpoint, tmdbFetch } from "./api/tmdb.js";

// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const API_OPTIONS = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${API_KEY}`,
//     },
// };

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 700, [searchTerm]);

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            // const endpoint = query
            //     ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            //           query
            //       )}`
            //     : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            // const response = await fetch(endpoint, API_OPTIONS);

            const endpoint = buildMoviesEndpoint(query);
            // console.log("[endpoint]", endpoint);
            const response = await tmdbFetch(endpoint);

            if (!response.ok) {
                throw new Error("Failed to fetch movies.");
            }

            // const data = await response.json();

            // if (data.Response === "False") {
            //     setErrorMessage(data.Error || "Failed to fetch movies.");
            //     setMovieList([]);
            //     return;
            // }

            // setMovieList(data.results || []);

            // console.log("status/url:", response.status, response.url);
            // console.log("content-type:", response.headers.get("content-type"));

            const data = await response.json();

            if (!Array.isArray(data.results)) {
                setErrorMessage(
                    "HTTP call success. But unexpected response from TMDB"
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
            setErrorMessage("Error fetching movies. Please try again later");
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();

            setTrendingMovies(movies);
            console.log(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    };

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src={hero} alt="Hero banner" />
                    <h1>
                        Lets <span className="text-gradient">make this</span>{" "}
                        movie appa
                    </h1>

                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </header>

                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Trending Movies</h2>

                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img
                                        src={movie.poster_url}
                                        alt={movie.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <AllMovies
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    movieList={movieList}
                    debouncedSearchTerm={debouncedSearchTerm}
                />

                {/* <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-400">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.length === 0 ? (
                                // spans across the grid so the message looks intentional
                                <li className="col-span-full text-gray-100">
                                    No results for “{debouncedSearchTerm}”. Try
                                    another title.
                                </li>
                            ) : (
                                movieList.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))
                            )}
                        </ul>
                    )}
                </section> */}
            </div>
        </main>
    );
}

export default App;
