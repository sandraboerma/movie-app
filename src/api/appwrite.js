import { Client, Databases, ID, Query } from "appwrite";
import { tmdbImage } from "./tmdb.js";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
    .setEndpoint(`https://cloud.appwrite.io/v1`)
    .setProject(PROJECT_ID);

const database = new Databases(client);

async function updateSearchCount(searchTerm, movie) {
    try {
        const key = String(searchTerm ?? "")
            .trim()
            .toLowerCase();

        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal("searchTerm", key),
        ]);

        const poster = tmdbImage(movie?.poster_path, "w342");

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: (Number(doc.count) || 0) + 1,
            });
        } else {
            const newSearchRow = {
                searchTerm: key,
                count: 1,
                movie_id: movie.id,
            };

            if (poster !== undefined) {
                newSearchRow.poster_url = poster;
            }
            await database.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                newSearchRow
            );
        }
    } catch (error) {
        console.error(
            "Appwrite create/update error:",
            error?.code,
            error?.message,
            error
        );
    }
}

async function getTrendingMovies() {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);
        return result.documents;
    } catch (error) {
        console.error(error);
    }
}

export default updateSearchCount;

export { getTrendingMovies };
