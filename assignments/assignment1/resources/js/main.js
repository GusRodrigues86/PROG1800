/**
 * Change the visibility of all Questions
 */
window.onload = function () {
    var questionList = [1,2,3,4,5];
    questionList.forEach(element => {
        document.getElementById("question" + element).style.display = "none";
    });
};

/**
 * Switch the visibility of a question.
 * @param {string} questionId the Id
 */
function changeVisibility(questionId) {
    var questionCard = document.getElementById(questionId);

    if (questionCard.style.display === "none") {
        questionCard.style.display = "block";
    } else {
        questionCard.style.display = "none";
    }
}