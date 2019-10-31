/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : node.js
* Created at  : 2019-10-13
* Updated at  : 2019-10-25
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals MediaStreamAudioSourceNode*/
/* exported*/

// ignore:end

const JeefoStream = require("./stream");

class NamedNodeWrapper {
    constructor (name, node) {
        this.name = name;
        this.node = node;
    }
}

class JeefoNode {
    constructor (node) {
        this.node = node;
        if (node instanceof MediaStreamAudioSourceNode) {
            this.stream  = new JeefoStream();
        } else {
            this.stream  = new JeefoStream(node.stream);
        }
        this.inputs = [];
    }

    get _stream () { return this.stream.stream || null; }

    get is_recordable () {
        return this.stream.has_video || this.inputs.length > 0;
    }

    connect_input_node (name, node) {
        const named_node = new NamedNodeWrapper(name, node);
        this.inputs.push(named_node);
        node.node.connect(this.node);
        return named_node;
    }

    disconnect_input (node) {
        const i = this.inputs.findIndex(named_node => {
            return named_node.node === node;
        });
        if (i >= 0) {
            node.node.disconnect();
            this.inputs.splice(i, 1);
        } else {
            debugger
        }
    }

    create_analyser (fft = 64) {
        const { context, stream } = this.node;

        if (this.source_node) {
            this.source_node.disconnect();
        }

        const analyser = this.analyser = context.createAnalyser();
        analyser.fftSize = fft;

        this.source_node = context.createMediaStreamSource(stream);
        this.source_node.connect(analyser);
        return analyser;
    }
}

module.exports = JeefoNode;
