import hero from "../assets/hero.png";
import Search from "./Search.jsx";

function Header({ searchTerm, setSearchTerm }) {
    return (
        <header>
            <img src={hero} alt="Hero banner" />
            <h1>
                Find your <span className="text-gradient">favorite movie</span>{" "}
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    );
}

export default Header;
