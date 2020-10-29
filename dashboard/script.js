let nameText = new Object();
let gameText = new Object();
let categoryText = new Object();
let targetText = new Object();
let limitText = new Object();
let currentText = new Object();
let reloadButton = new Object();
let prevButton = new Object();
let nextButton = new Object();
let startButton = new Object();
let stopButton = new Object();

window.onload = function () {
    nameText = document.getElementById("nameText");
    gameText = document.getElementById("gameText");
    categoryText = document.getElementById("categoryText");
    targetText = document.getElementById("targetText");
    limitText = document.getElementById("limitText");
    currentText = document.getElementById("currentText");
    reloadButton = document.getElementById("reloadButton");
    prevButton = document.getElementById("prevButton");
    nextButton = document.getElementById("nextButton");
    startButton = document.getElementById("startButton");
    stopButton = document.getElementById("stopButton");
    requestReload();
}

let data = [];
let currentTime = 0;
let currentRunner = 0;

const str = window.location.href.split('/').pop();
const currentGroup = str.slice(0, -5)
const request = new XMLHttpRequest();
const REQ_URL = "https://script.google.com/macros/s/AKfycbyE6KLZR66q7SF6sLb3BZM2YLjM7N7yrVdLBjNRgK69Z1fohv-U/exec?sheet=" + currentGroup
request.onload = function () {
    data = this.response;
    reloadButton.disabled = false;
    buttomChange();
    setText();
};

const nameRep = nodecg.Replicant("name" + currentGroup);
const gameRep = nodecg.Replicant("game" + currentGroup);
const categoryRep = nodecg.Replicant("category" + currentGroup);
const targetRep = nodecg.Replicant("target" + currentGroup);
const limitRep = nodecg.Replicant("limit" + currentGroup);
const verticalRep = nodecg.Replicant("vertical" + currentGroup);
const horizontalRep = nodecg.Replicant("horizontal" + currentGroup);

function requestReload() {
    request.open('GET', REQ_URL, true);
    request.responseType = 'json';
    request.send();
}

function reload() {
    reloadButton.disabled = true;
    requestReload();
}

function prevRunner() {
    if (currentRunner != 0) {
        currentRunner--; 
    }
    buttomChange();
    setText();
}

function nextRunner() {
    if (currentRunner != data.length - 1) {
        currentRunner++;
    }
    buttomChange();
    setText();
}

function timerStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
    count_down = setInterval(function() {
        if (set_limit != 0) {
            set_limit--;
        }
        console.log(set_limit)
        // limitRep.value = set_limit;
        // verticalRep.value = 670 - (670 * set_limit / max_limit);
        // horizontalRep.value = 550 - (550 * set_limit / max_limit);
    }, 1000);
}

function timerStop() {
    stopButton.disabled = true;
    startButton.disabled = false;
    clearInterval(count_down)
}

function setText() {
    nameText.innerText = data[currentRunner].runner_name;
    gameText.innerText = data[currentRunner].game_title;
    categoryText.innerText = data[currentRunner].category;
    targetText.innerText = data[currentRunner].target_time;
    limitText.innerText = data[currentRunner].limit_time;
    currentText.innerText = data[currentRunner].limit_time;
    let h = data[currentRunner].limit_time.slice(0, 1) * 60 * 60;
    let m = data[currentRunner].limit_time.slice(2, 4) * 60;
    let s = data[currentRunner].limit_time.slice(5, 7) * 1;
    currentTime = h + m + s;
    nameRep.value = data[currentRunner].runner_name;
    gameRep.value = data[currentRunner].game_title;
    categoryRep.value = data[currentRunner].category;
    targetRep.value = data[currentRunner].target_time;
    limitRep.value = data[currentRunner].limit_time;

    // verticalRep.value = 0;
    // horizontalRep.value = 0;
    // set_limit = limit1.value;
    // max_limit = limit1.value;
}

function buttomChange() {
    if (currentRunner == 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    } else if (currentRunner == data.length - 1) {
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}