import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id, race_id, position_id, Time } = body;

        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        await db.run(
            `INSERT INTO UserStatistics (user_id, race_id, position_id, Time)
             VALUES (?, ?, ?, ?)`,
            [user_id, race_id, position_id, Time]
        );

        await db.close();

        return NextResponse.json({ message: 'User added to Race successfully' }, { status: 200 });
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
