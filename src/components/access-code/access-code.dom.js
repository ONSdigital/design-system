import domready from '../../js/domready';

domready(async () => {
    const accessCodeInputs = [...document.querySelectorAll('.ons-js-access-code')];

    if (accessCodeInputs.length) {
        const accessCode = (await import('./access-code')).default;

        accessCodeInputs.forEach((element) => new accessCode(element));
    }
});
