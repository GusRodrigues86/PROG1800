const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var myApp = express();
myApp.set('views', path.join(__dirname, 'views'));
myApp.set('view engine', 'ejs');
myApp.use(express.static(__dirname, + '/public'));

// HTTP Get call.
myApp.get('/', function (req,resp) {
//    resp.send('<h1>Gustavo Bonifacio Rodrigues</h1><h2>865222</h2>');
    resp.render('index');    
});

// port listener
myApp.listen(8080);
console.log('Lock and load.');