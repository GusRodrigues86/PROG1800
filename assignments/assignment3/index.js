/** index.js
 *      server and routes for assignment
 * 
 *  Revision History
 *      Gustavo Bonifacio Rodrigues: 2020.03.28: Created
 */
var express = require('express');
var path = require('path');
// extract form data
var bodyParser = require('body-parser');

var app = express();

// view resolver
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/resources',express.static(__dirname + '/resources'));

// validation rules
app.use(bodyParser.urlencoded({extended: false}));
// json parser
app.use(express.json());


// point of entry
app.get('/', function(req,res){
    res.render('index.html');
});

// Post handling
app.post('/invoice', function(req,res){
    //console.log(req.body);
    res.render('pages/invoice', {invoice:req.body});
});

// 404
app.use(function(req,res) {
    res.status(404);
    res.render('pages/error/404.html');
});

app.listen(8080);
console.log('Lock and load @ 8080');
