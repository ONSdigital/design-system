import domready from '../../js/domready';

async function initialise() {
    const wordlimitedInputs = [...document.querySelectorAll('.ons-js-word-check-input')];
    if (wordlimitedInputs.length) {
        const WordLimit = (await import('../word-limit/word-limit')).default;

        wordlimitedInputs.forEach((input) => new WordLimit(input));
    }
}

domready(initialise);
