const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

const icon = {};
const nameText = {};
const currentTimeText = {};
const gameText = {};
const categoryText = {};
const targetText = {};
const limitText = {};
const progress = {};

const iconRep = {};
const nameTextRep = {};
const currentTimeTextRep = {};
const gameTextRep = {};
const categoryTextRep = {};
const targetTextRep = {};
const marginTopRep = {};
const marginRightRep = {};

window.onload = function () {
    initElement('GroupA');
    initElement('GroupB');
    initElement('GroupC');
    initElement('GroupD');

    initReplicant('GroupA');
    initReplicant('GroupB');
    initReplicant('GroupC');
    initReplicant('GroupD');

    loadReplicant('GroupA');
    loadReplicant('GroupB');
    loadReplicant('GroupC');
    loadReplicant('GroupD');
}

function initElement(groupName) {
    icon[groupName] = document.getElementById("icon" + groupName);
    nameText[groupName] = document.getElementById("name" + groupName);
    currentTimeText[groupName] = document.getElementById("currentTime" + groupName);
    gameText[groupName] = document.getElementById("game" + groupName);
    categoryText[groupName] = document.getElementById("category" + groupName);
    targetText[groupName] = document.getElementById("target" + groupName);
    progress[groupName] = document.getElementById("progress" + groupName);
}

function initReplicant(groupName) {
    iconRep[groupName] = nodecg.Replicant("icon" + groupName);
    iconRep[groupName].on("change", newValue => { icon[groupName].src = newValue; });
    nameTextRep[groupName] = nodecg.Replicant("name" + groupName);
    nameTextRep[groupName].on("change", newValue => { nameText[groupName].innerText = newValue; });
    currentTimeTextRep[groupName] = nodecg.Replicant("currentTimeText" + groupName);
    currentTimeTextRep[groupName].on("change", newValue => { currentTimeText[groupName].innerText = newValue; });
    gameTextRep[groupName] = nodecg.Replicant("game" + groupName);
    gameTextRep[groupName].on("change", newValue => { gameText[groupName].innerText = newValue; });
    categoryTextRep[groupName] = nodecg.Replicant("category" + groupName);
    categoryTextRep[groupName].on("change", newValue => { categoryText[groupName].innerText = newValue; });
    targetTextRep[groupName] = nodecg.Replicant("target" + groupName);
    targetTextRep[groupName].on("change", newValue => { targetText[groupName].innerText = newValue; });
    marginTopRep[groupName] = nodecg.Replicant("marginTop" + groupName);
    marginTopRep[groupName].on("change", newValue => {
        if (mainGroup == groupName) {
            progress[groupName].style.marginTop = newValue;
        }
    });
    marginRightRep[groupName] = nodecg.Replicant("marginRight" + groupName);
    marginRightRep[groupName].on("change", newValue => {
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
    nodecg.readReplicant("target" + groupName, value => { targetText[groupName].innerText = value; });
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