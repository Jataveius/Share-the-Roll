//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// var myPassportService = require('../strategies/user.strategy')(passport)
// Handles Ajax request for user information if user is authenticated
router.get('/',passport.authenticate('jwt', { session: false }), function(req, res) {
  console.log('get /admin route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request 
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

// Admin post to create new child user in database
router.post('/', function(req, res) {
    users.create(req.body, function(err, post) {
         if(err) {
         } else {
          res.sendStatus( 200 );
         }
    });
});

// Handles POST request with child user data
router.post('/', function(req, res, next) {
    Users.create(req.body, function(err, post) {
         if(err) {
           // next() here would continue on and route to routes/index.js
           next(err);
         } else {
          // route a new express request for GET '/'
          res.redirect('/admin');
         }
    });
});

module.exports = router;
