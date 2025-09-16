import { useParams } from "react-router-dom";

function ItemDetail() {
    const { id } = useParams();
    return (
        <>
            <section className="all-movies">
                <h2>Movie details</h2>
                <p className="text-gray-300">ID: {id}</p>
            </section>
        </>
    );
}

export default ItemDetail;
