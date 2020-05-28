/** Final
 *  server.js -> entrypoint and routes
 *  
 */
var express = require('express');
const mongoose = require('mongoose'); // persistence unit
var path = require('path');
// extract form data
var bodyParser = require('body-parser');

var app = express();


// view resolver
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/resources', express.static(__dirname + '/resources'));

// validation rules
app.use(bodyParser.urlencoded({ extended: false }));
// json parser
app.use(express.json());

// persistence unit
// server validation
const { check, validationResult } = require('express-validator');
// mongoDb info
const DB_PATH = 'mongodb://localhost:27017/final';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// map the object
const Order = mongoose.model('Juice', {
    date: Number,
    name: String,
    phone: String,
    mango: Number,
    berry: Number,
    apple: Number,
    subtotal: Number,
    tax: Number,
    total: Number,
});

mongoose.connect(DB_PATH, mongoOptions);


// validation
/** Phone number validation
* @returns true iff the phone is valid
*/
function isPhoneValid(phone) {
    let phoneRegex = /\d{10}/;
    if (!phone || (phone.trim() === "") || !phoneRegex.test(phone)) {
        throw new Error('Phone format must be 10 digits, no spaces or dashes.');
    }
    return true;
}
/** calculates the subtotal
 * 
 * @param {Number} juice 
 * @param {Number} secondJuice 
 * @param {Number} thirdJuice 
 * @returns {Number} with the sum of totals
 */
function calculateSubTotal(juice, secondJuice, thirdJuice) {
    // p1, p2 and p3 are products and their prices
    let p1 = 2.99;
    let p2 = 1.99;
    let p3 = 2.49;

    return (p1 * juice) + (p2 * secondJuice) + (p3 * thirdJuice);
}

/**
 * @returns {Boolean} True iff the products are not bellow 0 or at least one above 0.
 */
function isProductAmmountValid(value, { req }) {
    let p1 = req.body.product1;
    let p2 = req.body.product2;
    let p3 = req.body.product3;

    if (isNaN(p1) || isNaN(p2) || isNaN(p3)) {
        throw new Error('Product ammount must be 0 or higher');
    }

    p1 = parseFloat(p1);
    p2 = parseFloat(p2);
    p3 = parseFloat(p3);

    if (p1 == 0 && p2 == 0 && p3 == 0) {
        throw new Error('Select at least one of the products');
    }
    if (p1 < 0 && p2 < 0 && p3 < 0) {
        throw new Error('Products cannot be negative');
    }
    return true;
}
// routes
// point of entry
app.get('/', function (req, res) {
    res.render('index', { title: "Order" });
});

app.get('/sales', function (req, res) {
    // call mongoDb for data
    Order.find({}).exec((err, orders) => {
        // no errors, proceed
        if (err === null) {
            res.render('report', { list: orders, title: "Report" });
        } else {

            console.log(err);
        }
    });
});

app.post('/', [
    // validation
    check('customerName', 'Invalid name').not().isEmpty(),
    check('customerPhone').custom(isPhoneValid),
    check('product').custom(isProductAmmountValid),
], function (req, res) {
    const errorMessages = validationResult(req);
    if (!errorMessages.isEmpty()) {
        res.render('index', { errors: errorMessages.array(), title: "Fix errors and resubmit" });
    } else {


        let subtotal = calculateSubTotal(parseInt(req.body['product1']), parseInt(req.body['product2']), parseInt(req.body['product3']));
    let tax = 0.13 * subtotal;
    let totals = subtotal + tax;
    
    
    let data = {
        date: Date.now(),
        name: req.body['customerName'],
        phone: req.body['customerPhone'],
        mango: parseInt(req.body['product1']),
        berry: parseInt(req.body['product2']),
        apple: parseInt(req.body['product3']),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: totals.toFixed(2),

    };
    
    let sale = new Order(data);
    sale.save().then(() => { console.log('saved') });
    
    res.render('invoice', {title: 'Sale saved!', info:data})
}});

// port listener
app.listen(8080);
console.log('Lock and load @ 8080');

class Juice {
    constructor (data) {
        this.date = data.date;
        this.name = data.name;
        this.phone = data.phone;
        this.mango = data.mango;
        this.berry = data.berry;
        this.apple = data.apple;
        this.subtotal = data.subtotal;
        this.tax = data.tax;
        this.total = data.total;
    }
}