/**
 * Class representing the Invoice and Calculations
 */
class invoiceValidator {

    constructor(data) {
        this.name = data['customerName'];
        this.email = data['customerEmail'];
        this.phone = data['customerPhone'];
        this.address = data['deliveryAddress'];
        this.city = data['deliveryCity'];
        this.province = data['deliveryProvince'];
        this.postal = data['deliveryPostalCode'];
        console.log(this.postal);
        this.p1 = parseInt(data['product1']);
        this.p2 = parseInt(data['product2']);
        this.p3 = parseInt(data['product3']);
        this.deliveryDay = parseInt(data['shipmentDeliveryTime']);
    }
    /** 
     * Calculates the tax ammount of the province
     */
    provinceTax() {
        let taxes;

        switch (this.province) {

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
     * Calculates the cost to ship
    */
    shipmentCost() {
        //let selected = this.deliveryDay;
        let costs = { 1: 40, 2: 30, 3: 20, 4: 10 }
        return costs[this.deliveryDay];
    }
    /** 
     * Calculate the cost beforeTaxes 
     */
    beforeTaxes() {
        return (parseFloat(this.p1) * 10) +
            (parseFloat(this.p2) * 20) +
            (parseFloat(this.p3) * 30) +
            this.shipmentCost();
    }
    /**
     * Calculates the tax ammount due
     */
    tax() {
        return this.beforeTaxes() * this.provinceTax() / 100.0;
    }
    /**
     * Calculates the total after tax
     */
    total() {
        return this.beforeTaxes() + this.tax();
    }
}

module.exports = invoiceValidator;