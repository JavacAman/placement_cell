//The Passport is a node package, or library which we can install in any nodeJs project. 
//The Passport provides the functionality for authentication in the app. 
//Also, it provides different encryption strategies to encrypt user information, such as a password.
const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');


//authentication using passport
const local = new LocalStrategy({ usernameField: 'email' }, function (email,password,done) 
{

  //find a user and establish the identity
  User.findOne({ email }, function (error, user) {
    if (error) {
      console.log(`Error in finding user: ${error}`);
      return done(error);
    }

    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.use('local', local);

//serialize the user to decide which key is to be kept in the cookies 
//Passport uses serializeUser function to persist user data (after successful authentication) into session. 
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize user
//Function deserializeUser is used to retrieve user data from session.
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user--> Passport');
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
