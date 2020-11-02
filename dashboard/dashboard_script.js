window.onload = function () {
    const nameText = document.getElementById("nameText");
    const gameText = document.getElementById("gameText");
    const categoryText = document.getElementById("categoryText");
    const targetText = document.getElementById("targetText");
    const limitText = document.getElementById("limitText");
    const currentText = document.getElementById("currentText");
    const reloadButton = document.getElementById("reloadButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const iconImage = document.getElementById("iconImage");
    requestReload();
}

const str = window.location.href.split('/').pop();
const currentGroup = str.slice(0, -5)
const assetsPath = "/assets/rttr_layouts/runnerIcon/"
const request = new XMLHttpRequest();
const REQ_URL = "https://script.google.com/macros/s/AKfycbyE6KLZR66q7SF6sLb3BZM2YLjM7N7yrVdLBjNRgK69Z1fohv-U/exec?sheet=" + currentGroup
let data = [];
request.onload = function () {
    data = this.response;
    reloadButton.disabled = false;
    buttomChange();
    setText();
};

let currentTime = 0;
let limitTime = 0;
let showTime = "0:00:00";
let currentRunner = 0;
const currentRunnerRep = nodecg.Replicant("currentRunner" + currentGroup);
nodecg.readReplicant("currentRunner" + currentGroup, value => {
    currentRunner = value;
    if (currentRunner == undefined) {
        currentRunnerRep.value = 0;
        currentRunner = 0;
    }
});

const nameRep = nodecg.Replicant("name" + currentGroup);
const gameRep = nodecg.Replicant("game" + currentGroup);
const categoryRep = nodecg.Replicant("category" + currentGroup);
const targetRep = nodecg.Replicant("target" + currentGroup);
const limitRep = nodecg.Replicant("limit" + currentGroup);
const iconRep = nodecg.Replicant("icon" + currentGroup);

const currentTimeTextRep = nodecg.Replicant("currentTimeText" + currentGroup);
currentTimeTextRep.on("change", newValue => {
    if (newValue != "NaN:aN:aN") {
        currentText.innerText = newValue;
    }
});

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
        currentRunnerRep.value = currentRunner;
    }
    buttomChange();
    setText();
    timerStop();
    timerReset();
}

function nextRunner() {
    if (currentRunner != data.length - 1) {
        currentRunner++;
        currentRunnerRep.value = currentRunner;
    }
    buttomChange();
    setText();
    timerStop();
    timerReset();
}

function timerStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
    prevButton.disabled = true;
    nextButton.disabled = true;
    nodecg.sendMessage("startTimer", currentGroup);
}

function timerStop() {
    stopButton.disabled = true;
    startButton.disabled = false;
    nodecg.sendMessage("stopTimer", currentGroup);
}

function timerReset() {
    stopButton.disabled = true;
    startButton.disabled = false;
    buttomChange();
    nodecg.sendMessage("resetTimer", currentGroup);
}

function setText() {
    nameText.innerText = data[currentRunner].runner_name;
    gameText.innerText = data[currentRunner].game_title;
    categoryText.innerText = data[currentRunner].category;
    targetText.innerText = data[currentRunner].target_time;
    limitText.innerText = data[currentRunner].limit_time;
    iconImage.src = assetsPath + data[currentRunner].icon;
    nameRep.value = data[currentRunner].runner_name;
    gameRep.value = data[currentRunner].game_title;
    categoryRep.value = data[currentRunner].category;
    targetRep.value = data[currentRunner].target_time;
    limitRep.value = data[currentRunner].limit_time;
    iconRep.value = assetsPath + data[currentRunner].icon;
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