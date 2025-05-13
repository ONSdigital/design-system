import domready from '../../js/domready';

async function initialise() {
    const limitedInputs = [...document.querySelectorAll('.ons-js-char-limit-input')];
    const wordlimitedInputs = [...document.querySelectorAll('.ons-js-word-limit-input')];
    if (limitedInputs.length) {
        const CharLimit = (await import('../char-check-limit/character-limit')).default;

        limitedInputs.forEach((input) => new CharLimit(input));
    }
    if (wordlimitedInputs.length) {
        const WordLimit = (await import('../word-limit/word-limit')).default;

        wordlimitedInputs.forEach((input) => new WordLimit(input));
    }
}

domready(initialise);
