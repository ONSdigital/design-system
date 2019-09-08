import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import CookiesSettings from 'js/cookies-settings';
import { cookie, setDefaultConsentCookie, setConsentCookie, setCookie } from 'js/cookies-functions';

describe.only('Component: Cookie settings', function() {
  before(() => awaitPolyfills);

  beforeEach(function() {
    const component = renderComponent();
    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
    new CookiesSettings(this.form, null);
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('setInitialFormValues', function() {
    it('sets a consent cookie by default', function() {
      const setDefaultConsentCookieSpy = chai.spy(setDefaultConsentCookie);
      expect(setDefaultConsentCookieSpy).to.have.been.called;
    });

    it('sets all radio buttons to the default values', function() {
      const radioButtons = this.form[0].querySelectorAll('input[value=on]');
      const consentCookieJSON = JSON.parse(cookie('ons_cookie_policy'));
      for (let i = 0; i < radioButtons.length; i++) {
        const name = radioButtons[i].name.replace('cookies-', '');

        if (consentCookieJSON[name]) {
          expect(radioButtons[i].checked).to.be.true();
        } else {
          expect(radioButtons[i].checked).not.to.be.true();
        }
      }
    });
  });

  describe('submitSettingsForm', function() {
    it('updates consent cookie with any changes', function() {
      const setConsentCookieSpy = chai.spy(setConsentCookie);
      document.querySelector('#settings-on').checked = false;
      document.querySelector('#settings-off').checked = true;

      const button = document.querySelector('#submit-button');
      button.click();

      const cookieJSON = JSON.parse(cookie('ons_cookie_policy'));

      expect(cookieJSON).to.contain({ settings: false, usage: true, campaigns: true });
      expect(setConsentCookieSpy).to.have.been.called;
    });
  });

  it('sets ons_cookie_message_displayed cookie on form submit', function() {
    const setCookieSpy = chai.spy(setCookie);

    cookie('ons_cookie_message_displayed', null);
    expect(cookie('ons_cookie_message_displayed')).to.equal(null);

    const button = document.querySelector('#submit-button');
    button.click();

    expect(setCookieSpy).to.have.been.called;
    expect(cookie('ons_cookie_message_displayed')).to.equal('true');
  });

  describe('showConfirmationMessage', function() {
    it('sets the previous referrer link if one is present', function() {
      new CookiesSettings(this.form, '/help');

      const button = document.querySelector('#submit-button');
      button.click();
      const previousLink = document.querySelector('.cookies-settings__prev-page');

      expect(previousLink.style.display).to.equal('block');
      expect(previousLink.href).to.contain('/help');
    });

    it('does not set a referrer if URL is the same as current page', function() {
      new CookiesSettings(this.form, document.location.href);

      const button = document.querySelector('#submit-button');
      button.click();
      const previousLink = document.querySelector('.cookies-settings__prev-page');

      expect(previousLink.style.display).to.equal('none');
    });

    it('shows a confirmation message', function() {
      const confirmationMessage = document.querySelector('.cookies-confirmation-message');
      const button = document.querySelector('#submit-button');
      button.click();

      expect(confirmationMessage.classList.contains('u-d-no')).to.be.false;
    });
  });
});

function renderComponent() {
  const formHTML =
    '<form data-module="cookie-settings">' +
    '<input type="radio" id="settings-on" name="cookies-settings" value="on">' +
    '<input type="radio" id="settings-off" name="cookies-settings" value="off">' +
    '<input type="radio" name="cookies-usage" value="on">' +
    '<input type="radio" name="cookies-usage" value="off">' +
    '<input type="radio" name="cookies-campaigns" value="on">' +
    '<input type="radio" name="cookies-campaigns" value="off">' +
    '<button id="submit-button" type="submit">Submit</button>' +
    '</form>' +
    '<div class="cookies-confirmation-message u-d-no">' +
    '<a class="cookies-settings__prev-page" href="#">View previous page</a>' +
    '</div>';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = formHTML;
  document.body.appendChild(wrapper);

  const form = wrapper.querySelector('[data-module=cookie-settings]');

  return {
    wrapper,
    form,
  };
}
