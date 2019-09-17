import { cookie, setDefaultConsentCookie, approveAllCookieTypes, setConsentCookie } from 'js/cookies-functions';

export default class CookiesBanner {
  constructor(component) {
    this.component = component;
    this.button = this.component.querySelector('.js-accept-cookies');

    this.setupCookiesEvents();
  }

  setupCookiesEvents() {
    this.button.addEventListener('click', this.setCookiesConsent.bind(this));

    this.showCookiesMessage();
  }

  showCookiesMessage() {
    const displayCookiesBanner = this.component && cookie('ons_cookie_message_displayed') !== 'true';
    let policy = cookie('ons_cookie_policy');
    if (policy) {
      setConsentCookie(JSON.parse(policy.replace(/'/g, '"')));
    }
    if (displayCookiesBanner) {
      this.component.style.display = 'block';

      if (!cookie('ons_cookie_policy')) {
        setDefaultConsentCookie();
      }
    }
  }

  setCookiesConsent(event) {
    event.preventDefault();
    approveAllCookieTypes();
    cookie('ons_cookie_message_displayed', 'true', { days: 365 });
    this.hideCookiesMessage();
  }

  hideCookiesMessage() {
    if (this.component) {
      this.component.style.display = 'none';
    }
  }
}
