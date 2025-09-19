import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
    const [open, setOpen] = useState(false);
    const linkClass = ({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link");
    const close = () => setOpen(false);

    return (
        <nav className={`navbar ${open ? "is-open" : ""}`}>
            <Link to="/" className="brand" aria-label="Go home" onClick={close}>
                <img src={logo} alt="" className="brand-logo" />
                <span className="brand-name">Yet Another Movie App</span>
            </Link>

            <button
                type="button"
                className="menu-btn md:hidden"
                aria-expanded={open}
                aria-controls="primary-nav"
                aria-label="Toggle navigation"
                onClick={() => setOpen((v) => !v)}
            >
                {open ? (
                    <svg viewBox="0 0 24 24" className="icon">
                        <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" className="icon">
                        <path
                            d="M3 6h18M3 12h18M3 18h18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </button>

            <ul id="primary-nav" className="menu">
                <li>
                    <NavLink to="/" end className={linkClass} onClick={close}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites" className={linkClass} onClick={close}>
                        Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
