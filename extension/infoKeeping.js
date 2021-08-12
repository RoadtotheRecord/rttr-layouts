'use strict';

const fetch = require('node-fetch');
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const currentRunner = {};

const dataRep = {};
const statusRunnerRep = {};

const reqUrl = {};
const data = {};

initData('GroupA');
initData('GroupB');
initData('GroupC');

function initData(groupName) {
    currentRunner[groupName] = 0;
    reqUrl[groupName] = `https://script.google.com/macros/s/${nodecg.bundleConfig.google.webAppURL}/exec?id=${nodecg.bundleConfig.google.spreadsheetId}&sheet=${groupName}`;
    requestReload(groupName);
}

initReplicant('GroupA');
initReplicant('GroupB');
initReplicant('GroupC');

function initReplicant(groupName) {
    dataRep[groupName] = nodecg.Replicant("data" + groupName);
    statusRunnerRep[groupName] = nodecg.Replicant("statusRunner" + groupName);
    statusRunnerRep[groupName].value = "Running";
}

function reload(selestGroup) {
    nodecg.sendMessage("reloadButtonChange" + selestGroup, true);
    requestReload(selestGroup);
}
module.exports.reload = reload;

function requestReload(groupName) {
    fetch(reqUrl[groupName])
        .then(function(response) {
            return response.json();
        })
        .then(function(orgData) {
            data[groupName] = orgData;
            setText(groupName, data[groupName], currentRunner[groupName]);
            buttonChange(groupName);
            nodecg.sendMessage("reloadButtonChange" + groupName, false);
        });
}

function setText(groupName, data, currentRunner) {
    dataRep[groupName].value = data[currentRunner];
}

function prev(selestGroup) {
    if (currentRunner[selestGroup] != 0) {
        currentRunner[selestGroup]--;
    }
    buttonChange(selestGroup);
    setText(selestGroup, data[selestGroup], currentRunner[selestGroup]);
}
module.exports.prev = prev;

function next(selestGroup) {
    if (currentRunner[selestGroup] != data[selestGroup].length - 1) {
        currentRunner[selestGroup]++;
    }
    buttonChange(selestGroup);
    setText(selestGroup, data[selestGroup], currentRunner[selestGroup]);
}
module.exports.next = next;

function setStatus(selestGroup, status) {
    statusRunnerRep[selestGroup].value = status;
    if (statusRunnerRep[selestGroup].value == "Running") {
        nodecg.sendMessage("setupButtonText" + selestGroup, "準備中にする");
        nodecg.sendMessage("finishButtonText" + selestGroup, "終了にする");
        nodecg.sendMessage("setupButtonChange" + selestGroup, false);
        nodecg.sendMessage("finishButtonChange" + selestGroup, false);
    } else if (statusRunnerRep[selestGroup].value == "Setup") {
        nodecg.sendMessage("setupButtonText" + selestGroup, "準備完了！");
        nodecg.sendMessage("finishButtonChange" + selestGroup, true);
    } else if (statusRunnerRep[selestGroup].value == "Finish") {
        nodecg.sendMessage("finishButtonText" + selestGroup, "終了解除");
        nodecg.sendMessage("setupButtonChange" + selestGroup, true);
    }
}
module.exports.setStatus = setStatus;

function buttonChange(selestGroup) {
    if (currentRunner[selestGroup] == 0) {
        nodecg.sendMessage("prevButtonChange" + selestGroup, true);
        nodecg.sendMessage("nextButtonChange" + selestGroup, false);
    } else if (currentRunner[selestGroup] == data[selestGroup].length - 1) {
        nodecg.sendMessage("prevButtonChange" + selestGroup, false);
        nodecg.sendMessage("nextButtonChange" + selestGroup, true);
    } else {
        nodecg.sendMessage("prevButtonChange" + selestGroup, false);
        nodecg.sendMessage("nextButtonChange" + selestGroup, false);
    }
}

nodecg.listenFor('reloadRunner', (newValue) => { reload(newValue) });
nodecg.listenFor('prevRunner', (newValue) => { prev(newValue) });
nodecg.listenFor('nextRunner', (newValue) => { next(newValue) });
nodecg.listenFor('runningRunner', (newValue) => { setStatus(newValue, "Running") });
nodecg.listenFor('setupRunner', (newValue) => { setStatus(newValue, "Setup") });
nodecg.listenFor('finishRunner', (newValue) => { setStatus(newValue, "Finish") });
nodecg.listenFor('initButton', (newValue) => { buttonChange(newValue) });