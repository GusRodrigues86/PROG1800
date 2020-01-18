var score = 0;
function loadGame() {
    /*
    <div id="q1" class="card">
        Question 1<br>
        <span id="questionBox1"/>
    </div>
    */
    for (var i = 0; i < this.questions.length; i++) {
        var next = (1 + i);
        var box = document.createElement("div");
        var para = document.createElement("p");

        box.id = "q" + next; // qi
        box.className = "card box";
        para.innerHTML += "Question " + next;
        box.appendChild(para);        
        
        var item = document.createElement("span");
        item.id = "questionBox"+next;
        item.className = "question";
        item.innerHTML = this.questions[i].question;

        para = document.createElement("p");
        para.innerHTML += _buildAnswer(questions[i].answer).innerHTML;
        item.appendChild(para);

        box.appendChild(item);
        document.getElementById("questionBox").appendChild(box);
    }
}

function _buildAnswer(answer) {
    if (answer === "True" || answer === "False") {
        // True of False Button
        // check answer
        var para = document.createElement("p");
        var btnTrue = document.createElement("button");
        btnTrue.className = "button shadow";
        btnTrue.innerHTML += "True";
        para.appendChild(btnTrue);
        btnFalse = document.createElement("button");
        btnFalse.className = "button shadow";
        btnFalse.innerHTML += "False";
        para.appendChild(btnFalse);
        
        return para;
    } else {
        // prompt anser
        // check answer
        return "Prompt"
    }
}

/**
 * Game questions
 */
var questions = [
    {
        "question": "What is the meaning of life the universe and everything?",
        "answer": "42"
    },
    {
        "question":"What's the name of the fairy in Peter Pan?",
        "answer":"Thinkerbell"
    },
    {
        "question":"New York's Statue of Liberty was a gift from which country?",
        "answer":""
    },
    {
        "question": "A leap year has 365 days?",
        "answer": "False"
    },
    {
        "question": "",
        "answer": ""
    }
]


/**
 * LOAD AFTER ON LOAD
 */
window.onload = function() {
    
    loadGame(); 
    document.getElementsByClassName("score")[0].innerHTML = score ;
};