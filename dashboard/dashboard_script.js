const str = window.location.href.split('/').pop();
const currentGroup = str.slice(0, -5)

const assetsPath = "/assets/rttr_layouts/runnerIcon/"

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
        if (newValue) {
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = true;
        } else {
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = false;
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