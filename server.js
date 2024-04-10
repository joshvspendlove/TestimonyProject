// Get dependencies
var express = require('express');
const session = require("express-session");
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

const { verifySession, verifyLoggedIn } = require("./server/secure");


var index = require('./server/routes/app');
var authRoutes = require('./server/routes/auth');
var testimonyRoutes = require("./server/routes/testimony");


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow cookies
  next();
});

app.use(session({
  secret: "This is my private hosted website!",
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: "strict",
  }
}));

// Start session logged out
app.use((req, res, next) => {
  if(!req.session.loggedin)
    req.session.loggedin = false
  next();
});

app.use(verifySession)

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, './dist/testimony-project/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/api/auth', authRoutes)

app.use("/api/testimony",testimonyRoutes)


mongoose.connect('mongodb://localhost:27017/testimony?directConnection=true',
  { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
    // Now you can define your Mongoose schemas and models, and perform database operations
  })
  .catch((err) => {
    console.error('Connection failed: ', err);
  });

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/testimony-project/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port)
});