CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255),
    DateOfBirth DATE,
    Email VARCHAR(255) NOT NULL,
    Membership VARCHAR(12) CHECK (Membership IN ('Professional', 'Social'))
);

CREATE TABLE Leaderboard (
    lb_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    TotalPoints INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserStatistics (
    user_id INTEGER,
    race_id INTEGER,
    position_id INTEGER,
    Time TIME,
    PRIMARY KEY (user_id, race_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (race_id) REFERENCES Race(race_id),
    FOREIGN KEY (position_id) REFERENCES Position(position_id)
);

CREATE TABLE Position (
    position_id SERIAL PRIMARY KEY,
    position INTEGER NOT NULL,
    points INTEGER NOT NULL
);

CREATE TABLE Race (
    race_id SERIAL PRIMARY KEY,
    track_id INTEGER,
    race_date DATE NOT NULL,
    racer_count INTEGER NOT NULL,
    FOREIGN KEY (track_id) REFERENCES Track(track_id)
);

CREATE TABLE Track (
    track_id SERIAL PRIMARY KEY,
    track_name VARCHAR(255) NOT NULL,
    track_location VARCHAR(255) NOT NULL,
    track_type VARCHAR(10) CHECK (track_type IN ('INDOOR', 'OUTDOOR'))
);