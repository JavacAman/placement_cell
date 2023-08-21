//NodeJS provides the require function, whose job is to load modules and give you access to their exports.
//it instantiates Express.
const express = require('express');

//it instantiates dotenv
const dotenv = require('dotenv');

//instantiates database
const db = require('./config/mongoose');

// It stores session data on the server side, using a variety of different storage options, and allows you to track the activity of a user across requests
//Sessions are used to make the HTTP server stateful.
//Cookies are only stored on the client-side machine, while sessions get stored on the client as well as the server.
const session = require('express-session');

// Passport is Express-compatible authentication middleware for Node.js. Passport's sole purpose is to authenticate requests
const passport = require('passport');

//passport-local is the strategy you would use if you are authenticating against a username and password stored 'locally' i.e. in the database of your app 
const passportLocal = require('./config/passport-local-startegy');

//process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.PORT || 8000;


//The dotenv package for handling environment variables is the most popular option in the Node.js community. 
//You can create an.env file in the application's root directory that contains key/value pairs defining the project's required environment variables.
dotenv.config({ path: 'config/.env' });

//it assigns express to app variable.
const app = express();


// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//The app. use() method mounts or puts the specified middleware functions at the specified path. 
//This middleware function will be executed only when the base of the requested path matches the defined path.
app.use(
	session({
		//change the secrate before deployment in production mode
		secret: "hello", // SECRET is stored in the system veriable
		//if the session data is alredy stored we dont need to rewrite it again and again so this is set to false
		resave: false,
		//when the user is not logged in or identity is not establish in that case we dont need to save extra data in
		//session cookie so this is set to false
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 100 },
	})
);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.urlencoded({ extended: true }));
//for static file use
app.use(express.static('./assets'));

// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// express router
app.use('/', require('./routes'));

// listen on port
app.listen(port, function (error) {
	if (error) {
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
	console.log(`Server running on port: ${port}`);
});
