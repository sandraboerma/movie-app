import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function AllMovies({
    isLoading = false,
    errorMessage = "",
    movieList = [],
    debouncedSearchTerm = "",
    isFavorite = () => false,
    toggleFavorite = () => {},
    page = 1,
    totalPages = 1,
    onPageChange = () => {},
}) {
    const isEmpty =
        !isLoading &&
        !errorMessage &&
        movieList.length === 0 &&
        debouncedSearchTerm.trim().length > 0;

    return (
        <section className="all-movies">
            <div className="list-toolbar">
                <h2 className="text-center md:text-left">All Movies</h2>
                <div className="hidden md:block">
                    <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
                </div>
            </div>

            <div className="md:hidden mb-8 flex justify-center">
                <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
            </div>

            {isLoading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className="text-red-400">{errorMessage}</p>
            ) : (
                <ul>
                    {isEmpty ? (
                        <li className="col-span-full text-gray-300">
                            No results for "{debouncedSearchTerm}". Try another title.
                        </li>
                    ) : (
                        movieList.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                favored={isFavorite(movie.id)}
                                onToggle={() => toggleFavorite(movie.id)}
                            />
                        ))
                    )}
                </ul>
            )}

            <div className="mt-4 flex justify-center">
                <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
            </div>
        </section>
    );
}

export default AllMovies;
