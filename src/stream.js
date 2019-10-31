/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : stream.js
* Created at  : 2019-10-13
* Updated at  : 2019-10-29
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

const JeefoTrack = require("./track");

const video_mime_types = [
    'video/webm; codecs=h264',
    'video/webm; codecs=H264',
    'video/webm; codecs=vp9.0',
    'video/webm; codecs=vp9',
    'video/webm; codecs=vp8',
    'video/webm; codecs=vp8.0',
    'video/webm; codecs=avc1',
    'video/webm; codecs=vp8,opus',
    'video/WEBM; codecs=VP8,OPUS',
    'video/webm; codecs=vp9,opus',
    'video/webm; codecs=vp8,vp9,opus',
    'video/webm; codecs=h264,opus',
    'video/webm; codecs=h264,vp9,opus',
    'video/x-matroska; codecs=avc1',
    'video/webm',
];
const audio_mime_types = [
    // Chrome
    'audio/webm; codecs=opus',
    // Firefox
    'audio/ogg; codecs=opus',
];
const { isTypeSupported } = MediaRecorder;
const video_mime = video_mime_types.find(isTypeSupported);
const audio_mime = audio_mime_types.find(isTypeSupported);

class JeefoStream {
    constructor (stream = null) {
        this.stream = stream;
        this.tracks = [];

        if (stream) {
            stream.getTracks().forEach(track => {
                this.tracks.push(new JeefoTrack(track));
            });
        }
    }

    addTrack (track) {
        this.tracks.push(new JeefoTrack(track));
        this.stream.addTrack(track);
    }

    removeTrack (track) {
        this.stream.removeTrack(track);
        this.tracks = this.tracks.filter(t => t.track !== track);
    }

    get has_video () {
        return this.stream.getVideoTracks().length > 0;
    }

    get mime () {
        return this.has_video ? video_mime : audio_mime;
    }
}

module.exports = JeefoStream;
