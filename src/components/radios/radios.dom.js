import domready from '../../js/domready';

domready(async () => {
    const radios = [...document.querySelectorAll('.ons-js-radio')];

    if (radios.length) {
        const button = document.querySelector('.ons-js-clear-btn');
        const otherInputs = document.querySelectorAll('.ons-radio__other');
        if (button) {
            const ClearRadios = (await import('./clear-radios')).default;

            new ClearRadios(radios, button, otherInputs);
        }

        const otherTextInputs = document.querySelectorAll('.ons-radio__other-input');
        if (otherTextInputs) {
            const CheckRadios = (await import('./check-radios')).default;
            otherTextInputs.forEach((textInput) => {
                const parent = textInput.parentNode;
                const radioInput = parent.querySelector('.ons-radio__input');
                new CheckRadios(radioInput, textInput);
            });
        }

        const otherFieldsets = [...document.querySelectorAll('.ons-js-other-fieldset-radio')];
        if (otherFieldsets) {
            const RadioWithInnerFieldset = (await import('./radio-with-fieldset')).default;
            otherFieldsets.forEach((otherFieldset) => {
                const context = otherFieldset.closest('.ons-radio');
                new RadioWithInnerFieldset(context);
            });
        }
    }
});
