var express = require('express');
var pythonController = require('./controllers/pythonController');

var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//Static Files
app.use(express.static('./public'));

//fire controllers
pythonController(app);

//listne to port
port = 8080;
app.listen(port);
console.log('You are listening to port #' + port);

//
