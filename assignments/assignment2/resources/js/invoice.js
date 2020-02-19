/** invoice.js
 *      invoice constructor
 *
 *  Revision History
 *      Gustavo Bonifacio Rodrigues, 2020.02.15: Created
 */

window.onload = function () {
    // only the forms that attach the 
    if (sessionStorage['customerInfo'] == null) {
        this.sessionStorage['invalid'] = true;
        window.location = '../index.html';
    }
    createInvoice();
};

let customerInfo = JSON.parse(sessionStorage['customerInfo']);
let deliveryInfo = JSON.parse(sessionStorage['deliveryInfo']);
let productInfo = JSON.parse(sessionStorage['products']);
let shipment = JSON.parse(sessionStorage['shipment']);
const productCost = { "p1": 10, "p2": 20, "p3": 30 };
const shipmentCost = [40, 30, 20, 10];

function createInvoice() {
    let customer = document.getElementById("customer");

    let cName = document.createElement("div");
    cName.className = 'groupLine';
    let cNameKey = document.createElement("div");
    cNameKey.className = 'key';
    cNameKey.textContent = 'Name';
    let cNameValue = document.createElement("div");
    cNameValue.className = 'value';
    cNameValue.textContent = customerInfo.Name;
    customer.appendChild(cNameKey);
    customer.appendChild(cNameValue);

    let cEmail = document.createElement("div");
    cEmail.className = 'groupLine';
    let cEmailKey = document.createElement("div");
    cEmailKey.className = 'key';
    cEmailKey.textContent = 'Email: '
    let cEmailValue = document.createElement("div");
    cEmailValue.className = 'value';
    cEmailValue.textContent = customerInfo.Email;
    customer.appendChild(cEmailKey);
    customer.appendChild(cEmailValue);

    let cPhone = document.createElement("div");
    cPhone.className = 'groupLine';
    let cPhoneKey = document.createElement("div");
    cPhoneKey.className = 'key';
    cPhoneKey.textContent = 'Phone: '
    let cPhoneValue = document.createElement("div");
    cPhoneValue.className = 'value';
    cPhoneValue.textContent = customerInfo['Phone']
    customer.appendChild(cPhoneKey);
    customer.appendChild(cPhoneValue);


    // Delivery information
    let delivery = document.getElementById("delivery");
    let wrapper = document.createElement('div');
    wrapper.className = 'groupLine';
    wrapper.id = 'deliveryInfo';
    let deliveryKey = document.createElement("div");
    deliveryKey.className = 'key';
    deliveryKey.textContent = 'Delivery Address: ';
    wrapper.appendChild(deliveryKey);

    let deliveryValue = document.createElement("div");
    deliveryValue.className = 'value';
    let address = document.createElement('p');
    address.textContent = deliveryInfo.Address;
    br = document.createElement('br');
    deliveryValue.appendChild(address);


    let cityPair = document.createElement('p');
    cityPair.textContent = deliveryInfo.City + ", " + deliveryInfo.Province;
    deliveryValue.appendChild(cityPair);

    let postal = document.createElement('p');
    postal.textContent = deliveryInfo.Postal;
    deliveryValue.appendChild(postal);
    wrapper.appendChild(deliveryValue);
    delivery.appendChild(wrapper);

    // Product information
    let productBox = document.getElementById("products");
    let productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'p1';
    let p1Key = document.createElement('div');
    p1Key.className = 'key'
    p1Key.textContent = productInfo.p1 + " Real Bigfoot Air Freshner @ $ " + productCost.p1.toFixed(2);
    let p1Value = document.createElement('div');
    p1Value.className = 'value'
    p1Value.textContent = "$ " + (parseFloat(productInfo.p1) * parseFloat(productCost.p1)).toFixed(2);
    productLine.appendChild(p1Key);
    productLine.appendChild(p1Value);
    productBox.appendChild(productLine)
    //p2
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'p2';
    let p2Key = document.createElement('div');
    p2Key.className = 'key'
    p2Key.textContent = productInfo.p2 + " Fake Mustache @ $ " + productCost.p2.toFixed(2);
    let p2Value = document.createElement('div');
    p2Value.className = 'value'
    p2Value.textContent = "$ " + (parseFloat(productInfo.p2) * parseFloat(productCost.p2)).toFixed(2);
    productLine.appendChild(p2Key);
    productLine.appendChild(p2Value);
    productBox.appendChild(productLine)
    //p3
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'p3';
    let p3Key = document.createElement('div');
    p3Key.className = 'key'
    p3Key.textContent = productInfo.p3 + " Yodeling Pants @ $ " + productCost.p3.toFixed(2);
    let p3Value = document.createElement('div');
    p3Value.className = 'value'
    p3Value.textContent = "$ " + (parseFloat(productInfo.p3) * parseFloat(productCost.p3)).toFixed(2);
    productLine.appendChild(p3Key);
    productLine.appendChild(p3Value);
    productBox.appendChild(productLine)
    // shipping charges
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'shipCharges';
    let shippingChargesKey = document.createElement('div');
    shippingChargesKey.className = 'key'
    shippingChargesKey.textContent = "Shipping charges for " + shipment.shipmentTime + " day(s) delivery:";
    
    let shippingChargesValue = document.createElement('div');
    shippingChargesValue.className = 'value'
    shippingChargesValue.textContent = "$ " + (shipmentCost[parseInt(shipment.shipmentTime)]).toFixed(2);
    productLine.appendChild(shippingChargesKey);
    productLine.appendChild(shippingChargesValue);
    productBox.appendChild(productLine)


    // SubTotal and taxes
    let before = document.getElementById("subtotal");

    let subTotal = document.createElement('div');
    subTotal.className = 'groupLine';
    let subTotalKey = document.createElement('div');
    subTotalKey.className = 'key';
    subTotalKey.textContent = 'Subtotal: ';
    let subTotalValue = document.createElement('div');
    subTotalValue.className = 'value';
    subTotalValue.textContent = '$ ' + getSubtotal().toFixed(2); // sum all the products
    subTotal.appendChild(subTotalKey);
    subTotal.appendChild(subTotalValue);
    // calculate taxes
    let taxes = document.createElement('div');
    taxes.className = 'groupLine'
    let taxesKey = document.createElement('div');
    taxesKey.className = 'key';
    taxesKey.textContent = 'Taxes @ ' + getTotalTaxesByProvince() + "%";
    let taxesValue = document.createElement('div');
    taxesValue.className = 'value';
    taxesValue.textContent = '$ ' + calculateTaxes().toFixed(2); // calculate based on the subtotal
    taxes.appendChild(taxesKey);
    taxes.appendChild(taxesValue);
    before.appendChild(subTotal);
    before.appendChild(taxes);

    // total
    let total = document.getElementById("total");
    let box = document.createElement('div');
    box.className = 'groupLine';
    let totalKey = document.createElement('div');
    totalKey.className = 'key';
    totalKey.textContent = 'Total: ';
    let totalValue = document.createElement('div');
    totalValue.className = 'value';
    totalValue.textContent = '$ ' + calculateTotal().toFixed(2); //calculate total
    box.appendChild(totalKey);
    box.appendChild(totalValue);
    total.appendChild(box);
}

/**
 * With the province code, return the tax %
 * @returns {Number} the tax % (i.e. 10% = 10)
 */
function getTotalTaxesByProvince() {
    let province = deliveryInfo.Province;
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

/**
 * Calculate the tax value from the subtotal
 * @returns {Number} the tax total
 */
function calculateTaxes() {
    return getSubtotal() * (parseFloat(getTotalTaxesByProvince()) / 100.0);

}

/**
 * Calculate the subtotal (sum of products + shippment)
 * @returns {Number} the subtotal
 */
function getSubtotal() {
    let p1Value = productCost.p1 * parseFloat(productInfo.p1);
    let p2Value = productCost.p2 * parseFloat(productInfo.p2);
    let p3Value = productCost.p3 * parseFloat(productInfo.p3);
    let shipmentValue = shipmentCost[parseInt(shipment.shipmentTime)];

    return p1Value + p2Value + p3Value + shipmentValue;
}

/**
 * Sum the total cost (subtotal + taxes)
 * @returns {Number} the total
 */
function calculateTotal() {
    return getSubtotal() + calculateTaxes();
}