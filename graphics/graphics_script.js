const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

const assetsPath = "/assets/rttr_layouts/runnerIcon/"

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

    initReplicant('GroupA');
    initReplicant('GroupB');
    initReplicant('GroupC');
}

function initReplicant(groupName) {
    nodecg.Replicant("data" + groupName).on("change", newValue => {
        document.getElementById("icon" + groupName).src = assetsPath + newValue.icon;
        document.getElementById("name" + groupName).innerText = newValue.runner_name;
        document.getElementById("game" + groupName).innerText = newValue.game_title;
        document.getElementById("category" + groupName).innerText = newValue.category;
        document.getElementById("console" + groupName).innerText = newValue.game_console;
        document.getElementById("personal" + groupName).innerText = newValue.personal_best;
        document.getElementById("target" + groupName).innerText = newValue.target_time;
        document.getElementById("twitter" + groupName).innerText = newValue.twitter;
        document.getElementById("stream" + groupName).innerText = newValue.stream_link;
    });

    nodecg.Replicant("currentTimeText" + groupName).on("change", newValue => {
        document.getElementById("currentTime" + groupName).innerText = newValue;
    });

    nodecg.Replicant("marginTop" + groupName).on("change", newValue => {
        if (mainGroup == groupName) {
            document.getElementById("progress" + groupName).style.marginTop = newValue;
        }
    });

    nodecg.Replicant("marginRight" + groupName).on("change", newValue => {
        if (mainGroup != groupName) {
            document.getElementById("progress" + groupName).style.marginRight = newValue;
        }
    });
}