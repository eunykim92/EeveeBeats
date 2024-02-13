const express = require('express');
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

// route to initiate oauth with spotify
router.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'playlist-read-private'],
    showDialog: true,
}));

// callback route that spotify redirects to after successful authentication
router.get('/auth/spotify/callback', passport.authenticate('spotify', {
    successRedirect: '/homepage',
    failureRedirect: '/',
  })
);

module.exports = router;