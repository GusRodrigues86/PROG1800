/** validator.js
 *      Form validation and handler
 * 
 *  Revision History
 *      Gustavo Bonifacio Rodrigues, 2020.02.15: Created
 */
{

    /**
     * get information about the form
     */
    const form = document.getElementById("orderForm");
    // name of the customer
    const cName = document.getElementById("customerName");
    const cNameError = document.querySelector("#customerName + span.error");
    // email of the customer
    const cEmail = document.getElementById("customerEmail");
    const cEmailError = document.querySelector("#customerEmail + span.error");
    // phone of the customer
    const cPhone = document.getElementById("customerPhone");
    const cPhoneError = document.querySelector("#customerPhone + span.error");
    // address
    const dAddress = document.getElementById("deliveryAddress");
    const dAddressError = document.querySelector("#deliveryAddress + span.error");
    // city
    const dCity = document.getElementById("deliveryCity");
    const dCityError = document.querySelector("#deliveryCity + span.error");
    // postal code
    const dPostal = document.getElementById("deliveryPostalCode");
    const dPostalError = document.querySelector("#deliveryPostalCode + span.error");
    // province
    const dProvince = document.getElementById("deliveryProvince");
    const dProvinceError = document.querySelector("#deliveryProvince + span.error");
    // total products
    const products = document.getElementById("products");
    const productError = document.getElementById("productError");
    // shipment
    const shipment = document.getElementById("shipmentDeliveryTime");
    const shipmentError = document.querySelector("#shipmentDeliveryTime + span.error");

    // start variables
    let isProductValid = true;
    // standart error class.
    let errorClass = 'error active';

    // validate the customer name by input
    cName.addEventListener('input', function () {
        if (cName.validity.valid) {
            cNameError.textContent = '';
            cNameError.className = 'error';
        } else {
            showNameErrors();
        }
    });
    // validate the email
    cEmail.addEventListener('input', function () {
        if (cEmail.validity.valid) {
            cEmailError.textContent = '';
            cEmailError.className = 'error';
        } else {
            showEmailErrors();
        }
    });
    // validate phone number
    cPhone.addEventListener('input', function () {
        if (cPhone.validity.valid) {
            cPhoneError.textContent = '';
            cPhoneError.className = 'error';
        } else {
            showPhoneErrors();
        }
    });
    // validates address for delivery
    dAddress.addEventListener('input', function () {
        if (dAddress.validity.valid) {
            dAddressError.textContent = "";
            dAddressError.className = 'error';
        } else {
            showAddressErrors();
        }
    });
    // validates city for delivery
    dCity.addEventListener('input', function () {
        if (dCity.validity.valid) {
            dCityError.textContent = "";
            dCityError.className = 'error';
        } else {
            showCityErrors();
        }
    });
    // validates the postal code
    dPostal.addEventListener('input', function () {
        if (dPostal.validity.valid) {
            dPostal.value = dPostal.value.toUpperCase();
            dPostalError.textContent = "";
            dPostalError.className = 'error';
        } else {
            showPostalCodeErrors();
        }
    });
    // validate the province selection
    dProvince.addEventListener('click', function () {
        var options = dProvince.children;
        if (options[0].selected) {
            showProvinceErrors();
        } else {
            dProvinceError.textContent = "";
            dProvinceError.className = 'error';
        }
    });
    // validate if has at least one product and not negatives
    products.addEventListener('input', function () {
        let product1 = products.getElementsByTagName("input")[0];
        let product2 = products.getElementsByTagName("input")[1];
        let product3 = products.getElementsByTagName("input")[2];
        if (product1.value === "" &&
            product2.value === "" &&
            product3.value === "") {
            showProductErrors();
        }
        checkProductsRange();
        if (!isProductValid) {
            showProductErrors();
        } else {
            isProductValid = true;
            productError.textContent = '';
            productError.className = 'error';
        }
    });
    // validates shipment
    shipment.addEventListener('click', function () {
        var shipmentTime = shipment.children;
        if (shipmentTime[0].selected) {
            showShipmentErrors();
        } else {
            shipmentError.textContent = "";
            shipmentError.className = 'error';
        }
    });
    /**
     * Push name errors to form, if any
     */
    function showNameErrors() {
        if (cName.validity.valueMissing) {
            cNameError.textContent = "Name cannot be empty.";
        } else if (!validateName(cName.value)) {
            cNameError.textContent = "Invalid name.";
        }
        cNameError.className = errorClass;
        cName.focus();
    }
    /**
     * Push email errors to the form, if any
     */
    function showEmailErrors() {
        let isValid = validateEmail(cEmail.value);
        if (cEmail.validity.valueMissing) {
            cEmailError.textContent = "Email cannot be empty."
        } else if (!isValid) {
            cEmailError.textContent = "Invalid email format.";
        }
        cEmailError.className = errorClass;

        cEmail.focus();
    }
    /**
     * Push phone errors to form
     */
    function showPhoneErrors() {
        if (cPhone.validity.valueMissing) {
            cPhoneError.textContent = "Need a phone number.";
        } else if (!validatePhone(cPhone.value)) {
            cPhoneError.textContent = "Invalid phone format.";
        }
        cPhoneError.className = errorClass;

        cPhone.focus();
    }
    /**
     * push address errors to form, if any
     */
    function showAddressErrors() {
        if (dAddress.validity.valueMissing) {
            dAddressError.textContent = "Need an address.";
        } else if (!validateName(dAddress.value)) { // just as name, address cannot be empty or whitespaced.
            dAddressError.textContent = "Address cannot be empty or blank.";
        }
        dAddressError.className = errorClass;

        dAddress.focus();
    }
    /**
     * Push city errors, if any
     */
    function showCityErrors() {
        if (dCity.validity.valueMissing) {
            dCityError.textContent = "Need a city.";
        } else if (!validateName(dAddress.value)) { // just as name, address cannot be empty or whitespaced.
            dCityError.textContent = "City cannot be empty or blank.";
        }
        dCityError.className = errorClass;
        dCity.focus();
    }
    /**
     * Push postal code errors, if any.
     */
    function showPostalCodeErrors() {
        if (dPostal.validity.valueMissing) {
            dPostalError.textContent = "Need a postal code."
        } else if (!validatePostalCode(dPostal.value)) {
            dPostalError.textContent = "Invalid postal code format or invalid postal code.";
        }
        dPostalError.className = errorClass;
        dPostal.focus();
    }
    /**
     * Push province errors.
     */
    function showProvinceErrors() {
        if (dProvince.children[0].selected) {
            dProvinceError.className = errorClass;
            dProvince.focus();
            dProvinceError.textContent = "Please, select one province.";
        }
    }
    /**
     * Push product errors to the form
     */
    function showProductErrors() {
        let product1 = products.getElementsByTagName("input")[0].value;
        let product2 = products.getElementsByTagName("input")[1].value;
        let product3 = products.getElementsByTagName("input")[2].value;

        if (product1 === "" && product2 === "" && product3 === "") {
            isProductValid = false;
            productError.textContent = 'Need at least one product';
        } else if (product1 < 0 || product2 < 0 || product3 < 0) {
            isProductValid = false;
            productError.textContent = 'Invalid product ammount.';
        } else if (product1 == 0 && product2 == 0 && product3 == 0) {
            isProductValid = false;
            productError.textContent = 'Select at least one item';
        }
        productError.className = errorClass;
    }
    /**
     * Push shipment information errors to the form
     */
    function showShipmentErrors() {
        if (shipment.children[0].selected) {
            shipmentError.textContent = "Please, select one type of shipment.";
            shipmentError.className = errorClass;
            shipment.focus();
        }
    }

    function checkProductsRange() {
        let product1 = products.getElementsByTagName("input")[0].value;
        let product2 = products.getElementsByTagName("input")[1].value;
        let product3 = products.getElementsByTagName("input")[2].value;

        if (product1 === "" && product2 === "" && product3 === "") {
            isProductValid = false;
        }

        product1 = parseInt(product1);
        product2 = parseInt(product2);
        product3 = parseInt(product3);
        if (product1 < 0 || product2 < 0 || product3 < 0) {
            isProductValid = false;
        }
        if (product1 == 0 && product2 == 0 && product3 == 0) {
            isProductValid = false;
        }
        if (product1 > 0 || product2 > 0 || product3 > 0) {
            isProductValid = true;
        }

    }

    /**
     * show all errors at once.
     */
    function showErrors() {
        showProductErrors();
        showProvinceErrors();
        showPostalCodeErrors();
        showCityErrors();
        showAddressErrors();
        showPhoneErrors();
        showEmailErrors();
        showNameErrors();
    }

    /**
     * Validate the form and submit iff valid.
     */
    form.addEventListener('submit', function (event) {
        // do not submit if form is not validated.
        checkProductsRange();
        if (!cName.validity.valid ||
            !cPhone.validity.valid ||
            !cEmail.validity.valid ||
            !dAddress.validity.valid ||
            !dCity.validity.valid ||
            !dPostal.validity.valid ||
            dProvince.children[0].selected ||
            !isProductValid ||
            shipment.children[0].selected
        ) {
            showErrors();
            event.preventDefault();
        } else {
            // create a session cookies
             sessionStorage['customerInfo'] = JSON.stringify(createCustomer());
            sessionStorage['deliveryInfo'] = JSON.stringify(createDeliveryAddress());
            form.submit();
        }

    });

    /**
     * Creates an array to be converted as JSON with Customer information
     * @returns an array with Customer information
     */
    function createCustomer() {
        return {
            "cName": cName.value,
            "cPhone": cPhone.value,
            "cEmail": cEmail.value,
        };

    }

    /**
     * Creates an array to be converted as JSON with delivery info
     * @returns an array with delivery info
     */
    function createDeliveryAddress() {
        var prov = document.getElementById("deliveryProvince");
        prov = getSelectedOption(prov);
        
        return {
            "dAddress": dAddress.value,
            "dCity": dCity.value,
            "dPostal": dPostal.value,
            "dProvince": prov.value,
        };
    }

    /**
     * Extracts the selection option from selection box
     * @param {HTMLSelectElement} selection the Selection box to be inspected
     * @returns {HTMLOptionElement} with the selected value
     */
    function getSelectedOption(selection) {
        var option;
        for (var i = 0, len = selection.options.length; i < len; i++) {
            option = selection.options[i];
            if (option.selected === true) {
                break;
            }
        }
        return option;
    }

    
}

