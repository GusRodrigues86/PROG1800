
window.onload = function () {
    var page = document.getElementsByTagName("body")[0];

    let btn = document.createElement("button");
    btn.id = "launchButton";
    btn.className = "btn";
    btn.addEventListener('click', function () { startCountdown() });
    btn.innerText = "Commence countdown?";
    page.appendChild(btn);
};

function startCountdown() {
    document.getElementById("launchButton").style.display = "none";
    var page = document.getElementsByTagName("body")[0];

    // creates the main
    /*
    <main>
    <h1>Countdown to Blastoff!</h1>
    <p class="countdown">10...</p>
    </main>
    */
    let countdown = document.createElement("main");
    let message = document.createElement("h1");
    let counter = document.createElement("div");
    counter.id = "ticker";
    counter.className = "countdown";
    message.textContent = "Countdown to blastoff!";
    message.appendChild(counter);
    countdown.appendChild(message);
    page.appendChild(countdown)
    launchBlastoff();
}

function launchBlastoff() {
    let div = document.getElementById("ticker");
    for (i = 10; i > 0; i--) {
        let text = document.createElement("p");
        text.textContent = i +"...";
        div.appendChild(text);
    }
    let rocket = document.createElement("img");
    rocket.className = "rocket";
    rocket.src = "resources/images/rocket.png";
    div.appendChild(rocket);
}