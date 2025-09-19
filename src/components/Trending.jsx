import { Link } from "react-router-dom";

function Trending({ trendingMovies = [] }) {
    if (!Array.isArray(trendingMovies) || trendingMovies.length === 0) return null;
    return (
        <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => {
                    const key = movie.$id ?? `${movie.movie_id ?? "noid"}-${index}`;
                    const to = movie.movie_id ? `/item/${movie.movie_id}` : null;

                    const img = (
                        <img src={movie.poster_url} alt={movie.title ?? "Trending movie"} />
                    );

                    return (
                        <li key={key}>
                            <p>{index + 1}</p>

                            {to ? (
                                <Link
                                    to={to}
                                    className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                                    aria-label={`View details for ${movie.title ?? "movie"}`}
                                    title={movie.title ?? "View details"}
                                >
                                    {img}
                                </Link>
                            ) : (
                                img
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default Trending;
