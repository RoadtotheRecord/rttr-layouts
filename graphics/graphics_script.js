let iconGroupA = new Object();
let iconGroupB = new Object();
let iconGroupC = new Object();
let iconGroupD = new Object();

let nameGroupA = new Object();
let nameGroupB = new Object();
let nameGroupC = new Object();
let nameGroupD = new Object();

let gameGroupA = new Object();
let gameGroupB = new Object();
let gameGroupC = new Object();
let gameGroupD = new Object();

let categoryGroupA = new Object();
let categoryGroupB = new Object();
let categoryGroupC = new Object();
let categoryGroupD = new Object();

let targetGroupA = new Object();
let targetGroupB = new Object();
let targetGroupC = new Object();
let targetGroupD = new Object();

// let limitGroupA = new Object();
// let limitGroupB = new Object();
// let limitGroupC = new Object();
// let limitGroupD = new Object();

let progress1 = new Object();
let progress2 = new Object();
let progress3 = new Object();
let progress4 = new Object();

window.onload = function () {
    iconGroupA = document.getElementById("iconGroupA");
    iconGroupB = document.getElementById("iconGroupB");
    iconGroupC = document.getElementById("iconGroupC");
    iconGroupD = document.getElementById("iconGroupD");

    nameGroupA = document.getElementById("nameGroupA");
    nameGroupB = document.getElementById("nameGroupB");
    nameGroupC = document.getElementById("nameGroupC");
    nameGroupD = document.getElementById("nameGroupD");

    gameGroupA = document.getElementById("gameGroupA");
    gameGroupB = document.getElementById("gameGroupB");
    gameGroupC = document.getElementById("gameGroupC");
    gameGroupD = document.getElementById("gameGroupD");

    categoryGroupA = document.getElementById("categoryGroupA");
    categoryGroupB = document.getElementById("categoryGroupB");
    categoryGroupC = document.getElementById("categoryGroupC");
    categoryGroupD = document.getElementById("categoryGroupD");

    targetGroupA = document.getElementById("targetGroupA");
    targetGroupB = document.getElementById("targetGroupB");
    targetGroupC = document.getElementById("targetGroupC");
    targetGroupD = document.getElementById("targetGroupD");

    // limitGroupA = document.getElementById("limitGroupA");
    // limitGroupB = document.getElementById("limitGroupB");
    // limitGroupC = document.getElementById("limitGroupC");
    // limitGroupD = document.getElementById("limitGroupD");

    progress1 = document.getElementById("progress1");
    progress2 = document.getElementById("progress2");
    progress3 = document.getElementById("progress3");
    progress4 = document.getElementById("progress4");
}

const iconGroupArep = nodecg.Replicant("iconGroupA");
const iconGroupBrep = nodecg.Replicant("iconGroupB");
const iconGroupCrep = nodecg.Replicant("iconGroupC");
const iconGroupDrep = nodecg.Replicant("iconGroupD");

const nameGroupArep = nodecg.Replicant("nameGroupA");
const nameGroupBrep = nodecg.Replicant("nameGroupB");
const nameGroupCrep = nodecg.Replicant("nameGroupC");
const nameGroupDrep = nodecg.Replicant("nameGroupD");

const gameGroupArep = nodecg.Replicant("gameGroupA");
const gameGroupBrep = nodecg.Replicant("gameGroupB");
const gameGroupCrep = nodecg.Replicant("gameGroupC");
const gameGroupDrep = nodecg.Replicant("gameGroupD");

const categoryGroupArep = nodecg.Replicant("categoryGroupA");
const categoryGroupBrep = nodecg.Replicant("categoryGroupB");
const categoryGroupCrep = nodecg.Replicant("categoryGroupC");
const categoryGroupDrep = nodecg.Replicant("categoryGroupD");

const targetGroupArep = nodecg.Replicant("targetGroupA");
const targetGroupBrep = nodecg.Replicant("targetGroupB");
const targetGroupCrep = nodecg.Replicant("targetGroupC");
const targetGroupDrep = nodecg.Replicant("targetGroupD");

// const limitGroupArep = nodecg.Replicant("limitGroupA");
// const limitGroupBrep = nodecg.Replicant("limitGroupB");
// const limitGroupCrep = nodecg.Replicant("limitGroupC");
// const limitGroupDrep = nodecg.Replicant("limitGroupD");

const progress1Rep = nodecg.Replicant("verticalGroupA");
const progress2Rep = nodecg.Replicant("horizontalGroupB");
const progress3Rep = nodecg.Replicant("horizontalGroupC");
const progress4Rep = nodecg.Replicant("horizontalGroupA");

iconGroupArep.on("change", newValue => { iconGroupA.src = newValue; });
iconGroupBrep.on("change", newValue => { iconGroupB.src = newValue; });
iconGroupCrep.on("change", newValue => { iconGroupC.src = newValue; });
iconGroupDrep.on("change", newValue => { iconGroupD.src = newValue; });

nameGroupArep.on("change", newValue => { nameGroupA.innerText = newValue; });
nameGroupBrep.on("change", newValue => { nameGroupB.innerText = newValue; });
nameGroupCrep.on("change", newValue => { nameGroupC.innerText = newValue; });
nameGroupDrep.on("change", newValue => { nameGroupD.innerText = newValue; });

gameGroupArep.on("change", newValue => { gameGroupA.innerText = newValue; });
gameGroupBrep.on("change", newValue => { gameGroupB.innerText = newValue; });
gameGroupCrep.on("change", newValue => { gameGroupC.innerText = newValue; });
gameGroupDrep.on("change", newValue => { gameGroupD.innerText = newValue; });

categoryGroupArep.on("change", newValue => { categoryGroupA.innerText = newValue; });
categoryGroupBrep.on("change", newValue => { categoryGroupB.innerText = newValue; });
categoryGroupCrep.on("change", newValue => { categoryGroupC.innerText = newValue; });
categoryGroupDrep.on("change", newValue => { categoryGroupD.innerText = newValue; });

targetGroupArep.on("change", newValue => { targetGroupA.innerText = newValue; });
targetGroupBrep.on("change", newValue => { targetGroupB.innerText = newValue; });
targetGroupCrep.on("change", newValue => { targetGroupC.innerText = newValue; });
targetGroupDrep.on("change", newValue => { targetGroupD.innerText = newValue; });

// limitGroupArep.on("change", newValue => {
//     if (newValue != 0) {
//         limitGroupA.innerText = newValue;
//     } else {
//         limitGroupA.innerText = "Time up!";
//     }
// });

// limitGroupBrep.on("change", newValue => {
//     if (newValue != 0) {
//         limitGroupB.innerText = newValue;
//     } else {
//         limitGroupB.innerText = "Time up!";
//     }
// });

// limitGroupCrep.on("change", newValue => {
//     if (newValue != 0) {
//         limitGroupC.innerText = newValue;
//     } else {
//         limitGroupC.innerText = "Time up!";
//     }
// });

// limitGroupDrep.on("change", newValue => {
//     if (newValue != 0) {
//         limitGroupD.innerText = newValue;
//     } else {
//         limitGroupD.innerText = "Time up!";
//     }
// });

progress1Rep.on("change", newValue => { progress1.style.marginTop = newValue + "px"; });
progress2Rep.on("change", newValue => { progress2.style.marginRight = newValue + "px"; });
progress3Rep.on("change", newValue => { progress3.style.marginRight = newValue + "px"; });
progress4Rep.on("change", newValue => { progress4.style.marginRight = newValue + "px"; });