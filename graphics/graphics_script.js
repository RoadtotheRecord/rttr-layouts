const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

const assetsPath = "/assets/rttr_layouts/runnerIcon/"

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
    const canvas = document.getElementById('mainBackGround');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.onload = function() {
        context.drawImage(image, 0, 0);
        context.globalCompositeOperation = 'xor';
        context.fillRect(1920 * 0.36, 0, 1920 * 0.64, 1080 * 0.64);
        context.fillRect(1920 * 0.33, 1080 * 0.64, 1920 * 0.32, 1080 * 0.32);
        context.fillRect(1920 * 0.68, 1080 * 0.64, 1920 * 0.32, 1080 * 0.32);
        context.fill();
    };
    image.src = 'material/background.png';

    initElement('GroupA');
    initElement('GroupB');
    initElement('GroupC');

    initReplicant('GroupA');
    initReplicant('GroupB');
    initReplicant('GroupC');
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
    nodecg.Replicant("data" + groupName).on("change", newValue => {
        icon[groupName].src = assetsPath + newValue.icon;
        nameText[groupName].innerText = newValue.runner_name;
        gameText[groupName].innerText = newValue.game_title;
        categoryText[groupName].innerText = newValue.category;
        consoleText[groupName].innerText = newValue.game_console;
        personalText[groupName].innerText = newValue.personal_best;
        targetText[groupName].innerText = newValue.target_time;
        twitterText[groupName].innerText = newValue.twitter;
        streamText[groupName].innerText = newValue.stream_link;
    });
    nodecg.Replicant("currentTimeText" + groupName).on("change", newValue => { currentTimeText[groupName].innerText = newValue; });
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