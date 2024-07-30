import sqlite3 from "sqlite3";
import { open } from "sqlite";

//@ts-ignore
let db = null;

//@ts-ignore
export async function GET(req, res) {
    //@ts-ignore
    if (!db) {
        db = await open({
            filename: "./database.db",
            driver: sqlite3.Database,
        });
    }

    const users = await db.all("SELECT * FROM Users");

    return new Response(JSON.stringify(users), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}