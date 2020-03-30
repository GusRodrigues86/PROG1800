/**
 * Game score
 */
let score = 0;

/**
 * Keeps track of questions already answered
 */
const answered = new Set()

/**
 * Creates a question.
 * @param {string} question  The question asked
 * @param {number} index The index of the question
 * @returns a <p> element with a True/False Buttons or Prompt for answer
 */
function buildQuestion(question, index) {
    let answer = question.answer;
    question = question.question;
    let para = document.createElement("p");

    if (answer === "True" || answer === "False") {
        // True of False Button       
        let btnTrue = document.createElement("button");
        btnTrue.className = "btn shadow";
        btnTrue.textContent = "Answer"
        btnTrue.setAttribute("onclick", "trueOrFalseQuestion()");
        para.appendChild(btnTrue);
        return para;
    } else {
        // create button
        let button = document.createElement("button");
        button.textContent = "Answer";
        button.className = "btn shadow";
        // create action
        // prompt answer
        button.setAttribute("onclick", "promptQuestion(\'" + index + "\')");
        // appends to p element.
        para.appendChild(button);
        return para;
    }
}

/**
 * Creates an prompt with the question based on index
 * @param {string} index The question index
 */
function promptQuestion(index) {
    let game = questions[index]; // the question object
    let rightAnswer = game.answer.toLowerCase(); // the question answer

    let input = prompt(game.question, ""); // prompt answer
    input = input.trim().toLowerCase(); // forces lowercase comparisson with no empty spaces

    if (index == 0) {
        input = calculateAnswer(input);
        input += ""; // force to be treated as string for answer evaluation
    }

    let answer = isAnswerRight(input, rightAnswer); // evaluate the answer

    if (answer) { // right answer
        updateQuestionBox(index, true);
    } else { // wrong answer
        updateQuestionBox(index, false);
    }
};


function calculateAnswer(input) {
    input = parseInt(input);

    while (isNaN(input)) {
        input = prompt(questions[0].question + " Use numbers only", "");
        input = parseInt(input);
    }
    return input;
}

/**
 * Evaluates a true/false question.
 * 
 * There is only one true or false question.
 */
function trueOrFalseQuestion() {
    let answer = confirm(questions[3].question);

    // is the index 3 question
    if (answer === true) {
        updateQuestionBox(3, false);
    } else if (answer === false) {
        updateQuestionBox(3, true);
    }
}

/**
 * True if and only if answer is right.
 * 
 * @param {string} input the user input
 * @param {string} answer The right answer
 */
function isAnswerRight(input, answer) {
    return input === answer;
}

/**
 * Update the question box based on the answer
 * @param {number} index The question index
 * @param {boolean} wasRight True if and only if the user guessed it right
 */
function updateQuestionBox(index, wasRight) {

    // create index
    index = parseInt(index);
    let qIndex = "q" + (index + 1);
    let qBox = document.getElementById(qIndex);

    if (wasRight) {

        qBox.className = "card rightAnswer";
        if (!answered.has(index)) {
            score++; // update
            answered.add(index); // saves in memory
            var mark = document.createElement("span");
            mark.textContent = " \u2714";
            qBox.getElementsByTagName("p")[0].appendChild(mark);
        }
        updateScore();
    } else {
        document.getElementById(qIndex).className = "card wrongAnswer";
        if (!answered.has(index)) {
            answered.add(index);
            var mark = document.createElement("span");
            mark.textContent = " \u2716";
            qBox.getElementsByTagName("p")[0].appendChild(mark);
        }
    }
}

/**
 * Updates the game score.
 */
function updateScore() {
    document.getElementById("score").innerHTML = score;
}

/**
 * Game questions
 */
var questions = [
    {
        "question": "14*3 is equal to?",
        "answer": "42"
    },
    {
        "question": "What's the name of the fairy in Peter Pan?",
        "answer": "Thinkerbell"
    },
    {
        "question": "New York's Statue of Liberty was a gift from which country?",
        "answer": "France"
    },
    {
        "question": "A leap year has 365 days?",
        "answer": "False"
    },
    {
        "question": "Who shot first?",
        "answer": "Han"
    }
]