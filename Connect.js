// sqlite3 docs
// https://github.com/TryGhost/node-sqlite3
// https://github.com/TryGhost/node-sqlite3/wiki/API

// Useful Tutorial
// https://javascript.plainenglish.io/crud-with-next13-sqlite-1b104d9156c

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("Connected to the Database");
        }
    }
);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName VARCHAR(255) NOT NULL,
        LastName VARCHAR(255),
        DateOfBirth DATE,
        Email VARCHAR(255) NOT NULL,
        Membership VARCHAR(12) CHECK (Membership IN ('Professional', 'Social'))
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Users table");
    });

    db.run(`CREATE TABLE IF NOT EXISTS Leaderboard (
        lb_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        TotalPoints INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Leaderboard table");
    });

    db.run(`CREATE TABLE IF NOT EXISTS UserStatistics (
        user_id INTEGER,
        race_id INTEGER,
        position_id INTEGER,
        Time TIME,
        PRIMARY KEY (user_id, race_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (race_id) REFERENCES Race(race_id),
        FOREIGN KEY (position_id) REFERENCES Position(position_id)
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created UserStatistics table");
    });

    db.run(`CREATE TABLE IF NOT EXISTS Position (
        position_id INTEGER PRIMARY KEY AUTOINCREMENT,
        position INTEGER NOT NULL,
        points INTEGER NOT NULL
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Position table");
    });

    db.run(`CREATE TABLE IF NOT EXISTS Race (
        race_id INTEGER PRIMARY KEY AUTOINCREMENT,
        track_id INTEGER,
        race_date DATE NOT NULL,
        racer_count INTEGER NOT NULL,
        FOREIGN KEY (track_id) REFERENCES Track(track_id)
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Race table");
    });

    db.run(`CREATE TABLE IF NOT EXISTS Track (
        track_id INTEGER PRIMARY KEY AUTOINCREMENT,
        track_name VARCHAR(255) NOT NULL,
        track_location VARCHAR(255) NOT NULL,
        track_type VARCHAR(10) CHECK (track_type IN ('INDOOR', 'OUTDOOR'))
    );`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Created Track table");
    });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Closed the database connection.");
    });
});
