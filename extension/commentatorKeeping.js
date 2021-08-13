'use strict';

const fetch = require('node-fetch');
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();

const dataRep = nodecg.Replicant("dataCommentator");
const reqUrl = `https://script.google.com/macros/s/${nodecg.bundleConfig.google.webAppURL}/exec?id=${nodecg.bundleConfig.google.spreadsheetId}&sheet=Commentator`;

requestReload();

function requestReload() {
    nodecg.sendMessage("reloadButtonChangeCommentator", true);
    fetch(reqUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(orgData) {
            dataRep.value = orgData;
            nodecg.sendMessage("reloadButtonChangeCommentator", false);
        });
}

nodecg.listenFor('reloadCommentator', requestReload);