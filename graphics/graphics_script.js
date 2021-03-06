const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

const icon = {};
const nameText = {};
const currentTimeText = {};
const gameText = {};
const categoryText = {};
const consoleText = {};
const personalText = {};
const targetText = {};
const twitterText = {};
const streamText = {};
const limitText = {};
const progress = {};

window.onload = function () {
    initElement('GroupA');
    initElement('GroupB');
    initElement('GroupC');

    initReplicant('GroupA');
    initReplicant('GroupB');
    initReplicant('GroupC');

    loadReplicant('GroupA');
    loadReplicant('GroupB');
    loadReplicant('GroupC');
}

function initElement(groupName) {
    icon[groupName] = document.getElementById("icon" + groupName);
    nameText[groupName] = document.getElementById("name" + groupName);
    currentTimeText[groupName] = document.getElementById("currentTime" + groupName);
    gameText[groupName] = document.getElementById("game" + groupName);
    categoryText[groupName] = document.getElementById("category" + groupName);
    consoleText[groupName] = document.getElementById("console" + groupName);
    personalText[groupName] = document.getElementById("personal" + groupName);
    targetText[groupName] = document.getElementById("target" + groupName);
    twitterText[groupName] = document.getElementById("twitter" + groupName);
    streamText[groupName] = document.getElementById("stream" + groupName);
    progress[groupName] = document.getElementById("progress" + groupName);
}

function initReplicant(groupName) {
    nodecg.Replicant("icon" + groupName).on("change", newValue => { icon[groupName].src = newValue; });
    nodecg.Replicant("name" + groupName).on("change", newValue => { nameText[groupName].innerText = newValue; });
    nodecg.Replicant("currentTimeText" + groupName).on("change", newValue => { currentTimeText[groupName].innerText = newValue; });
    nodecg.Replicant("game" + groupName).on("change", newValue => { gameText[groupName].innerText = newValue; });
    nodecg.Replicant("category" + groupName).on("change", newValue => { categoryText[groupName].innerText = newValue; });
    nodecg.Replicant("console" + groupName).on("change", newValue => { consoleText[groupName].innerText = newValue; });
    nodecg.Replicant("personal" + groupName).on("change", newValue => { personalText[groupName].innerText = newValue; });
    nodecg.Replicant("target" + groupName).on("change", newValue => { targetText[groupName].innerText = newValue; });
    nodecg.Replicant("twitter" + groupName).on("change", newValue => { twitterText[groupName].innerText = newValue; });
    nodecg.Replicant("stream" + groupName).on("change", newValue => { streamText[groupName].innerText = newValue; });
    nodecg.Replicant("marginTop" + groupName).on("change", newValue => {
        if (mainGroup == groupName) {
            progress[groupName].style.marginTop = newValue;
        }
    });
    nodecg.Replicant("marginRight" + groupName).on("change", newValue => {
        if (mainGroup != groupName) {
            progress[groupName].style.marginRight = newValue;
        }
    });
}

function loadReplicant(groupName) {
    nodecg.readReplicant("icon" + groupName, value => { icon[groupName].src = value; });
    nodecg.readReplicant("name" + groupName, value => { nameText[groupName].innerText = value; });
    nodecg.readReplicant("currentTimeText" + groupName, value => { currentTimeText[groupName].innerText = value; });
    nodecg.readReplicant("game" + groupName, value => { gameText[groupName].innerText = value; });
    nodecg.readReplicant("category" + groupName, value => { categoryText[groupName].innerText = value; });
    nodecg.readReplicant("console" + groupName, value => { consoleText[groupName].innerText = value; });
    nodecg.readReplicant("personal" + groupName, value => { personalText[groupName].innerText = value; });
    nodecg.readReplicant("target" + groupName, value => { targetText[groupName].innerText = value; });
    nodecg.readReplicant("twitter" + groupName, value => { twitterText[groupName].innerText = value; });
    nodecg.readReplicant("stream" + groupName, value => { streamText[groupName].innerText = value; });
    nodecg.readReplicant("marginTop" + groupName, value => {
        if (mainGroup == groupName) {
            progress[groupName].style.marginTop = value;
        }
    });
    nodecg.readReplicant("marginRight" + groupName, value => {
        if (mainGroup != groupName) {
            progress[groupName].style.marginRight = value;
        }
    });
}