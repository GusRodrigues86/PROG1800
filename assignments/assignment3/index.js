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
let province;



// view resolver
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/resources', express.static(__dirname + '/resources'));

// validation rules
app.use(bodyParser.urlencoded({ extended: false }));
// json parser
app.use(express.json());


// point of entry
app.get('/', function (req, res) {
    res.render('index.html');
});

// Post handling
app.post('/invoice', function (req, res) {
    // this should be on aa different file, that holds the BL
    // but how?
    
    // the tax ammount
    function taxByProvince() {
        let province = req.body['deliveryProvince'];
        let taxes;
        switch (province) {

            case "BC": taxes = 12;
                break;
            case "MB": taxes = 12;
                break;
            case "NB": taxes = 15;
                break;
            case "NL": taxes = 15;
                break;
            case "NS": taxes = 15;
                break;
            case "ON": taxes = 13;
                break;
            case "PE": taxes = 15;
                break;
            case "QC": taxes = 14.975;
                break;
            case "SK": taxes = 11;
                break
            default: taxes = 5;
        }
        return taxes;
    }
    // the cost to ship
    function shipmentCost() {
        let selected = req.body['shipmentDeliveryTime'];
        let costs = { 1: 40, 2: 30, 3: 20, 4: 10 }
        return costs[selected];
    }
    // beforeTaxes
    function beforeTaxes() {
        return (parseFloat(req.body['product1']) * 10) + 
            (parseFloat(req.body['product2']) * 20) + 
            (parseFloat(req.body['product3']) * 30) +
            shipmentCost();
    }
    function tax() {
        return beforeTaxes() * taxByProvince() / 100.0;
    }
    // total
    function total() {
        return beforeTaxes() + tax();
    }
    
    res.render('pages/invoice', { 
        invoice: req.body, 
        taxPercent: taxByProvince(),
        shipCost: shipmentCost(),
        subtotal: beforeTaxes(),
        tax: tax(),
        finalPrice: total()
    });
});

// 404
app.use(function (req, res) {
    res.status(404);
    res.render('pages/error/404.html');
});

app.listen(8080);
console.log('Lock and load @ 8080');
