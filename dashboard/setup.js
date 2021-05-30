'use strict';

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