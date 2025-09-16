import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";
import Trending from "./components/Trending.jsx";
import AllMovies from "./components/AllMovies.jsx";
import useTrendingMovies from "./hooks/useTrendingMovies.js";
import useMovieSearch from "./hooks/useMovieSearch.js";
import useFavorites from "./hooks/useFavorites.js";

function App() {
    const { searchTerm, setSearchTerm, debouncedSearchTerm, movieList, isLoading, errorMessage } =
        useMovieSearch();

    const { isFavorite, toggleFavorite } = useFavorites();

    const trendingMovies = useTrendingMovies();

    return (
        <Layout>
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
        </Layout>
    );
}

export default App;
