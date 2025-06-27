import ChartIframeResize from './chart-iframe-resize';
import domready from '../../js/domready';

domready(async () => {
    [ChartIframeResize].forEach((Component) => {
        document.querySelectorAll(Component.selector()).forEach((el) => new Component(el));
    });
});
