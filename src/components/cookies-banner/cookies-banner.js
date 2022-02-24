import { approveAllCookieTypes, cookie, setConsentCookie, setDefaultConsentCookie } from '../../js/cookies-functions';

export default class CookiesBanner {
  constructor(component) {
    this.component = component;
    this.primaryBanner = this.component.querySelector('.ons-cookies-banner__primary');
    this.confirmBanner = this.component.querySelector('.ons-cookies-banner__confirmation');
    this.acceptButton = this.component.querySelector('.ons-js-accept-cookies');
    this.rejectButton = this.component.querySelector('.ons-js-reject-cookies');
    this.hideButton = this.component.querySelector('.ons-js-hide-button');
    this.acceptedText = this.component.querySelector('.ons-js-accepted-text');
    this.rejectedText = this.component.querySelector('.ons-js-rejected-text');
    this.setupCookiesEvents();
  }

  setupCookiesEvents() {
    this.acceptButton.addEventListener('click', this.setCookiesConsent.bind(this));
    this.rejectButton.addEventListener('click', this.setCookiesConsent.bind(this));
    this.hideButton.addEventListener('click', this.hideConfirmBanner.bind(this));

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
    const action = event.target.getAttribute('data-button');

    cookie('ons_cookie_message_displayed', 'true', { days: 365 });
    this.hidePrimaryCookiesBanner(action);

    const isOnSettingsPage = document.querySelector('[data-module="cookie-settings"]');
    if (isOnSettingsPage) {
      this.updateRadios(action);
    }

    if (action == 'accept') {
      approveAllCookieTypes();
      if (typeof loadGTM != 'undefined') {
        loadGTM();
      }
    } else if (action == 'reject') {
      setDefaultConsentCookie();
    }
  }

  updateRadios(action) {
    const radios = [...document.querySelectorAll('.ons-js-radio')];
    radios.forEach(radio => {
      if (action == 'reject') {
        radio.value == 'off' ? (radio.checked = true) : (radio.checked = false);
      } else if (action == 'accept') {
        radio.value == 'off' ? (radio.checked = false) : (radio.checked = true);
      }
    });
  }

  hidePrimaryCookiesBanner(action) {
    if (this.component) {
      this.primaryBanner.style.display = 'none';
      this.confirmBanner.classList.remove('ons-u-d-no');
      this.confirmBanner.setAttribute('aria-live', 'polite');
      this.confirmBanner.setAttribute('role', 'status');
      if (action == 'reject') {
        this.rejectedText.classList.remove('ons-u-d-no');
      } else if (action == 'accept') {
        this.acceptedText.classList.remove('ons-u-d-no');
      }
    }
  }

  hideConfirmBanner() {
    if (this.component) {
      this.component.style.display = 'none';
    }
  }
}
