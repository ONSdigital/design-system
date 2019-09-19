import { unset } from 'lodash';
import { cookie, setDefaultConsentCookie, setConsentCookie, setCookie } from 'js/cookies-functions';
export default class CookiesSettings {
  constructor(component) {
    this.component = component;
    this.component.addEventListener('submit', this.submitSettingsForm.bind(this));
    this.setInitialFormValues();
  }

  setInitialFormValues() {
    if (!cookie('ons_cookie_policy')) {
      setDefaultConsentCookie();
    }

    const currentConsentCookie = cookie('ons_cookie_policy');
    let currentConsentCookieJSON = JSON.parse(currentConsentCookie.replace(/'/g, '"'));

    try {
      unset(currentConsentCookieJSON, 'essential');
    } catch (e) {
      console.error(e);
    }

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

    this.hideCookiesBanner();
    this.checkPreviousLink();
    this.showConfirmationMessage();

    return false;
  }

  showConfirmationMessage() {
    const confirmationMessage = document.querySelector('.cookies-confirmation-message');

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    confirmationMessage.classList.remove('u-d-no');
  }

  checkPreviousLink() {
    const previousPageLink = document.querySelector('.cookies-settings__prev-page');
    if (1 < history.length) {
      previousPageLink.addEventListener('click', this.goBack.bind(this));
    } else {
      previousPageLink.style.display = 'none';
    }
  }

  hideCookiesBanner() {
    if (!cookie('ons_cookie_message_displayed')) {
      setCookie('ons_cookie_message_displayed', true, { days: 365 });
    }
    const cookiesBanner = document.querySelector('.cookies-banner');
    if (cookiesBanner) {
      cookiesBanner.style.display = 'none';
    }
  }

  goBack() {
    event.preventDefault();
    window.history.back();
  }
}
