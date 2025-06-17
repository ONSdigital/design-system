/* global pym */

class ChartIframeResize {
    static selector() {
        return '[data-chart-iframe]';
    }

    constructor(node) {
        this.node = node;
        /* eslint-disable no-new */
        new pym.Parent(this.node.getAttribute('id'), this.node.dataset.url, {
            title: this.node.dataset.title,
        });
        /* eslint-enable no-new */
    }
}

export default ChartIframeResize;
