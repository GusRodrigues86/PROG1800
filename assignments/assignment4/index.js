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
const validator = require('./validators/validator');
var app = express();
const { check, validationResult } = require('express-validator');



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
    if (!province)
    {
        throw new Error('Select a province');
    }
    let provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"];
    province = province + "";
    provinces.forEach(p => {
        if (province.trim().toUpperCase() == 
        p) {
            return true;
        }
    });
    throw new Error('Invalid province.');
}

/**
 * true iff the products are not bellow 0 or at least one above 0.
 */
function isProductAmmountValid(value,{req}) {
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
// Post handling
app.post('/invoice',
    [
        check('customerName', 'Invalid name').not().isEmpty(),
        check('customerEmail', 'invalid email').isEmail(),
        check('customerPhone').custom(isPhoneValid),
        check('deliveryAddress', 'Invalid address').notEmpty(),
        check('deliveryCity', 'Invalid city').notEmpty(),
        check('deliveryProvince').custom(isProvinceValid),
        check('deliveryPostal').custom(isPostalCodeValid),
        check('product').custom(isProductAmmountValid),
        check('shipmentDeliveryTime').custom(isShipmentValid)
    ],
    function (req, res) {
        const errorMessages = validationResult(req);
        if (errorMessages.isEmpty()) {
            const form = new validator(req.body);
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
            res.render('index', {errors:errorMessages.array()})
        }
        
    });

// 404
app.use(function (req, res) {
    res.status(404);
    res.render('pages/error/404.html');
});

app.listen(8080);
console.log('Lock and load @ 8080');
