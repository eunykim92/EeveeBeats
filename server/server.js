const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes/router');
const passport = require('passport');
const session = require('express-session');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passportController = require('./controllers/passportController');

const app = express();
const PORT = 3000;

dotenv.config();

// Require routers
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// passport configuration 
passport.use(passportController.spotifyStrategy);

// serialize and deserialize user
passport.serializeUser(passportController.serializeUser);
passport.deserializeUser(passportController.deserializeUser);

// express session middlware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Home routing
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// router route handlers
app.use('/', router);

// 404 error handler
app.use('*', (req, res) => {
  res.status(404).send('Page not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message.err);
  if (!res.headersSent) {
    return res.status(errorObj.status).json(errorObj.message);
  }
});

app.listen(PORT, () => {
  console.log(` listening on port: ${PORT}`);
});
