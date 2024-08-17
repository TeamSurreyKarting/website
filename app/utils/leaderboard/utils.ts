import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const getLeaderboard = async (limit: number) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    const leaderboard = await db.all(
        `SELECT * FROM Leaderboard ORDER BY Score DESC LIMIT ?`,
        [limit]
    );

    await db.close();
    return leaderboard;
}

export const addScore = async (name: string, score: number) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    await db.run(
        `INSERT INTO Leaderboard (Name, Score) VALUES (?, ?)`,
        [name, score]
    );

    await db.close();
    console.log(`Score ${score} added to the leaderboard`);
}

export const getScore = async (name: string) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    const score = await db.get(
        `SELECT Score FROM Leaderboard WHERE Name = ?`,
        [name]
    );

    await db.close();
    return score;
}

export const resetLeaderboard = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    await db.run(
        `DELETE FROM Leaderboard`
    );

    await db.close();
    console.log('Leaderboard reset');
}

export const calculatePoints = (score: number, time: number) => {
    return Math.round(score * 1000 / time);
}

export const getRank = async (name: string) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    const rank = await db.get(
        `SELECT COUNT(*) AS Rank FROM Leaderboard WHERE Score > (SELECT Score FROM Leaderboard WHERE Name = ?)`,
        [name]
    );

    await db.close();
    return rank.Rank + 1;
}
