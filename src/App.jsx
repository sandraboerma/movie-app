import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="item/:id" element={<ItemDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
