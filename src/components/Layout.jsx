import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <NavBar />
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
