import HighchartsBaseChart from './chart';
import domready from '../../js/domready';

document.fonts.ready.then(() => {
    domready(async () => {
        [HighchartsBaseChart].forEach((Component) => {
            document.querySelectorAll(Component.selector()).forEach((el) => new Component(el));
        });
    });
});
