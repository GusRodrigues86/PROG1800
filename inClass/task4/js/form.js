/*
    The function formSubmit() is called when the form "myform" is submitted.
    It should run some validations and show the output.
*/

let formErrors = "";
let emptyRegex = /^$/;
let anythingRegex = /^.+$/;
let postalCodeRegex = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;


function formSubmit() {
    //Write your code here
    var flname = document.getElementById("flname").value;
    var email = document.getElementById("email").value;
    var postalCode = document.getElementById("postcode").value;

    // trim
    flname = flname.trim();
    email = email.trim();
    postalCode = postalCode.trim();
    // validation
    formErrors = ""; // ensure errors are cleared before validation

    validateInput(flname, anythingRegex, "Name is required");
    validateInput(email, anythingRegex, "Email is required");
    validateInput(postalCode, postalCodeRegex, "Postal code not in correct format");

    // inform of errors
    if (formErrors) {
        document.getElementById("errors").innerHTML = formErrors;
    } else {
        document.getElementById("errors").innerHTML = "";
        var message = `
            Name: ${flname} <br>
            Email: ${email} <br>
            Postal Code: ${postalCode} <br>
        `;
        document.getElementById("formResult").innerHTML = message;
    }
    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}

/**
 * validates user input against a regex. append error message if any.
 * @param {string} userInput 
 * @param {RegExp} simpleRegex 
 * @param {string} errorMessage 
 */
function validateInput(userInput, simpleRegex, errorMessage) {
    if (!simpleRegex.test(userInput)) {
        formErrors += `${errorMessage} <br>`;
    }
}
