let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, "0");
    let seconds = String(date.getUTCSeconds()).padStart(2, "0");
    let milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); 
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    running = false;
    lapsContainer.innerHTML = ""; 
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapDiv = document.createElement("div");
        lapDiv.textContent = lapTime;
        lapsContainer.appendChild(lapDiv);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
