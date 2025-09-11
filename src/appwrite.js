import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
    .setEndpoint(`https://cloud.appwrite.io/v1`)
    .setProject(PROJECT_ID);

const database = new Databases(client);

async function updateSearchCount(searchTerm, movie) {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal("searchTerm", searchTerm),
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org./t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function getTrendingMovies() {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);
        // console.log(result.documents);
        return result.documents;
    } catch (error) {
        console.error(error);
    }
}

export default updateSearchCount;

export { getTrendingMovies };
