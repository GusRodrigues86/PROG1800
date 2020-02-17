/** invoice.js
 *      invoice constructor
 *
 *  Revision History
 *      Gustavo Bonifacio Rodrigues, 2020.02.15: Created
 */
let customerInfo = JSON.parse(sessionStorage['customerInfo']);
let deliveryInfo = JSON.parse(sessionStorage['deliveryInfo']);
let productInfo = JSON.parse(sessionStorage['products']);
let shipment = JSON.parse(sessionStorage['shipment']);

window.onload = function () {
    createInvoice();
};


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

    // SubTotal and taxes
    let before = document.getElementById("subtotal");

    let subTotal = document.createElement('div');
    subTotal.className = 'groupLine';
    let subTotalKey = document.createElement('div');
    subTotalKey.className = 'key';
    subTotalKey.textContent = 'Subtotal: ';
    let subTotalValue = document.createElement('div');
    subTotalValue.className = 'value';
    subTotalValue.textContent = 'test'; // sum all the products
    subTotal.appendChild(subTotalKey);
    subTotal.appendChild(subTotalValue);
    // calculate taxes
    let taxes = document.createElement('div');
    taxes.className = 'groupLine'
    let taxesKey = document.createElement('div');
    taxesKey.className = 'key';
    taxesKey.textContent = 'Taxes @ '; // append % of tax value
    let taxesValue = document.createElement('div');
    taxesValue.className = 'value';
    taxesValue.textContent = '$ 123'; // calculate based on the subtotal
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
    totalValue.className= 'value';
    totalValue.textContent = 'calc'; //calculate total
    box.appendChild(totalKey);
    box.appendChild(totalValue);
    total.appendChild(box);
}
