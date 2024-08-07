'use server';
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { FieldValues } from "react-hook-form";

export const AddUser = async (data : FieldValues) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    await db.run(
        `INSERT INTO Users (FirstName, LastName, DateOfBirth, Email, Membership)
        VALUES (?, ?, ?, ?, ?)`,
        [data.firstName, data.lastName, data.dateOfBirth, data.email, data.membership]
    )

    await db.close();
    console.log(`User ${data.firstName}${data.lastName ? " " + data.lastName : ""} added to the database`);
}