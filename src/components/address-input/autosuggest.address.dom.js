import domready from '../../js/domready';

async function initialiseAddressAutosuggests() {
  const addressAutosuggests = [...document.querySelectorAll('.ons-js-address-autosuggest')];

  if (addressAutosuggests.length) {
    const AutosuggestAddress = (await import('./autosuggest.address')).default;

    addressAutosuggests.forEach(addressAutosuggest => new AutosuggestAddress(addressAutosuggest));
  }
}

domready(initialiseAddressAutosuggests);
