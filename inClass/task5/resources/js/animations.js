/** animations.js
 *      jQuery animation and event handling
 * 
 *      Revision History
 *          Gustavo Bonifacio Rodrigues, 2020.02.18: Created
 */
let slideAmount = 300;
let state = true;
$("#fadeBox").hide();

/**
 * Fade toggle for fadebox
 */
$("#fade").click(function () {
    $("#fadeBox").fadeToggle(1000)
});

/**
 * Slide animation for the image
 */
$("img").click(function () {
    $("img").animate({ left: slideAmount });
    if (slideAmount === 300) {
        slideAmount = 0;
    } else {
        slideAmount = 300;
    }
});

/**
 * Animation for the expansion div
 */
$("#expansion").on("click", function () {
    if (state) {
        state = !state;
        $(this).text("Ouch!")
        $(this).animate({
            width: 450
        }, 2000);
        $(this).show(2000, function () {
            $(this).text("oh no...");
        });
    } else {
        state = !state;
        $(this).text("what...?");
        $(this).animate({
            width: 100,
        }, 2000);
        $(this).show(2000, function () {
            $(this).text("normal again");
        });
    }
    $(this).toggleClass("orangeBox");
    
});