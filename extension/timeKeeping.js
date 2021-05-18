'use strict';

const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const currentTime = {};
const limitTime = {};
const remainingTime = {};
const countDown = {};

const limitTextRep = {};
const currentTimeTextRep = {};
const marginTopRep = {};
const marginRightRep = {};
const runningTimerRep = {};

initReplicant('GroupA');
initReplicant('GroupB');
initReplicant('GroupC');

function initReplicant(groupName) {
    limitTextRep[groupName] = nodecg.Replicant("limit" + groupName);
    limitTextRep[groupName].on("change", newValue => { limitTime[groupName] = newValue; });
    currentTimeTextRep[groupName] = nodecg.Replicant("currentTimeText" + groupName);
    marginTopRep[groupName] = nodecg.Replicant("marginTop" + groupName);
    marginRightRep[groupName] = nodecg.Replicant("marginRight" + groupName);
    runningTimerRep[groupName] = nodecg.Replicant("runningTimer" + groupName);
    runningTimerRep[groupName].value = false;
}

function start(selestGroup) {
    nodecg.sendMessage("startButtonChange" + selestGroup, true);
    nodecg.sendMessage("stopButtonChange" + selestGroup, false);
    nodecg.sendMessage("resetButtonChange" + selestGroup, true);
    runningTimerRep[selestGroup].value = true;
    remainingTime[selestGroup] = getNowTime();
    countDown[selestGroup] = setInterval(tryDecrement, 1000, selestGroup);
}
module.exports.start = start;

function pause(selestGroup) {
    nodecg.sendMessage("startButtonChange" + selestGroup, false);
    nodecg.sendMessage("stopButtonChange" + selestGroup, true);
    nodecg.sendMessage("resetButtonChange" + selestGroup, false);
    runningTimerRep[selestGroup].value = false;
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
}
module.exports.pause = pause;

function reset(selestGroup) {
    nodecg.sendMessage("startButtonChange" + selestGroup, false);
    nodecg.sendMessage("stopButtonChange" + selestGroup, true);
    runningTimerRep[selestGroup].value = false;
    if (typeof countDown[selestGroup] !== 'undefined') {
        clearInterval(countDown[selestGroup])
    }
    currentTime[selestGroup] = formatSeconds(limitTime[selestGroup]);
    currentTimeTextRep[selestGroup].value = limitTime[selestGroup];
    marginTopRep[selestGroup].value = 58 + "px";
    marginRightRep[selestGroup].value = 0 + "px";
}
module.exports.reset = reset;

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
    let marginTop = 691 - (633 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
    marginTopRep[selestGroup].value = marginTop + "px";
    let marginRight = 571 - (571 * currentTime[selestGroup] / formatSeconds(limitTime[selestGroup]));
    marginRightRep[selestGroup].value = marginRight + "px";
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

nodecg.listenFor('startTimer', (newValue) => { start(newValue) });
nodecg.listenFor('stopTimer', (newValue) => { pause(newValue) });
nodecg.listenFor('resetTimer', (newValue) => { reset(newValue) });