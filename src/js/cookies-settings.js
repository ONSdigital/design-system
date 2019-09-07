import { cookie, setDefaultConsentCookie, setConsentCookie, setCookie } from 'js/cookies-functions';
export default class CookiesSettings {
  constructor(component, referrerUrl) {
    this.component = component;
    this.referrerUrl = referrerUrl;
    this.component.addEventListener('submit', this.submitSettingsForm.bind(this));
    this.setInitialFormValues();
  }

  setInitialFormValues() {
    if (!cookie('ons_cookie_policy')) {
      setDefaultConsentCookie();
    }

    const currentConsentCookie = cookie('ons_cookie_policy');
    let currentConsentCookieJSON = JSON.parse(currentConsentCookie);

    delete currentConsentCookieJSON['essential'];

    for (let cookieType in currentConsentCookieJSON) {
      let radioButton;

      if (currentConsentCookieJSON[cookieType]) {
        radioButton = document.querySelector('input[name=cookies-' + cookieType + '][value=on]');
      } else {
        radioButton = document.querySelector('input[name=cookies-' + cookieType + '][value=off]');
      }

      radioButton.checked = true;
    }
  }

  submitSettingsForm(event) {
    event.preventDefault();
    const formInputs = event.target.getElementsByTagName('input');
    let options = {};

    for (let i = 0; i < formInputs.length; i++) {
      const input = formInputs[i];
      if (input.checked) {
        const name = input.name.replace('cookies-', '');
        const value = input.value === 'on' ? true : false;

        options[name] = value;
      }
    }
    setConsentCookie(options);

    if (!cookie('ons_cookie_message_displayed')) {
      setCookie('ons_cookie_message_displayed', true, { days: 365 });
    }

    this.showConfirmationMessage();

    return false;
  }

  showConfirmationMessage() {
    const confirmationMessage = document.querySelector('.cookies-confirmation-message');
    const previousPageLink = document.querySelector('.cookies-settings__prev-page');
    const referrer = this.getReferrerLink();

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (referrer && referrer !== document.location.pathname) {
      previousPageLink.href = referrer;
      previousPageLink.style.display = 'block';
    } else {
      previousPageLink.style.display = 'none';
    }

    confirmationMessage.classList.remove('u-d-no');
  }

  getReferrerLink() {
    if (document.referrer && !this.referrerUrl) {
      return new URL(document.referrer).pathname;
    } else if (this.referrerUrl) {
      return this.referrerUrl;
    } else {
      return false;
    }
  }
}
