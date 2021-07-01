import domready from '../../../js/domready';

async function initialiseAutosuggests() {
  const autosuggests = [...document.querySelectorAll('.js-autosuggest')];
  const addressAutosuggests = [...document.querySelectorAll('.js-address-autosuggest')];

  if (autosuggests.length) {
    const Autosuggest = (await import('./autosuggest')).default;

    autosuggests.forEach(autosuggest => new Autosuggest(autosuggest));
  }

  if (addressAutosuggests.length) {
    const AutosuggestAddress = (await import('./autosuggest.address')).default;

    addressAutosuggests.forEach(addressAutosuggest => new AutosuggestAddress(addressAutosuggest));
  }
}

domready(initialiseAutosuggests);
