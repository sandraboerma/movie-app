import { Link } from "react-router-dom";
import NoMovie from "../assets/no-movie.png";
import StarIcon from "../assets/star.svg";
import { tmdbImage } from "../api/tmdb";

function MovieCard({
    movie: { id, title, vote_average, poster_path, release_date, original_language },
    favored = false,
    onToggle = () => {},
    linkToDetail = true,
    imageSize = "w500",
    className = "",
}) {
    const posterSrc = tmdbImage(poster_path, imageSize) ?? NoMovie;

    const containerClass = className ? `movie-card relative ${className}` : `movie-card relative`;

    const PosterImg = (
        <img
            src={posterSrc}
            alt={title || "Movie poster"}
            loading="lazy"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = NoMovie;
            }}
        />
    );

    return (
        <div className={containerClass}>
            <button
                type="button"
                aria-pressed={favored}
                onClick={onToggle}
                title={favored ? "Unfavorite" : "Favorite"}
            >
                {favored ? "❤️" : "🖤"}
            </button>

            {linkToDetail && id ? (
                <Link to={`/item/${id}`} className="block">
                    {PosterImg}
                </Link>
            ) : (
                PosterImg
            )}

            <div className="mt-4">
                <h3>
                    {linkToDetail && id ? (
                        <Link to={`/item/${id}`} className="hover:underline">
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                    {/* <Link to={`/item/${id}`} className="hover:underline">
                        {title}
                    </Link> */}
                </h3>

                <div className="content">
                    <div className="rating">
                        <img src={StarIcon} alt="Star Icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
