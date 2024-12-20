const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsTableBody = document.querySelector('#laps tbody');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let lapCounter = 1;
let previousLapTime = 0;

function formatTime(milliseconds) {
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;

    return `${hours}:${minutes}:${seconds}`;
}

function startStop() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopButton.textContent = "Stop";
    }
}

function reset() {
    clearInterval(intervalId);
    intervalId = null;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    lapCounter = 1;
    lapsTableBody.innerHTML = '';
    previousLapTime = 0;
}

function lap() {
    if (intervalId) {
        const currentTime = formatTime(elapsedTime);
        const currentMilliseconds = elapsedTime;
        const differenceMilliseconds = currentMilliseconds - previousLapTime;
        const differenceTime = formatTime(differenceMilliseconds);

        const newRow = lapsTableBody.insertRow();
        const lapNoCell = newRow.insertCell();
        const timeCell = newRow.insertCell();
        const differenceCell = newRow.insertCell();

        lapNoCell.textContent = lapCounter++;
        timeCell.textContent = currentTime;
        differenceCell.textContent = differenceTime;

        previousLapTime = currentMilliseconds;
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);