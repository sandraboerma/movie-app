function MovieOverview({ movie }) {
    const genres = Array.isArray(movie.genres) ? movie.genres.map((g) => g.name).join(", ") : null;

    return (
        <div>
            {genres ? <div className="text-gray-300 mb-2">{genres}</div> : null}

            {movie.overview ? (
                <p className="text-gray-200">{movie.overview}</p>
            ) : (
                <p className="text-gray-400">No overview available.</p>
            )}

            {movie.homepage ? (
                <p className="mt-4">
                    <a
                        className="underline text-indigo-300"
                        href={movie.homepage}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Official site ↗
                    </a>
                </p>
            ) : null}
        </div>
    );
}

export default MovieOverview;
