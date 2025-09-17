import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import MovieCard from "../components/MovieCard.jsx";
import MovieOverview from "../components/MovieOverview.jsx";
import useMovieDetail from "../hooks/useMovieDetail.js";
import useFavorites from "../hooks/useFavorites.js";

function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movie, isLoading, errorMessage } = useMovieDetail(id);
    const { isFavorite, toggleFavorite } = useFavorites();

    if (isLoading) {
        return (
            <section className="all-movies">
                <h2>Movie details</h2>
                <Spinner />
            </section>
        );
    }

    if (errorMessage || !movie) {
        return (
            <section className="all-movies">
                <h2>Movie details</h2>
                <p className="text-red-400">{errorMessage || "Not found."}</p>
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="underline text-gray-300"
                    >
                        ← Go back...
                    </button>
                </div>
            </section>
        );
    }

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

                <div className="grid gap-6 md:grid-cols-2 items-center">
                    <MovieCard
                        movie={movie}
                        favored={isFavorite(movie.id)}
                        onToggle={() => toggleFavorite(movie.id)}
                        linkToDetail={false}
                        imageSize="w780"
                        className="max-w-[320px] w-full mx-auto"
                    />

                    <div>
                        <h2 className="text-white text-3xl font-bold mb-2">{movie.title}</h2>
                        <MovieOverview movie={movie} />
                        <p className="mt-6">
                            <Link to="/" className="underline text-gray-300">
                                Go Home
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ItemDetail;
