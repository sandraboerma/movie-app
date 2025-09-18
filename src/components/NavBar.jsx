import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
    const linkClass = ({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link");

    return (
        <nav className="navbar">
            <Link to="/" className="brand" aria-lable="Go home">
                <img src={logo} alt="" className="brand-logo" />
                <span>Yet Another Movie App</span>
            </Link>

            <ul className="nav-items">
                <li>
                    <NavLink to="/" end className={linkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" className={linkClass}>
                        Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
