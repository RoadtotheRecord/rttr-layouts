'use strict';

const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const currentTime = {};
const limitTime = {};
const remainingTime = {};
const countDown = {};

const currentTimeTextRep = {};
const marginTopRep = {};
const marginRightRep = {};
const runningTimerRep = {};

initReplicant('GroupA');
initReplicant('GroupB');
initReplicant('GroupC');

function initReplicant(groupName) {
    nodecg.Replicant("data" + groupName).on("change", newValue => { limitTime[groupName] = newValue.limit_time; });
    currentTimeTextRep[groupName] = nodecg.Replicant("currentTimeText" + groupName);
    marginTopRep[groupName] = nodecg.Replicant("marginTop" + groupName);
    marginRightRep[groupName] = nodecg.Replicant("marginRight" + groupName);
    runningTimerRep[groupName] = nodecg.Replicant("runningTimer" + groupName);
    runningTimerRep[groupName].value = "Stop";
}

function start(selestGroup) {
    buttonChange(selestGroup, true);
    if (runningTimerRep[selestGroup].value != "Success") {
        remainingTime[selestGroup] = getNowTime();
        countDown[selestGroup] = setInterval(tryDecrement, 1000, selestGroup);
    }
    runningTimerRep[selestGroup].value = "Start";
}
module.exports.start = start;

function pause(selestGroup) {
    buttonChange(selestGroup, false);
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
    runningTimerRep[selestGroup].value = "Pause";
}
module.exports.pause = pause;

function reset(selestGroup) {
    buttonChange(selestGroup, false);
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
    currentTime[selestGroup] = formatSeconds(limitTime[selestGroup]);
    currentTimeTextRep[selestGroup].value = limitTime[selestGroup];
    marginTopRep[selestGroup].value = 58 + "px";
    marginRightRep[selestGroup].value = 0 + "px";
    runningTimerRep[selestGroup].value = "Stop";
}
module.exports.reset = reset;

function success(selestGroup) {
    buttonChange(selestGroup, false);
    currentTimeTextRep[selestGroup].value = "New PB!";
    runningTimerRep[selestGroup].value = "Success";
}
module.exports.success = success;

function tryDecrement(selestGroup) {
    if (currentTime[selestGroup] > 0) {
        let nowTime = getNowTime();
        let diffTime = nowTime - remainingTime[selestGroup];
        if (diffTime < 1000) {
            diffTime = 1000;
        }
        currentTime[selestGroup] = currentTime[selestGroup] - Math.floor(diffTime / 1000);
        let marginTop = 691 - (633 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
        let marginRight = 571 - (571 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
        remainingTime[selestGroup] = getNowTime();
        if (runningTimerRep[selestGroup].value != "Success") {
            currentTimeTextRep[selestGroup].value = formatTime(currentTime[selestGroup]);
            marginTopRep[selestGroup].value = marginTop + "px";
            marginRightRep[selestGroup].value = marginRight + "px";
        }
    }
    if (currentTime[selestGroup] <= 0) {
        buttonChange(selestGroup, false);
        if (typeof countDown[selestGroup] !== 'undefined') {
            clearInterval(countDown[selestGroup])
        }
        if (runningTimerRep[selestGroup].value != "Success") {
            currentTimeTextRep[selestGroup].value = "Time up";
            runningTimerRep[selestGroup].value = "Timeup";
        }
    }
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

function buttonChange(selestGroup, runningTimer) {
    nodecg.sendMessage("resetButtonChange" + selestGroup, runningTimer);
    nodecg.sendMessage("startButtonChange" + selestGroup, runningTimer);
    nodecg.sendMessage("stopButtonChange" + selestGroup, !runningTimer);
    nodecg.sendMessage("successButtonChange" + selestGroup, !runningTimer);
}

nodecg.listenFor('startTimer', (newValue) => { start(newValue) });
nodecg.listenFor('stopTimer', (newValue) => { pause(newValue) });
nodecg.listenFor('resetTimer', (newValue) => { reset(newValue) });
nodecg.listenFor('successTimer', (newValue) => { success(newValue) });