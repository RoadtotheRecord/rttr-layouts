const str = window.location.href.split('/').pop();
const currentGroup = str.slice(0, -5)

const assetsPath = "/assets/rttr-layouts/runnerIcon/"

window.onload = function () {
    nodecg.Replicant("data" + currentGroup).on("change", newValue => {
        iconImage.src = assetsPath + newValue.icon;
        nameText.innerText = newValue.runner_name;
        gameText.innerText = newValue.game_title;
        categoryText.innerText = newValue.category;
        consoleText.innerText = newValue.game_console;
        personalText.innerText = newValue.personal_best;
        targetText.innerText = newValue.target_time;
        limitText.innerText = newValue.limit_time;
        twitterText.innerText = newValue.twitter;
        streamText.innerText = newValue.stream_link;
    });

    nodecg.Replicant("currentTimeText" + currentGroup).on("change", newValue => {
        if (newValue != "NaN:aN:aN") {
            currentText.innerText = newValue;
        }
    });

    nodecg.Replicant("runningTimer" + currentGroup).on("change", newValue => {
        if (newValue == "Start") {
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = true;
        } else {
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = false;
        }
        if (newValue == "Stop") {
            nodecg.sendMessage("resetTimer", currentGroup);
        }
    });

    nodecg.sendMessage("initButton", currentGroup);
}

function reload() {
    nodecg.sendMessage("reloadRunner", currentGroup);
}

function prevRunner() {
    nodecg.sendMessage("prevRunner", currentGroup);
}

function nextRunner() {
    nodecg.sendMessage("nextRunner", currentGroup);
}

function setupRunner() {
    nodecg.readReplicant("statusRunner" + currentGroup, value => {
        if (value == "Running") {
            nodecg.sendMessage("setupRunner", currentGroup);
        } else {
            nodecg.sendMessage("runningRunner", currentGroup);
        }
    });
}

function finishRunner() {
    nodecg.readReplicant("statusRunner" + currentGroup, value => {
        if (value == "Running") {
            nodecg.sendMessage("finishRunner", currentGroup);
        } else {
            nodecg.sendMessage("runningRunner", currentGroup);
        }
    });
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

function timerSuccess() {
    nodecg.sendMessage("successTimer", currentGroup);
}

nodecg.listenFor('reloadButtonChange' + currentGroup, (newValue) => { reloadButton.disabled = newValue; });
nodecg.listenFor('prevButtonChange' + currentGroup, (newValue) => { prevButton.disabled = newValue; });
nodecg.listenFor('nextButtonChange' + currentGroup, (newValue) => { nextButton.disabled = newValue; });
nodecg.listenFor('startButtonChange' + currentGroup, (newValue) => { startButton.disabled = newValue; });
nodecg.listenFor('stopButtonChange' + currentGroup, (newValue) => { stopButton.disabled = newValue; });
nodecg.listenFor('resetButtonChange' + currentGroup, (newValue) => { resetButton.disabled = newValue; });
nodecg.listenFor('successButtonChange' + currentGroup, (newValue) => { successButton.disabled = newValue; });
nodecg.listenFor('setupButtonChange' + currentGroup, (newValue) => { setupButton.disabled = newValue; });
nodecg.listenFor('finishButtonChange' + currentGroup, (newValue) => { finishButton.disabled = newValue; });

nodecg.listenFor('setupButtonText' + currentGroup, (newValue) => { setupButton.innerText = newValue; });
nodecg.listenFor('finishButtonText' + currentGroup, (newValue) => { finishButton.innerText = newValue; });