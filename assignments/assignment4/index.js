/** index.js
 *      server and routes for assignment
 * 
 *  Revision History
 *      Gustavo Bonifacio Rodrigues: 2020.03.28: Created
 *      Gustavo Bonifacio Rodrigues: 2020.04.08: Serverside validation
 */

var express = require('express');
var path = require('path');
// extract form data
var bodyParser = require('body-parser');

// objects to be handled
const Validator = require('./validators/validator');

var app = express();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const DB_PATH = 'mongodb://localhost:27017/assignment';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const Order = mongoose.model('Order', {
    date: Number,
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    postal: String,
    p1: Number,
    p2: Number,
    p3: Number,
    deliveryDay: Number,
    provinceTax: Number,
    shipmentCost: Number,
    beforeTaxes: Number,
    tax: Number,
    total: Number
});

const db = mongoose.connect(DB_PATH, mongoOptions);

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
    res.render('index');
});

/**
* true iff the phone is valid
*/
function isPhoneValid(phone) {
    let phoneRegex = /\d{3}[-]\d{3}[-]\d{4}/;
    if (!phone || (phone.trim() === "") || !phoneRegex.test(phone)) {
        throw new Error('Phone fromat must be xxx-xxx-xxxx');
    }
    return true;
}

/**
 * true iff postal code is valid for canada
 */
function isPostalCodeValid(postalCode) {
    let postalRegex = /[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s]\d[ABCEGHJ-NPRSTV-Z]\d/i;
    if (!postalCode || (postalCode.trim() === "") ||
        !postalRegex.test(postalCode)) {
        throw new Error('Invalid Canadian postal code format. Valid format is X9X 9X9');
    }
    return true;
}

/**
 * if the user selected a province
 * @param {*} province 
 */
function isProvinceValid(province) {

    if (!province) {
        throw new Error('Select a province');
    }
    province = province + "".trim();
    let valid = false;
    let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"];
    provinces.forEach(p => {
        if (province === p) {
            valid = true;
        }
    });

    if (!valid) {
        throw new Error('Invalid province.');
    }
    return valid;

}

/**
 * true iff the products are not bellow 0 or at least one above 0.
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

function isShipmentValid(shipment) {
    if (isNaN(shipment) || !shipment) {
        throw new Error('Invalid Delivery Time');
    }
    shipment = parseInt(shipment);
    if (shipment <= 0) {
        throw new Error('Invalid Delivery Time');
    }
    return true;
}
// Form handling
app.post('/invoice',
// server side validation. May need further sanitation for no Little Bobby Tables
    [
        check('customerName', 'Invalid name').not().isEmpty(),
        check('customerEmail', 'invalid email').isEmail(),
        check('customerPhone').custom(isPhoneValid),
        check('deliveryAddress', 'Invalid address').notEmpty(),
        check('deliveryCity', 'Invalid city').notEmpty(),
        check('deliveryProvince').custom(isProvinceValid),
        check('deliveryPostalCode').custom(isPostalCodeValid),
        check('product').custom(isProductAmmountValid),
        check('shipmentDeliveryTime').custom(isShipmentValid)
    ],
    function (req, res) {
        const errorMessages = validationResult(req);
        if (errorMessages.isEmpty()) {
            const form = new Validator(req.body);
            // create data to be saved and 
            let data = {
                date: Date.now(),
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                city: form.city,
                province: form.province,
                postal: form.postal,
                p1: form.p1,
                p2: form.p2,
                p3: form.p3,
                deliveryDay: form.deliveryDay,
                provinceTax: form.provinceTax(),
                shipmentCost: form.shipmentCost(),
                beforeTaxes: form.beforeTaxes(),
                tax: form.tax(),
                total: form.total(),
            };
            
            let sale = new Order(data);
            // connect to the db and save
            sale.save().then(() => { console.log('saved') });
            res.render('pages/invoice', {
                invoice: req.body,
                taxPercent: form.provinceTax(),
                shipCost: form.shipmentCost(),
                subtotal: form.beforeTaxes(),
                tax: form.tax(),
                finalPrice: form.total()
            });
        }
        else {
            res.render('index', { errors: errorMessages.array() })
        }
    });

/**
 * Sales report route
 */
app.get('/sales', function (req, res) {
    // call mongoDb for data
    Order.find({}).exec((err, orders) => {
        // no errors, proceed
        if (err === null) {
            res.render('pages/sales', { list: orders });
        } else {

            console.log(err);
        }
    });
});

// 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('pages/error/404.html');
});

app.listen(8080);
console.log('Lock and load @ 8080');
