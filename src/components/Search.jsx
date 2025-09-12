import searchicon from "../assets/search.svg";

function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className="search">
            <div>
                <img src={searchicon} alt="search" />

                <input
                    type="text"
                    placeholder="Search a movie title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Search;
