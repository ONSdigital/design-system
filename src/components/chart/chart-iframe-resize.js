import pym from 'pym.js';

class ChartIframeResize {
    static selector() {
        return '.ons-chart__iframe-wrapper iframe';
    }

    constructor(node) {
        this.node = node;
        new pym.Child(this.node.getAttribute('id'), this.node.dataset.url, {
            title: this.node.dataset.title,
        });
    }
}

export default ChartIframeResize;
