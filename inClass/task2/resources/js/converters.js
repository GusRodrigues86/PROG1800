/** Converters.js
 *      provide functionality to convert between units
 * 
 *  Revision History
 *      Gustavo Bonifacio Rodrigues: 2020.01.22: Created
 */

/**
 * Convert values in Celcius to Fahrenheit
 */
function convertToFahrenheit() {
    // (0°C × 9/5) + 32
    var celcius = document.getElementById("celcius");
    var fahrenheit = document.getElementById("fahrenheit")
    // parse to values
    celcius = parseFloat(celcius.value) || 0.0; // parse the value, or 0.0
    fahrenheit.value = ((celcius * (9 / 5.0)) + 32).toFixed(2); // 2 most significand float digits
}
/**
 * Convert values in Fahrenheit to Celcius
 */
function convertToCelcius() {
    // (0°F − 32) × 5/9
    var celcius = document.getElementById("celcius");
    var fahrenheit = document.getElementById("fahrenheit")

    fahrenheit = parseFloat(fahrenheit.value) || 0.0;
    celcius.value = ((fahrenheit - 32) * (5 / 9)).toFixed(2); // 2 most significand float digits
}

function convertToFeet() {
    // meters * 3.281
    var meters = document.getElementById("meters");
    var feet = document.getElementById("feet")

    meters = parseFloat(meters.value) || 0.0;
    feet.value = (meters * 3.281).toFixed(2);// 2 most significand float digits
}

function convertToMeters() {
    // feet / 3.281
    var meters = document.getElementById("meters");
    var feet = document.getElementById("feet")

    feet = parseFloat(feet.value) || 0.0;
    meters.value = (feet / 3.281).toFixed(2);// 2 most significand float digits
}