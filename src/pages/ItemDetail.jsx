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
                    <button type="button" onClick={() => navigate(-1)} className="btn-back">
                        ← Back
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="all-movies">
            <div className="page-toolbar">
                <button type="button" onClick={() => navigate(-1)} className="btn-back">
                    ← Back
                </button>
                <h2>
                    <span className="text-gradient">Movie details</span>
                </h2>
            </div>

            <div className="grid-detail">
                <MovieCard
                    movie={movie}
                    favored={isFavorite(movie.id)}
                    onToggle={() => toggleFavorite(movie.id)}
                    linkToDetail={false}
                    imageSize="w780"
                    className="detail-card"
                />

                <div>
                    <h2 className="detail-title">{movie.title}</h2>
                    <MovieOverview movie={movie} />
                    <p className="mt-6">
                        <Link to="/" className="link-primary">
                            Go Home
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ItemDetail;
