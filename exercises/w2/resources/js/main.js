/**
 * The project idea is to build a form that user input the marks
 * for JavaScript, Math and C#.
 * 
 * Display the input details and the average of the grades on the page
 * Validate the input for numbers only
 */
function loadClasses() {
    // <h3 id="">Mark input <button class="btn blue">Add Mark</button></h3>
    var prompt = document.getElementById("prompt");
    
    for (i = 0; i < classes.length; i++) {
        let box = document.createElement("h3");
        box.id = classes[i].name;
        box.innerText = "Add marks for " + classes[i].name + " ";
        
        let btnBox = document.createElement("button");
        btnBox.classList.add("btn");
        btnBox.classList.add("blue");
        btnBox.innerText = "Add Mark";

        box.appendChild(btnBox);
        prompt.appendChild(box);
    }

}

let classes = [
    { "name": "JavaScript" },
    { "name": "Math" },
    { "name": "C Sharp" }
];

window.onload = function() {
    this.loadClasses();
};