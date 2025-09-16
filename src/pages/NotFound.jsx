import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <section className="all-movies">
                <h2>400 - Page not found</h2>
                <p className="text-gray-300">
                    <Link to="/" className="underline">
                        Go back home
                    </Link>
                </p>
            </section>
        </>
    );
}

export default NotFound;
