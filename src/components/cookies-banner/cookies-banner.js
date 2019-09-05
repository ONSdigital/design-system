import { cookie, approveAllCookieTypes } from 'js/cookies-functions';

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

    if (displayCookiesBanner) {
      this.component.style.display = 'block';

      if (!cookie('ons_cookie_policy')) {
        approveAllCookieTypes();
      }
    }
  }

  setCookiesConsent(event) {
    event.preventDefault();
    cookie('ons_cookie_message_displayed', 'true', { days: 365 });
    this.hideCookiesMessage();
  }

  hideCookiesMessage() {
    if (this.component) {
      this.component.style.display = 'none';
    }
  }
}
