'use strict';

const commentatorNameRep = {};
const currentCommentator = {};

window.onload = function () {
    for (let index = 0; index < 5; index++) {
        commentatorNameRep[index] = nodecg.Replicant(`commentatorName${index}`);
        nodecg.readReplicant(`commentatorName${index}`, value => {
            currentCommentator[index] = value;
            document.getElementById(`commentName${index}`).innerText = value;
        });
    }

    nodecg.Replicant("dataCommentator").on("change", newValue => {
        for (let index = 0; index < Object.keys(commentatorNameRep).length; index++) {
            let selectList = `<select id="commentatorSelect${index}">`;
            let commentatorList = '<option>0 選択なし</option>';
            newValue.forEach(function(value) {
                if (currentCommentator[index] == `${value.id} ${value.name}`) {
                    commentatorList += `<option selected>${value.id} ${value.name}</option>`;
                } else {
                    commentatorList += `<option>${value.id} ${value.name}</option>`;
                }
            });
            selectList += commentatorList;
            selectList += '</select>';
            document.getElementById(`comment${index}`).innerHTML = selectList;   
        }
    });
}

function update() {
    for (let index = 0; index < Object.keys(commentatorNameRep).length; index++) {
        let name = document.getElementById(`commentatorSelect${index}`).value;
        document.getElementById(`commentName${index}`).innerText = name;
        commentatorNameRep[index].value = name;
    }
}

function textChange() {
    nodecg.Replicant("setupText").value = textList.value;
}

function timerStart() {
    timerStartGroup('GroupA');
    timerStartGroup('GroupB');
    timerStartGroup('GroupC');
}

function timerStartGroup(groupName) {
    nodecg.readReplicant("runningTimer" + groupName, value => {
        if (value == "Stop" || value == "Pause") {
            nodecg.sendMessage("startTimer", groupName);
        }
    });
}

function reload() {
    nodecg.sendMessage("reloadCommentator")
}

nodecg.listenFor('reloadButtonChangeCommentator', (newValue) => { reloadButton.disabled = newValue; });