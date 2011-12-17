/**
 * Module dependencies.
 */

express = require('express');
http = require('http');
sys = require('sys');
fs = require('fs');


// Create express server
app = module.exports = express.createServer('127.0.0.1');

// Connect to the Turbulence engine
turbulence = require('turbulence-engine')
turbulence.connect('localhost', 'newdb');

connect = require('connect');
auth = require('connect-auth');
// Configuration
require('./fb_creds.js');

app.configure( function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session( { secret: 'howlersecret' } ));
    app.use(express.logger( { format: ':date :remote-addr :method :status :url' } ));
    app.use(auth( [ auth.Facebook( { appId: fbId, appSecret: fbSecret, scope: "email", callback: fbCallbackAddress } ) ] ));
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// facebook account loader
require('./facebook_load.js');

// global functions
require('./global_funcs.js');

// Routes
require('./routes/home.js');
require('./routes/auth.js');
require('./routes/howl.js');
require('./routes/user.js');
require('./routes/about.js');

if(!module.parent) {
    app.listen(8000);
    console.log("Howler listening on port %d in %s mode", app.address().port, app.settings.env);
}
