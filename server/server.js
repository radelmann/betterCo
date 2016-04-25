var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var env = require('./config/env.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/betterco');

//setup middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

//set static client route
app.use(express.static('client'));

require('./util/passport')(passport);
require('./routes.js')(app, passport);

app.listen(env.port, function() {
  console.log('listening on port...' + env.port);
});

module.exports = app;