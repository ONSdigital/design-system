import pym from 'pym.js';

class ChartIframeResize {
    static selector() {
        return '.ons-chart__iframe-wrapper';
    }

    constructor(node) {
        this.node = node;
        new pym.Parent(this.node.getAttribute('id'), this.node.dataset.url, {
            title: this.node.dataset.title,
        });
    }
}

export default ChartIframeResize;
