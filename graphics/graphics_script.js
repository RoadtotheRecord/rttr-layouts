const str = window.location.href.split('/').pop();
const mainGroup = str.slice(0, -11);

const assetsPath = "/assets/rttr-layouts/runnerIcon/"

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
        nodecg.readReplicant("statusRunner" + groupName, value => {
            if (value == "Running") {
                changeRunner(groupName, newValue);
            } else {
                changeStatus(groupName, value);
            }
        });
    });

    nodecg.Replicant("currentTimeText" + groupName).on("change", newValue => {
        nodecg.readReplicant("statusRunner" + groupName, value => {
            if (value == "Running") {
                document.getElementById("currentTime" + groupName).innerText = newValue;
            } else {
                document.getElementById("currentTime" + groupName).innerText = "";
            }
        });
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

    nodecg.Replicant("statusRunner" + groupName).on("change", newValue => {
        if (newValue == "Running") {
            nodecg.readReplicant("data" + groupName, value => {
                changeRunner(groupName, value);
            });
            nodecg.readReplicant("currentTimeText" + groupName, value => {
                document.getElementById("currentTime" + groupName).innerText = value;
            });
            document.getElementById("screen" + groupName).style.visibility = "hidden";
        } else {
            changeStatus(groupName, newValue);
            document.getElementById("screen" + groupName).style.visibility = "visible";
        }
    });
}

function changeStatus(groupName, status) {
    if (status == "Setup") {
        document.getElementById("name" + groupName).innerText = "Setup now...";
        document.getElementById("screenText" + groupName).innerText = "Setup now...";
    } else if (status == "Finish") {
        document.getElementById("name" + groupName).innerText = "Finish";
        document.getElementById("screenText" + groupName).innerText = "Finish";
    }
    document.getElementById("icon" + groupName).src = assetsPath + "blank.png";
    document.getElementById("game" + groupName).innerText = "";
    document.getElementById("category" + groupName).innerText = "";
    document.getElementById("console" + groupName).innerText = "";
    document.getElementById("personal" + groupName).innerText = "";
    document.getElementById("target" + groupName).innerText = "";
    document.getElementById("twitter" + groupName).innerText = "";
    document.getElementById("stream" + groupName).innerText = "";
    document.getElementById("currentTime" + groupName).innerText = "";
}

function changeRunner(groupName, newValue) {
    document.getElementById("icon" + groupName).src = assetsPath + newValue.icon;
    document.getElementById("name" + groupName).innerText = newValue.runner_name;
    document.getElementById("game" + groupName).innerText = newValue.game_title;
    document.getElementById("category" + groupName).innerText = newValue.category;
    document.getElementById("console" + groupName).innerText = newValue.game_console;
    document.getElementById("personal" + groupName).innerText = newValue.personal_best;
    document.getElementById("target" + groupName).innerText = newValue.target_time;
    document.getElementById("twitter" + groupName).innerText = newValue.twitter;
    document.getElementById("stream" + groupName).innerText = newValue.stream_link;
}