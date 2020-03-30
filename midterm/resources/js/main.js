/** main.js
 *      form manipulation for midterm
 *      
 *  Revision History
 *      Gustavo Bonifacio Rodrigues, 2020.02.27, created
 */

/**
 *  event listeners
 */
document.getElementById('colorPrint').addEventListener('blur', updateInvoice);
document.getElementById('grayPrint').addEventListener('blur', updateInvoice);
document.getElementById('scan').addEventListener('blur', updateInvoice);
document.getElementById('internetUsage').addEventListener('click', updateInvoice);


const colorPrintBox = document.getElementById("colorPrints");
const grayPrintBox = document.getElementById("grayPrints");
const scannedBox = document.getElementById("pagesScanned");
const internetBox = document.getElementById("internet");
const subtotalBox = document.getElementById("subTotal");
const totalBox = document.getElementById("total");

let colorPrint = getColorPrint();
let grayPrint = getGrayPrint();
let scanned = getScanned();
let internet = getInternet();
let subtotal = getSubtotal();
let total = getTotal();


function getColorPrint() {
    let printed = document.getElementById('colorPrint').value;
    
    if (printed == "") {
        printed = 0;
    }
    return (isNaN(printed) ? 0 : parseFloat(printed));
}


function getGrayPrint() {
    let printed = document.getElementById('grayPrint').value;
    
    if (printed == "") {
        printed = 0;
    }
    return (isNaN(printed) ? 0 : parseFloat(printed));
}
function getScanned() {
    let printed = document.getElementById('scan').value;
    
    if (printed == null) {
        printed = 0;
    }
    return (isNaN(printed) ? 0 : parseFloat(printed));
}

function getInternet() {
    let printed = document.getElementById('internetUsage').value;
    if (printed === "false") {
        return false;
    }
    if (printed === "true") {
        return true;
    }
}

function beforeInternet() {
    let value = (colorPrint * 0.5) + (grayPrint * 0.2) + (scanned * 0.25);
    console.log(value);
    return value;
}
function getSubtotal() {
    let internetTax = 5;

    let sum = (colorPrint * 0.5) + (grayPrint * 0.2) + (scanned * 0.25);
    if (!internet) {
        return sum;
    } else {
        if (sum >= 40) {
            return sum;
        } else {
            return sum + internetTax;
        }
    }
}
function getTotal() { }

function updateInvoice() {
    colorPrint = getColorPrint();
    grayPrint = getGrayPrint();
    scanned = getScanned();
    internet = getInternet();
    subtotal = getSubtotal();
    total = getTotal();

    document.getElementById("colorK").textContent = colorPrint + " color print, $0.5 each";
    document.getElementById("colorV").textContent = "$" + (0.5 * colorPrint).toFixed(2);
    document.getElementById("grayK").textContent = grayPrint + " gray print, $0.20 each";
    document.getElementById("grayV").textContent = "$" + (0.2 * grayPrint).toFixed(2);
    document.getElementById("scanK").textContent = scanned + " pages scanned, $0.25 each";
    document.getElementById("scanV").textContent = "$" + (0.25 * scanned).toFixed(2);
    if (internet) {
        document.getElementById("internetK").textContent = "Has used the internet"
        console.log(beforeInternet());
        if (beforeInternet() < 40) {
            document.getElementById("internetV").textContent = "$ 5.00"
        } else {
            document.getElementById("internetV").textContent = "Free"
        }
    } else {
        document.getElementById("internetK").textContent = "Didn't use the internet";
        document.getElementById("internetV").textContent = "Free!"
    }

    document.getElementById("subtotalK").textContent = "Subtotal";
    document.getElementById("subtotalV").textContent = "$" + subtotal.toFixed(2);

    document.getElementById("totalK").textContent = "Total";
    document.getElementById("totalV").textContent = "$" + total.toFixed(2);
    
}

window.onload = updateInvoice();