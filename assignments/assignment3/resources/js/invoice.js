/** invoice.js
 *      invoice constructor
 *
 *  Revision History
 *      Gustavo Bonifacio Rodrigues, 2020.02.15: Created
 *      Gustavo Bonifacio Rodrigues, 2020.03.29: Refactor to new specs
 */
/** Collection of cost per item. p# where # is the item in the list */
const productCost = { "p1": 10, "p2": 20, "p3": 30 };
/** Map K,V of time per shipment. K is the index in the form, as number */
const shipmentTime = { 1:"1 day", 2:"2 days", 3:"3 days", 4:"4 days"};
/** Map K,V of the cost of shipment. K is the index in the form, as number*/
const shipmentCost = {1:40, 2:30, 3:20, 4:10};
/** The total of each product (cost * ammount) */
let p1total, p2total, p3total;
/** The selected delivery time */
let deliveryPrice;
/** The province */
let province;

/**
 * Creates the invoice based on the user form
 * @param {JSON} data 
 */
function createInvoice(data, salesTax, shipCost, beforeTax, tax, totalCost) {
    let customer = document.getElementById("customer");

    let cName = document.createElement("div");
    cName.className = 'groupLine';
    let cNameKey = document.createElement("div");
    cNameKey.className = 'key';
    cNameKey.textContent = 'Name';
    let cNameValue = document.createElement("div");
    cNameValue.className = 'value';
    cNameValue.textContent = data['customerName'];
    customer.appendChild(cNameKey);
    customer.appendChild(cNameValue);

    let cEmail = document.createElement("div");
    cEmail.className = 'groupLine';
    let cEmailKey = document.createElement("div");
    cEmailKey.className = 'key';
    cEmailKey.textContent = 'Email: '
    let cEmailValue = document.createElement("div");
    cEmailValue.className = 'value';
    cEmailValue.textContent = data['customerEmail'];
    customer.appendChild(cEmailKey);
    customer.appendChild(cEmailValue);

    let cPhone = document.createElement("div");
    cPhone.className = 'groupLine';
    let cPhoneKey = document.createElement("div");
    cPhoneKey.className = 'key';
    cPhoneKey.textContent = 'Phone: '
    let cPhoneValue = document.createElement("div");
    cPhoneValue.className = 'value';
    cPhoneValue.textContent = data['customerPhone']
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
    address.textContent = data['deliveryAddress'];
    br = document.createElement('br');
    deliveryValue.appendChild(address);


    let cityPair = document.createElement('p');
    cityPair.textContent = data['deliveryCity'] + ", " + data['deliveryProvince'];
    province = data['deliveryProvince']; // saves the province info
    deliveryValue.appendChild(cityPair);

    let postal = document.createElement('p');
    postal.textContent = data['deliveryPostal'];
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
    p1 = parseInt(data['product1']);
    p1total = productCost.p1 * p1;
    p1Key.textContent = p1 + " Real Bigfoot Air Freshner @ $ " + productCost.p1.toFixed(2);
    let p1Value = document.createElement('div');
    p1Value.className = 'value'
    p1 = parseFloat(data['product1']);
    p1Value.textContent = "$ " + p1total.toFixed(2);
    productLine.appendChild(p1Key);
    productLine.appendChild(p1Value);
    productBox.appendChild(productLine)
    //p2
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'p2';
    let p2Key = document.createElement('div');
    p2Key.className = 'key'
    p2 = parseInt(data['product2']);
    p2total = productCost.p2 * p2;
    p2Key.textContent = p2 + " Fake Mustache @ $ " + productCost.p2.toFixed(2);
    let p2Value = document.createElement('div');
    p2Value.className = 'value'
    p2Value.textContent = "$ " + p2total.toFixed(2);
    productLine.appendChild(p2Key);
    productLine.appendChild(p2Value);
    productBox.appendChild(productLine)
    //p3
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'p3';
    let p3Key = document.createElement('div');
    p3Key.className = 'key'
    p3 = parseInt(data['product3']);
    p3total = productCost.p3 * p3;
    p3Key.textContent = p3 + " Yodeling Pants @ $ " + productCost.p3.toFixed(2);
    let p3Value = document.createElement('div');
    p3Value.className = 'value'
    p3Value.textContent = "$ " + p3total.toFixed(2);
    productLine.appendChild(p3Key);
    productLine.appendChild(p3Value);
    productBox.appendChild(productLine)
    
    // shipping charges
    productLine = document.createElement('div');
    productLine.className = 'groupLine'
    productLine.id = 'shipCharges';
    let shippingChargesKey = document.createElement('div');
    shippingChargesKey.className = 'key'
    shippingChargesKey.textContent = "Shipping charges for " + shipmentTime[parseInt(data['shipmentDeliveryTime'])] + " day(s) delivery:";

    let shippingChargesValue = document.createElement('div');
    shippingChargesValue.className = 'value';
    shippingChargesValue.textContent = "$ " + shipCost.toFixed(2);
    
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
    subTotalValue.textContent = '$ ' + beforeTax.toFixed(2); // sum all the products
    subTotal.appendChild(subTotalKey);
    subTotal.appendChild(subTotalValue);
    // calculate taxes
    let taxes = document.createElement('div');
    taxes.className = 'groupLine'
    let taxesKey = document.createElement('div');
    taxesKey.className = 'key';
    taxesKey.textContent = 'Taxes @ ' + salesTax + "%";
    let taxesValue = document.createElement('div');
    taxesValue.className = 'value';
    taxesValue.textContent = '$ ' + tax.toFixed(2); // calculate based on the subtotal
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
    totalValue.textContent = '$ ' + totalCost.toFixed(2); //calculate total
    box.appendChild(totalKey);
    box.appendChild(totalValue);
    total.appendChild(box);

}



/**
 * Calculate the tax value from the subtotal
 * @returns {Number} the tax total
 */
function calculateTaxes() {
    return getSubtotal() * (taxes) / 100.0;
}

/**
 * Calculate the subtotal (sum of products + shippment)
 * @returns {Number} the subtotal
 */
function getSubtotal() {
    subtotal = deliveryPrice + parseFloat(p1total) + parseFloat(p2total) + parseFloat(p3total);
    return subtotal;
}

/**
 * Sum the total cost (subtotal + taxes)
 * @returns {Number} the total
 */
function calculateTotal() {
    return getSubtotal() + calculateTaxes();
}