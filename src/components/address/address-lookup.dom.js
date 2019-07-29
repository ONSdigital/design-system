import domready from 'js/domready';

domready(async () => {
  const addressComponents = [...document.querySelectorAll('.js-address')];

  if (addressComponents.length) {
    const AddressLookup = (await import('./address-lookup')).default;

    addressComponents.forEach(component => new AddressLookup(component));
  }
});
