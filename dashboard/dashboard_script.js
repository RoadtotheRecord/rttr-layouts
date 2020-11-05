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

const iconRep = nodecg.Replicant("icon" + currentGroup);
iconRep.on("change", newValue => { iconImage.src = newValue; });
const nameRep = nodecg.Replicant("name" + currentGroup);
nameRep.on("change", newValue => { nameText.innerText = newValue; });
const gameRep = nodecg.Replicant("game" + currentGroup);
gameRep.on("change", newValue => { gameText.innerText = newValue; });
const categoryRep = nodecg.Replicant("category" + currentGroup);
categoryRep.on("change", newValue => { categoryText.innerText = newValue; });
const targetRep = nodecg.Replicant("target" + currentGroup);
targetRep.on("change", newValue => { targetText.innerText = newValue; });
const limitRep = nodecg.Replicant("limit" + currentGroup);
limitRep.on("change", newValue => { limitText.innerText = newValue; });
const currentTimeTextRep = nodecg.Replicant("currentTimeText" + currentGroup);
currentTimeTextRep.on("change", newValue => {
    if (newValue != "NaN:aN:aN") {
        currentText.innerText = newValue;
    }
});

function reload() {
    nodecg.sendMessage("reloadRunner", currentGroup);
}

function prevRunner() {
    timerStop();
    timerReset();
    nodecg.sendMessage("prevRunner", currentGroup);
}

function nextRunner() {
    timerStop();
    timerReset();
    nodecg.sendMessage("nextRunner", currentGroup);
}

function timerStart() {
    nodecg.sendMessage("startTimer", currentGroup);
}

function timerStop() {
    nodecg.sendMessage("stopTimer", currentGroup);
}

function timerReset() {
    nodecg.sendMessage("resetTimer", currentGroup);
}

nodecg.listenFor('reloadButtonChange' + currentGroup, (newValue) => { reloadButton.disabled = newValue; });
nodecg.listenFor('prevButtonChange' + currentGroup, (newValue) => { prevButton.disabled = newValue; });
nodecg.listenFor('nextButtonChange' + currentGroup, (newValue) => { nextButton.disabled = newValue; });
nodecg.listenFor('startButtonChange' + currentGroup, (newValue) => { startButton.disabled = newValue; });
nodecg.listenFor('stopButtonChange' + currentGroup, (newValue) => { stopButton.disabled = newValue; });
nodecg.listenFor('resetButtonChange' + currentGroup, (newValue) => { resetButton.disabled = newValue; });