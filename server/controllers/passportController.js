require('dotenv').config();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const db = require('../models/db');

const port = process.env.PORT || 3000;
const callbackUrl = `http://localhost:${port}/callback`;

const spotifyStrategy = new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: callbackUrl,
},
function(accessToken, refreshToken, expiresIn, profile, done) {
    const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log('Spotify Profile Object:', profile);
    console.log('Display Name:', profile.displayName);
    console.log('Emails', profile.emails);
    // check if the user exists in your database
    db.query('SELECT * FROM Users WHERE SpotifyID = $1', [profile.id], (err, result) => {
        if (err) {
            return done(err);
        }
        if (result.rows.length) {
            // user exists, update the tokens
            const user = result.rows[0];
            db.query('UPDATE Users SET AccessToken = $1, RefreshToken = $2, AccessTokenExpires = $3 WHERE UserID = $4',
            [accessToken, refreshToken, expiryDate, user.UserID],
            (err) => {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        } else {
            // new user, insert them into the database
            db.query('INSERT INTO Users (Username, Email, SpotifyID, AccessToken, RefreshToken, AccessTokenExpires) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [profile.username, profile.emails[0].value, profile.id, accessToken, refreshToken, expiryDate],
            (err, result) => {
                if (err) {
                    return done(err);
                }
                const newUser = result.rows[0];
                return done(null, newUser);
            });
        }
    });
});

const serializeUser = (user, done) => {
    done(null, user.UserID);
};

const deserializeUser = (id, done) => {
    db.query('SELECT * FROM Users WHERE UserID = $1', [id], (err, result) => {
        if (err) return done(err);
        done(null, result.rows[0]);
    })
};

module.exports = {
    spotifyStrategy,
    serializeUser,
    deserializeUser,
}