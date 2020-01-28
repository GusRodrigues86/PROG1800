/**
 * LOAD AFTER ON LOAD
 */
window.onload = function() {
    
    loadGame(); 
    document.getElementById("score").innerHTML = score ;
};

function loadGame() {
    for (var i = 0; i < this.questions.length; i++) {
        var next = (1 + i);
        var box = document.createElement("div");
        var para = document.createElement("p");

        box.id = "q" + next; // qi
        box.className = "card box";
        para.innerHTML += "Question " + next;
        box.appendChild(para);

        var item = document.createElement("span");
        item.id = "questionBox" + next;
        item.className = "question";
        item.innerHTML = this.questions[i].question;

        para = document.createElement("p");
        para.innerHTML += buildQuestion(questions[i], i).innerHTML;
        item.appendChild(para);

        box.appendChild(item);
        document.getElementById("questionBox").appendChild(box);
    }
}