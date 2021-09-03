'use strict';

const commentatorNameRep = {};

window.onload = function () {
    for (let index = 0; index < 5; index++) {
        commentatorNameRep[index] = nodecg.Replicant(`commentatorName${index}`);
        commentatorNameRep[index].on("change", newValue => {
            document.getElementById(`commentName${index}`).innerText = newValue.split(",")[1];
        });
    }

    nodecg.Replicant("dataCommentator").on("change", newValue => {
        for (let index = 0; index < Object.keys(commentatorNameRep).length; index++) {
            let selectList = `<select id="commentatorSelect${index}">`;
            selectList += '<option value="0,選択なし">選択なし</option>';
            newValue.forEach(function(value) {
                if (commentatorNameRep[index].value == `${value.id},${value.name}`) {
                    selectList += `<option selected value="${value.id},${value.name}">${value.name}</option>`;
                } else {
                    selectList += `<option value="${value.id},${value.name}">${value.name}</option>`;
                }
            });
            selectList += '</select>';
            document.getElementById(`comment${index}`).innerHTML = selectList;   
        }
    });
}

function update() {
    for (let index = 0; index < Object.keys(commentatorNameRep).length; index++) {
        commentatorNameRep[index].value = document.getElementById(`commentatorSelect${index}`).value;
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