const icon = {};
const nameText = {};
const gameText = {};
const categoryText = {};
const targetText = {};
const limitText = {};
const progress = {};

const iconRep = {};
const nameTextRep = {};
const gameTextRep = {};
const categoryTextRep = {};
const targetTextRep = {};
const limitTextRep = {};
const currentTimeTextRep = {};

const currentTime = {};
const limitTime = {};
const showTime = {};
const remainingTime = {};
const countDown = {};

initReplicant('GroupA');
initReplicant('GroupB');
initReplicant('GroupC');
initReplicant('GroupD');

const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

window.onload = function () {
    initElement('GroupA');
    initElement('GroupB');
    initElement('GroupC');
    initElement('GroupD');
}

function initElement(groupName) {
    icon[groupName] = document.getElementById("icon" + groupName);
    nameText[groupName] = document.getElementById("name" + groupName);
    gameText[groupName] = document.getElementById("game" + groupName);
    categoryText[groupName] = document.getElementById("category" + groupName);
    targetText[groupName] = document.getElementById("target" + groupName);
    // limitText[groupName] = document.getElementById("limit" + groupName);
    progress[groupName] = document.getElementById("progress" + groupName);
}

function initReplicant(groupName) {
    iconRep[groupName] = nodecg.Replicant("icon" + groupName);
    iconRep[groupName].on("change", newValue => { icon[groupName].src = newValue; });
    nameTextRep[groupName] = nodecg.Replicant("name" + groupName);
    nameTextRep[groupName].on("change", newValue => { nameText[groupName].innerText = newValue; });
    gameTextRep[groupName] = nodecg.Replicant("game" + groupName);
    gameTextRep[groupName].on("change", newValue => { gameText[groupName].innerText = newValue; });
    categoryTextRep[groupName] = nodecg.Replicant("category" + groupName);
    categoryTextRep[groupName].on("change", newValue => { categoryText[groupName].innerText = newValue; });
    targetTextRep[groupName] = nodecg.Replicant("target" + groupName);
    targetTextRep[groupName].on("change", newValue => { targetText[groupName].innerText = newValue; });
    limitTextRep[groupName] = nodecg.Replicant("limit" + groupName);
    limitTextRep[groupName].on("change", newValue => {
        if (newValue != "NaN:aN:aN" || newValue == undefined) {
            limitTime[groupName] = newValue;
        }
    });
    currentTimeTextRep[groupName] = nodecg.Replicant("currentTimeText" + groupName);
}

function startTimer(selestGroup) {
    remainingTime[selestGroup] = getNowTime();
    countDown[selestGroup] = setInterval(tryDecrement, 1000, selestGroup);
}

function stopTimer(selestGroup) {
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
}

function resetTimer(selestGroup) {
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
    showTime[selestGroup] = limitTime[selestGroup];
    currentTime[selestGroup] = formatSeconds(showTime[selestGroup]);
    currentTimeTextRep[selestGroup].value = limitTime[selestGroup];
    if (mainGroup == selestGroup) {
        progress[selestGroup].style.marginTop = "0px";
    } else {
        progress[selestGroup].style.marginRight = "0px";
    }
}

function tryDecrement(selestGroup) {
    if (currentTime[selestGroup] != 0) {
        let nowTime = getNowTime();
        let diffTime = nowTime - remainingTime[selestGroup];
        if (diffTime < 1000) {
            diffTime = 1000;
        }
        currentTime[selestGroup] = currentTime[selestGroup] - Math.floor(diffTime / 1000);
    }
    currentTimeTextRep[selestGroup].value = formatTime(currentTime[selestGroup]);
    if (mainGroup == selestGroup) {
        let margin = 633 - (633 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
        progress[selestGroup].style.marginTop = margin + "px";
    } else {
        let margin = 571 - (571 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
        progress[selestGroup].style.marginRight = margin + "px";
    }
    remainingTime[selestGroup] = getNowTime();
}

function getNowTime() {
    let remaining = new Date();
    return remaining.getTime()
}

function formatTime(currentTime) {
    let hour = Math.floor(currentTime / 3600);
    let min = Math.floor((currentTime % 3600) / 60);
    let sec = Math.floor((currentTime % 3600) % 60);
    return hour + ":" + ('00' + min).slice(-2) + ":" + ('00' + sec).slice(-2)
}

function formatSeconds(currentTime) {
    const timeParts = currentTime.split(':').map(Number);
    return Math.floor(timeParts[0] * 3600) + Math.floor(timeParts[1] * 60) + Math.floor(timeParts[2])
}

nodecg.listenFor('startTimer', (newValue) => { startTimer(newValue) });
nodecg.listenFor('stopTimer', (newValue) => { stopTimer(newValue) });
nodecg.listenFor('resetTimer', (newValue) => { resetTimer(newValue) });