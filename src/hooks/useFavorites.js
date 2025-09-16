import { useEffect, useMemo, useState } from "react";

const KEY = "favorites";

function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(KEY) ?? "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify(favorites));
        } catch (error) {
            console.warn("Could not save favorites to localStorage", error);
        }
    }, [favorites]);

    const idSet = useMemo(() => new Set(favorites), [favorites]);

    const isFavorite = (id) => idSet.has(id);

    const toggleFavorite = (id) => {
        setFavorites((prev) => (idSet.has(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
    };

    return { favorites, isFavorite, toggleFavorite };
}

export default useFavorites;
