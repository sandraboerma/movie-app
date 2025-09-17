import Header from "../components/Header";
import Trending from "../components/Trending";
import AllMovies from "../components/AllMovies";
import useMovieSearch from "../hooks/useMovieSearch";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useFavorites from "../hooks/useFavorites";

function Home() {
    const { searchTerm, setSearchTerm, debouncedSearchTerm, movieList, isLoading, errorMessage } =
        useMovieSearch();

    const trendingMovies = useTrendingMovies();

    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Trending trendingMovies={trendingMovies} />
            <AllMovies
                isLoading={isLoading}
                errorMessage={errorMessage}
                movieList={movieList}
                debouncedSearchTerm={debouncedSearchTerm}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
            />
        </>
    );
}

export default Home;
