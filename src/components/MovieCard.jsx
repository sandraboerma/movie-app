import NoMovie from "../assets/no-movie.png";
import StarIcon from "../assets/star.svg";

function MovieCard({
    movie: {
        title,
        vote_average,
        poster_path,
        release_date,
        original_language,
    },
}) {
    const hasPoster =
        typeof poster_path === "string" && poster_path.trim().length > 0;

    const src = hasPoster
        ? `https://image.tmdb.org/t/p/w500${
              poster_path.startsWith("/") ? poster_path : `/${poster_path}`
          }`
        : NoMovie;

    return (
        <div className="movie-card">
            <img
                src={src}
                alt={title || "Movie poster"}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = NoMovie;
                }}
            />

            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src={StarIcon} alt="Star Icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">
                        {release_date ? release_date.split("-")[0] : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
