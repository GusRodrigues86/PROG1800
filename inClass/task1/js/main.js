/* main.js
    inClass 1: class responsible to manage form load state

    Revision History
        Gustavo Bonifacio Rodrigues, 2020.01.14: Created
*/

/**
 * Force specific load state based on tag id
 */
window.onload = function () {
    // prevents forms to be showed if not selected
    document.getElementById("sum").style.display = "none"; 
    document.getElementById("modulo").style.display = "none";

};

function sumForm() {
    formVisibility("sum");
}

function moduloForm() {
    formVisibility("modulo");
}

function formVisibility(formId) {
        var form = document.getElementById(formId);
        if (form.style.display == "none") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
}