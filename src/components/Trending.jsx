function Trending({ trendingMovies }) {
    if (!Array.isArray(trendingMovies) || trendingMovies.length === 9)
        return null;
    return (
        <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.$id ?? `${movie.title}-${index}`}>
                        <p>{index + 1}</p>
                        <img
                            src={movie.poster_url}
                            alt={movie.title || "Trending movie"}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Trending;
