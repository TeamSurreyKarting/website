import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, dateOfBirth, email, membership } = body;

        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        await db.run(
            `INSERT INTO Users (FirstName, LastName, DateOfBirth, Email, Membership)
             VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, dateOfBirth, email, membership]
        );

        await db.close();

        return NextResponse.json({ message: 'User added successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
