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
let iconImage = new Object();

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
    iconImage = document.getElementById("iconImage");
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
let currentRunner = localStorage.getItem("currentRunner" + currentGroup);
if (currentRunner == null) {
    localStorage.setItem("currentRunner" + currentGroup, 0);
    currentRunner = localStorage.getItem("currentRunner" + currentGroup)
}

const nameRep = nodecg.Replicant("name" + currentGroup);
const gameRep = nodecg.Replicant("game" + currentGroup);
const categoryRep = nodecg.Replicant("category" + currentGroup);
const targetRep = nodecg.Replicant("target" + currentGroup);
const limitRep = nodecg.Replicant("limit" + currentGroup);
const verticalRep = nodecg.Replicant("vertical" + currentGroup);
const horizontalRep = nodecg.Replicant("horizontal" + currentGroup);
const iconRep = nodecg.Replicant("icon" + currentGroup);

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
        localStorage.setItem("currentRunner" + currentGroup, currentRunner);
    }
    buttomChange();
    setText();
}

function nextRunner() {
    if (currentRunner != data.length - 1) {
        currentRunner++;
        localStorage.setItem("currentRunner" + currentGroup, currentRunner);
    }
    buttomChange();
    setText();
}

function timerStart() {
    startButton.disabled = true;
    stopButton.disabled = false;
    remaining_time = getNowTime();
    count_down = setInterval(function() {
        if (currentTime != 0) {
            let nowTime = getNowTime();
            let diffTime = nowTime - remaining_time;
            console.log("diff = " + diffTime);
            currentTime = currentTime - Math.floor(diffTime / 1000);
        }
        currentText.innerText = calculationTime(currentTime);
        verticalRep.value = 670 - (670 * currentTime / limitTime);
        horizontalRep.value = 550 - (550 * currentTime / limitTime);
        remaining_time = getNowTime();
    }, 1000);
}

function getNowTime() {
    let time = new Date;
    let nowYear = time.getFullYear();
    let nowMonth = time.getMonth();
    let nowDate = time.getDate();
    let nowHour = time.getHours();
    let nowMin = time.getMinutes();
    let nowSec = time.getSeconds();
    let remaining = new Date(nowYear, nowMonth, nowDate, nowHour, nowMin, nowSec);
    return remaining.getTime()
}

function calculationTime(currentTime) {
    let hour = Math.floor(currentTime / 3600);
    let diffHour = currentTime - (hour * 3600);
    let min = Math.floor(diffHour / 60);
    let diffMin = diffHour - (min * 60);
    let sec = Math.floor(diffMin);
    return hour + ":" + ('00' + min).slice(-2) + ":" + ('00' + sec).slice(-2)
}

function timerStop() {
    stopButton.disabled = true;
    startButton.disabled = false;
    clearInterval(count_down)
}

function timerReset() {
    stopButton.disabled = true;
    startButton.disabled = false;
    
    showTime = data[currentRunner].limit_time;
    let h = showTime.slice(0, 1) * 60 * 60;
    let m = showTime.slice(2, 4) * 60;
    let s = showTime.slice(5, 7) * 1;
    currentTime = h + m + s;
    limitTime = currentTime;
    currentText.innerText = showTime;
    verticalRep.value = 0;
    horizontalRep.value = 0;
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