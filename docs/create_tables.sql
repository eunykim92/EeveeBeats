CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    SpotifyID VARCHAR(255) UNIQUE,
    AccessToken TEXT,
    RefreshToken TEXT,
    AccessTokenExpires TIMESTAMP,
);