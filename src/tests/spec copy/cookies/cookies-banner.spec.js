import chaiSpies from 'chai-spies';

import CookiesBanner from '../../../components/cookies-banner/cookies-banner';
import { approveAllCookieTypes, cookie, setCookie } from '../../../js/cookies-functions';

const expect = chai.expect;

chai.use(chaiSpies);

describe('Component: Cookie banner', function() {
  beforeEach(function() {
    const component = renderComponent();
    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  it('should show the cookie banner', function() {
    new CookiesBanner(this.banner);
    const setupCookiesEventsSpy = chai.spy(CookiesBanner.setupCookiesEvents);
    const showCookiesMessageSpy = chai.spy(CookiesBanner.showCookiesMessage);
    expect(setupCookiesEventsSpy).to.have.been.called;
    expect(showCookiesMessageSpy).to.have.been.called;

    expect(this.banner.style.display).to.equal('block');
  });

  it('sets all cookies to true when accepting cookies', function() {
    new CookiesBanner(this.banner);
    const approveAllCookieTypesSpy = chai.spy(approveAllCookieTypes);

    const button = this.banner.querySelector('.ons-js-accept-cookies');
    button.click();

    expect(approveAllCookieTypesSpy).to.have.been.called;
    const cookieJSON = JSON.parse(cookie('ons_cookie_policy').replace(/'/g, '"'));
    expect(cookieJSON).to.contain({ essential: true, settings: true, usage: true, campaigns: true });
  });

  it('sets seen cookie message when accepting cookies', function() {
    new CookiesBanner(this.banner);
    const setConsentCookieSpy = chai.spy(CookiesBanner.setCookiesConsent);

    const button = this.banner.querySelector('.ons-js-accept-cookies');
    button.click();

    expect(cookie('ons_cookie_message_displayed')).to.equal('true');
    expect(setConsentCookieSpy).to.have.been.called;
  });

  it('should hide the primary message when pressing the accept link', function() {
    new CookiesBanner(this.banner);
    const hideCookiesMessageSpy = chai.spy(CookiesBanner.hidePrimaryCookiesBanner);

    const button = this.banner.querySelector('.ons-js-accept-cookies');
    button.click();

    const primaryBanner = this.banner.querySelector('.ons-cookies-banner__primary');
    expect(primaryBanner.style.display).to.equal('none');
    expect(hideCookiesMessageSpy).to.have.been.called;
  });

  it('should show the secondary message when pressing the accept button', function() {
    new CookiesBanner(this.banner);

    const button = this.banner.querySelector('.ons-js-accept-cookies');
    button.click();

    const secondaryBanner = this.banner.querySelector('.ons-cookies-banner__confirmation');
    expect(secondaryBanner.classList.contains('ons-u-d-no')).to.equal(false);
  });

  it('sets all radios to on from off', function() {
    new CookiesBanner(this.banner);

    const button = this.banner.querySelector('.ons-js-accept-cookies');
    button.click();

    const radios = [...this.form.querySelectorAll('input[value=on]')];
    radios.forEach(radio => {
      expect(radio.checked).to.be.true;
    });
  });

  it('should hide the secondary message when pressing the hide button', function() {
    new CookiesBanner(this.banner);
    const hideCookiesMessageSpy = chai.spy(CookiesBanner.hideConfirmBanner);

    const button = this.banner.querySelector('.ons-js-hide-button');
    button.click();

    expect(this.banner.style.display).to.equal('none');
    expect(hideCookiesMessageSpy).to.have.been.called;
  });

  it('does not show the banner if user has acknowledged the banner previously and consent cookie is present', function() {
    setCookie('ons_cookie_message_displayed', 'true');

    expect(this.banner.style.display).to.equal('');
  });
});

function renderComponent() {
  const formHTML =
    '<div class="ons-cookies-banner">' +
    '<div class="ons-container ons-cookies-banner__primary">' +
    '<div class="ons-grid">' +
    '<div class="ons-grid__col ons-col-8@m">' +
    '<h2 class="ons-cookies-banner__title ons-u-mb-xs">Tell us whether you accept cookies</h2>' +
    '<p class="ons-cookies-banner__desc">We use cookies to collect information about how you use census.gov.uk. We use this information to make the website work as well as possible and improve our services.</p>' +
    '<button type="button" class="ons-btn ons-btn--small ons-js-accept-cookies ons-u-mb-xs@xxs@s ons-cookies-banner__btn">' +
    '<span class="ons-btn__inner">Accept all cookies</span>' +
    '</button>' +
    '<a href="#0" role="button" class="ons-btn ons-btn--secondary ons-btn--small ons-u-ml-no@xxs@s ons-cookies-banner__btn ons-btn--link">' +
    '<span class="ons-btn__inner">Cookie settings</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="ons-container ons-cookies-banner__confirmation ons-u-d-no">' +
    '<div class="ons-grid ons-grid--flex ons-grid--between ons-grid--gutterless ons-grid--no-wrap@s ons-grid--vertical-center">' +
    '<div class="ons-grid__col ons-grid__col--flex ons-col-auto ons-u-flex-shrink@s">' +
    '<p class="ons-cookies-banner__desc ons-u-mb-no@s ons-u-mr-s@s">You’ve accepted all cookies. You can <a href="#0">change your cookie settings</a> at any time.</p>' +
    '</div>' +
    '<div class="ons-grid__col">' +
    '<button type="button" class="ons-btn ons-btn--secondary ons-btn--small ons-js-hide-button">' +
    '<span class="ons-btn__inner">Hide</span>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<form data-module="cookie-settings">' +
    '<input type="radio" class="ons-js-radio" id="settings-on" name="cookies-settings" value="on">' +
    '<input type="radio" class="ons-js-radio" id="settings-off" name="cookies-settings" value="off">' +
    '<input type="radio" class="ons-js-radio" name="cookies-usage" value="on">' +
    '<input type="radio" class="ons-js-radio" name="cookies-usage" value="off">' +
    '<input type="radio" class="ons-js-radio" name="cookies-campaigns" value="on">' +
    '<input type="radio" class="ons-js-radio" name="cookies-campaigns" value="off">' +
    '<button id="submit-button" type="submit">Submit</button>' +
    '</form>' +
    '<div class="ons-cookies-confirmation-message ons-u-d-no">' +
    '<a class="ons-js-return-link" href="#0">Return to previous page</a>' +
    '</div>';

  const wrapper = document.createElement('div');

  wrapper.innerHTML = formHTML;
  document.body.appendChild(wrapper);
  const banner = wrapper.querySelector('.ons-cookies-banner');
  const form = wrapper.querySelector('form');

  return {
    wrapper,
    banner,
    form,
  };
}
