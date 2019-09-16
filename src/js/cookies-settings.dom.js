import domready from 'js/domready';

async function cookiesSettings() {
  const cookiesSettings = [...document.querySelectorAll('[data-module=cookie-settings]')];
  if (cookiesSettings.length) {
    const CookiesSettings = (await import('./cookies-settings')).default;
    cookiesSettings.forEach(form => {
      new CookiesSettings(form, null);
    });
  }
}

domready(cookiesSettings);
