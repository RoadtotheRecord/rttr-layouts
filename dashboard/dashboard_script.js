const str = window.location.href.split('/').pop();
const currentGroup = str.slice(0, -5)

window.onload = function () {
    nodecg.Replicant("icon" + currentGroup).on("change", newValue => { iconImage.src = newValue; });
    nodecg.Replicant("name" + currentGroup).on("change", newValue => { nameText.innerText = newValue; });
    nodecg.Replicant("game" + currentGroup).on("change", newValue => { gameText.innerText = newValue; });
    nodecg.Replicant("category" + currentGroup).on("change", newValue => { categoryText.innerText = newValue; });
    nodecg.Replicant("console" + currentGroup).on("change", newValue => { consoleText.innerText = newValue; });
    nodecg.Replicant("personal" + currentGroup).on("change", newValue => { personalText.innerText = newValue; });
    nodecg.Replicant("target" + currentGroup).on("change", newValue => { targetText.innerText = newValue; });
    nodecg.Replicant("limit" + currentGroup).on("change", newValue => { limitText.innerText = newValue; });
    nodecg.Replicant("twitter" + currentGroup).on("change", newValue => { twitterText.innerText = newValue; });
    nodecg.Replicant("stream" + currentGroup).on("change", newValue => { streamText.innerText = newValue; });
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
    const canvas = document.getElementById('mainBackGround');
    if (canvas == null) {
        return false;
    }
    const context = canvas.getContext('2d');

    const image = new Image();
    image.onload = function() {
        context.drawImage(image, 0, 0);
        context.globalCompositeOperation = 'xor';
        context.fillRect(490, 10, 1420, 790);
        context.fillRect(10, 10, 470, 790);
        context.fill();
    };
    image.src = '/assets/rttr_layouts/materials/bg.png';
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