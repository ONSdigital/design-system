import pym from 'pym.js';

class ChartIframeResize {
    static selector() {
        return '[data-chart-iframe]';
    }

    constructor(node) {
        this.node = node;
        new pym.Parent(this.node.getAttribute('id'), this.node.dataset.url, {
            title: this.node.dataset.title,
        });
    }
}

export default ChartIframeResize;
