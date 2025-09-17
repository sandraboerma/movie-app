import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;
