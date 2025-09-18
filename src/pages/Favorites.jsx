import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import useMoviesByIds from "../hooks/useMoviesByIds";

function Favorites() {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    const { movieList, isLoading, errorMessage } = useMoviesByIds(favorites);
    const navigate = useNavigate();

    return (
        <>
            <section className="all-movies">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-4 underline text-gray-300"
                >
                    ← Back
                </button>
                <h2>All your favorite movies!</h2>

                {isLoading ? (
                    <Spinner />
                ) : errorMessage ? (
                    <p className="text-red-400">{errorMessage}</p>
                ) : favorites.length === 0 ? (
                    <p className="text-gray-300">
                        You don't have any favorites movie selected yet. Go to the home page and tap
                        the ❤️ on the movies you like!
                    </p>
                ) : movieList.length === 0 ? (
                    <p className="text-gray-300">
                        None of your favorite moview could be loaded. Please try again later.
                    </p>
                ) : (
                    <ul>
                        {movieList.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                favored={isFavorite(movie.id)}
                                onToggle={() => toggleFavorite(movie.id)}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
}

export default Favorites;
