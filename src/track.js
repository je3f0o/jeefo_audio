/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : track.js
* Created at  : 2019-10-13
* Updated at  : 2019-10-27
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

class JeefoTrack {
    constructor (track) {
        this.track       = track;
        this.settings    = track.getSettings();
        this.constraints = track.getConstraints();
        if (track.getCapabilities) {
            this.capabilities = track.getCapabilities();
        } else {
            this.capabilities = {};
        }
    }
}

module.exports = JeefoTrack;
