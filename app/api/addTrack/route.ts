import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { track_name, track_location, track_type } = body;

        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        await db.run(
            `INSERT INTO Track (track_name, track_location, track_type)
             VALUES (?, ?, ?)`,
            [track_name, track_location, track_type]
        );

        await db.close();

        return NextResponse.json({ message: 'Track added successfully' }, { status: 200 });
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
