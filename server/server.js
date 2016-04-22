var express = require('express');
var app = express();
var port = 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');

//setup middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//set static client route
app.use(express.static('client'));

require('./routes.js')(app);

app.listen(port, function() {
  console.log('listening on port...' + port);
});

module.exports = app;