'use strict';

const fetch = require('node-fetch');
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const assetsPath = "/assets/rttr_layouts/runnerIcon/"

const currentRunner = {};

const iconRep = {};
const nameRep = {};
const gameRep = {};
const categoryRep = {};
const consoleRep = {};
const personalRep = {};
const targetRep = {};
const twitterRep = {};
const streamRep = {};
const limitRep = {};

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
    nameRep[groupName] = nodecg.Replicant("name" + groupName);
    gameRep[groupName] = nodecg.Replicant("game" + groupName);
    categoryRep[groupName] = nodecg.Replicant("category" + groupName);
    consoleRep[groupName] = nodecg.Replicant("console" + groupName);
    personalRep[groupName] = nodecg.Replicant("personal" + groupName);
    targetRep[groupName] = nodecg.Replicant("target" + groupName);
    twitterRep[groupName] = nodecg.Replicant("twitter" + groupName);
    streamRep[groupName] = nodecg.Replicant("stream" + groupName);
    limitRep[groupName] = nodecg.Replicant("limit" + groupName);
    iconRep[groupName] = nodecg.Replicant("icon" + groupName);
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
            buttomChange(groupName, data[groupName], currentRunner[groupName]);
            nodecg.sendMessage("reloadButtonChange" + groupName, false);
		});
}

function setText(groupName, data, currentRunner) {
    iconRep[groupName].value = assetsPath + data[currentRunner].icon;
    nameRep[groupName].value = data[currentRunner].runner_name;
    gameRep[groupName].value = data[currentRunner].game_title;
    categoryRep[groupName].value = data[currentRunner].category;
    consoleRep[groupName].value = data[currentRunner].game_console;
    personalRep[groupName].value = data[currentRunner].personal_best;
    targetRep[groupName].value = data[currentRunner].target_time;
    twitterRep[groupName].value = data[currentRunner].twitter;
    streamRep[groupName].value = data[currentRunner].stream_link;
    limitRep[groupName].value = data[currentRunner].limit_time;
}

function prev(selestGroup) {
    if (currentRunner[selestGroup] != 0) {
        currentRunner[selestGroup]--;
    }
    buttomChange(selestGroup, data[selestGroup], currentRunner[selestGroup]);
    setText(selestGroup, data[selestGroup], currentRunner[selestGroup]);
}
module.exports.prev = prev;

function next(selestGroup) {
    if (currentRunner[selestGroup] != data[selestGroup].length - 1) {
        currentRunner[selestGroup]++;
    }
    buttomChange(selestGroup, data[selestGroup], currentRunner[selestGroup]);
    setText(selestGroup, data[selestGroup], currentRunner[selestGroup]);
}
module.exports.next = next;

function buttomChange(selestGroup, data, currentRunner) {
    if (currentRunner == 0) {
        nodecg.sendMessage("prevButtonChange" + selestGroup, true);
        nodecg.sendMessage("nextButtonChange" + selestGroup, false);
    } else if (currentRunner == data.length - 1) {
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