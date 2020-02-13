/**
 * fetch information about the invoice to be generated
 */
function buildInformation() {
    
    // fetch customer info and create customer, delivery, products and shipment information

    customer = new Customer(document.getElementById("customerName").value,
        document.getElementById("customerEmail").value,
        document.getElementById("customerPhone").value);
    console.log(customer.hasValidName());
    console.log(customer.customerName);
    console.log(customer.hasValidPhone());
    console.log(customer.customerPhone);
    console.log(customer.hasValidEmail());
    console.log(customer.customerEmail);
}

/**
 * Represents the Customer
 */
class Customer {
    customerName;
    customerEmail;
    customerPhone;

    /**
     * Creates a new customer with information about the name, email and phone.
     * @param {String} cName 
     * @param {String} cEmail 
     * @param {String} cPhone 
     */
    Customer(cName, cEmail, cPhone) {
        this.customerName = cName;
        this.customerEmail = cEmail;
        this.customerPhone = cPhone;
    }

    /**
     * A customer name is valid if and only if is not empty.
     */
    hasValidName() {
        return (!this.customerName || // null
            this.customerName.trim().isEmpty()) ? // whitespaced
            true : false;
    }

    /**
     * Email is valid if and only if is not empty or null and matches the regex
     */
    hasValidEmail() {
        // weird validation for email regex
        // https://github.com/Microsoft/referencesource/blob/master/System.ComponentModel.DataAnnotations/DataAnnotations/EmailAddressAttribute.cs

        let emailRegex = new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
        
        return (!this.customerEmail || // null
        this.customerEmail.trim().isEmpty() || // whitespaced
        !emailRegex.test(this.customerEmail)) ?
        false : true;
    }

    hasValidPhone() {
        let phoneRegex = new RegExp('^\d{3}-\d{3}-\d{4}$');

        return (!this.customerPhone || // null
            this.customerPhone.trim().isEmpty() || // whitespaced
            phoneRegex.test(this.customerPhone)) ?
            true : false ;
    }
}