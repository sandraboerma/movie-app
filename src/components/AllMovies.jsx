import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

function AllMovies({
    isLoading,
    errorMessage,
    movieList,
    debouncedSearchTerm,
}) {
    const isEmpty = !isLoading && !errorMessage && movieList.length === 0;

    return (
        <section className="all-movies">
            <h2>All Movies</h2>

            {isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className="text-red-400">{errorMessage}</p>
            ) : (
                <ul>
                    {isEmpty ? (
                        <li className="col-span-full text-gray-300">
                            No results for "{debouncedSearchTerm}". Try another
                            title.
                        </li>
                    ) : (
                        movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    )}
                </ul>
            )}
        </section>
    );
}

export default AllMovies;