/**
 * validate the name. Cannot be null or empty string.
 * @param {string} cName 
 */
function validateName(cName) {
    return (!cName || (cName.trim() === "")) ? false : true;
}
/**
 * true if and only if the email is valid
 * @param {string} email 
 */
function validateEmail(email) {
    // weird validation for email regex
    // https://github.com/Microsoft/referencesource/blob/master/System.ComponentModel.DataAnnotations/DataAnnotations/EmailAddressAttribute.cs
    email = email.trim();
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi;

    return (!email || // null
        (email.trim() === "") || // whitespaced
        !emailRegex.test(email)) ?
        false : true;
}

/**
 * validate phone if is in the expected format
 * @param {string} phone 
 */
function validatePhone(phone) {
    let phoneRegex = /\d{3}[-]\d{3}[-]\d{4}/;
    return (!phone || (phone.trim() === "") || !phoneRegex.test(phone)) ?
        false : true;
}

/**
 * Validates the postal code to the Canadaian pattern.
 * @param {string} postalCode 
 */
function validatePostalCode(postalCode) {
    postalCode = postalCode;
    let postalRegex = /[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s]\d[ABCEGHJ-NPRSTV-Z]\d/i;
    return (!postalCode || (postalCode.trim() === "") ||
        !postalRegex.test(postalCode)) ?
        false : true;
}

