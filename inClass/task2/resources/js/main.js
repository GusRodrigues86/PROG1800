/* main.js
    inClass 2: class responsible to manage form load state

    Revision History
        Gustavo Bonifacio Rodrigues, 2020.01.22: Created
*/

window.onload = function () {
    // prevents forms to be showed if not selected
    document.getElementById("temperature").style.display = "none";
    document.getElementById("length").style.display = "none";

};

/**
 * Toggles the temperature conversion form
 */
function temperatureForm() {
    formVisibility("temperature");
    // onve visible at time
    disableForm("length");
}
/**
 * Toggles the length conversion form
 */
function lengthForm() {
    formVisibility("length");
    // onve visible at time
    disableForm("temperature");
}
/**
 * change specific form display to block
 * @param {*} formId 
 */
function formVisibility(formId) {
    var form = document.getElementById(formId);
    if (form.style.display == "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
/**
 * Set a specific form to display none.
 * @param {*} formId form id to display none
 */
function disableForm(formId) {
    var form = document.getElementById(formId);
    form.style.display = "none"
}
