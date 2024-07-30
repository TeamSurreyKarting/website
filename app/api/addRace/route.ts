import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { track_id, race_date, racer_count } = body;

        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        await db.run(
            `INSERT INTO Race (track_id, race_date, racer_count)
             VALUES (?, ?, ?)`,
            [track_id, race_date, racer_count]
        );

        await db.close();

        return NextResponse.json({ message: 'Race added successfully' }, { status: 200 });
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
