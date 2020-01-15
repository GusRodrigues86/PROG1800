
/* calculation.js
    inClass 1 = class that demonstrate the sum and modulo operators from user input

    Revision History
        Gustavo Bonifacio Rodrigues, 2020.01.14: Created
*/

/**
 * Will lookup two input boxes for numbers to be summed.
 * 
 */
function sumTwoValues() {
    // variables
    var inputA = document.getElementById("sumA"), // first input
        inputB = document.getElementById("sumB"); // second input
    
    // parse input
    var a = parseFloat(inputA.value) || 0.0; // parse the value, or 0.0
    var b = parseFloat(inputB.value) || 0.0; // parse the value, or 0.0
    
    // sum A + B as the result of sumResult
    document.getElementById("sumResult").innerHTML = (a + b) || 0.0;
}

function reminderOf() {
    // variables
    var inputA = document.getElementById("remA"), // first input
        inputB = document.getElementById("remB"); // second input

    // parse input
    var a = parseFloat(inputA.value) || 0.0;
    var b = parseFloat(inputB.value) || 1.0;

    // prevents division by zero and shows warnings.
    if (b == 0) {
        document.getElementById("moduloResult").innerHTML = "Can't divide by Zero!";    
    } else {
        // sum A % B as the result of moduloResult
        document.getElementById("moduloResult").innerHTML = (a % b) || 0;
    }
}