'use strict';

const fetch = require('node-fetch');
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const currentRunner = {};

const dataRep = {};

const reqUrl = {};
const data = {};

initData('GroupA');
initData('GroupB');
initData('GroupC');

function initData(groupName) {
    currentRunner[groupName] = 0;
    reqUrl[groupName] = "https://script.google.com/macros/s/" + nodecg.bundleConfig.requestURL + "/exec?sheet=" + groupName;
    requestReload(groupName);
}

initReplicant('GroupA');
initReplicant('GroupB');
initReplicant('GroupC');

function initReplicant(groupName) {
    dataRep[groupName] = nodecg.Replicant("data" + groupName);
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
nodecg.listenFor('initButton', (newValue) => { buttonChange(newValue) });