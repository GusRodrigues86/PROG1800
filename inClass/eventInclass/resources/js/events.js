/* 
 * events.js
 *  manipulate mouse events on the html page
 *
 * Revision History
 *  Created by: Gustavo Bonifacio Rodrigues, 2020.02.13
 */

/**
 * Onload events
 */
window.onload = function () {
    document.getElementById("single").style.display = "block";
    document.getElementById("double").style.display = "none";
};
/**
 * Single click will reverse the state of the style of images with id single and double
 */
document.getElementById("single").addEventListener("click", function() {
    let image = document.getElementById("single").style;
    let newImage = document.getElementById("double").style;
    if (image.display === "block") {
        image.display = "none";
        newImage.display = "block";
    }
});

/**
 * Double click will reverse the state of the style of images with id single and double
 */
document.getElementById("double").addEventListener("dblclick", function() {
    let image = document.getElementById("double").style;
    let newImage = document.getElementById("single").style;
    
    if (image.display === "block") {
        image.display = "none";
        newImage.display = "block";
    }
});