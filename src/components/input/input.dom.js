import domready from '../../js/domready';

domready(async () => {
    const abbrInputs = [...document.querySelectorAll('.ons-js-input-container-abbr')];

    if (abbrInputs.length) {
        const abbrInput = (await import('./input')).default;

        abbrInputs.forEach((element) => new abbrInput(element));
    }
});
