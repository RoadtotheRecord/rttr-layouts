'use strict';

window.onload = function() {
    nodecg.Replicant('setupText').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        setupText.innerText = newValue;
    });
}