/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

// Connect to mongodb database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);

/**
 * All Express based configuration
 */
var env = app.get('env');

app.set('views', config.root + '/server/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(passport.initialize());

// Persist sessions with mongoStore
// We need to enable sessions for passport twitter because its an oauth 1.0 strategy
app.use(session({
  secret: config.secrets.session,
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    mongooseConnection: mongoose.connection,
    db: 'angular-fullstack'
  })
}));

if ('production' === env) {
  app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  app.use(express.static(path.join(config.root, 'public')));
  app.set('appPath', path.join(config.root, 'public'));
  app.use(morgan('dev'));
}

if ('development' === env || 'test' === env) {
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(config.root, '.tmp')));
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', path.join(config.root, 'client'));
  app.use(morgan('dev'));
  app.use(errorHandler()); // Error handler - has to be last
}

require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
