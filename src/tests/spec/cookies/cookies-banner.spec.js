import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import CookiesBanner from 'components/cookies-banner/cookies-banner';
import { cookie, setCookie, approveAllCookieTypes } from 'js/cookies-functions';

describe('Component: Cookie banner', function() {
  before(() => awaitPolyfills);

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

  it('sets a consent cookie by default', function() {
    new CookiesBanner(this.banner);
    const approveAllCookieTypesSpy = chai.spy(approveAllCookieTypes);
    expect(approveAllCookieTypesSpy).to.have.been.called;
    const cookieJSON = JSON.parse(cookie('ons_cookie_policy'));
    expect(cookieJSON).to.contain({ essential: true, settings: true, usage: true, campaigns: true });
  });

  it('sets seen cookie message when accepting cookies', function() {
    new CookiesBanner(this.banner);
    const setConsentCookieSpy = chai.spy(CookiesBanner.setCookiesConsent);

    const button = this.banner.querySelector('.js-accept-cookies');
    button.click();

    expect(cookie('ons_cookie_message_displayed')).to.equal('true');
    expect(setConsentCookieSpy).to.have.been.called;
  });

  it('should hide when pressing the accept link', function() {
    new CookiesBanner(this.banner);
    const hideCookiesMessageSpy = chai.spy(CookiesBanner.hideCookiesMessage);

    const button = this.banner.querySelector('.js-accept-cookies');
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
    '<div class="cookies-banner">' +
    '<div class="container">' +
    '<div class="grid grid--flex grid--gutterless grid--vertical-center grid--no-wrap@s">' +
    '<div class="grid__col grid__col--flex col-auto u-flex-shrink@s">' +
    '<p class="cookies-banner__desc u-mr-s">CENSUS.GOV.UK uses cookies to make the site simpler.</p>' +
    '</div>' +
    '<div class="grid__col grid__col--flex col-auto">' +
    '<button type="button" class="btn btn--small js-accept-cookies">' +
    '<span class="btn__inner">Accept cookies</span>' +
    '</button>' +
    '<a href="#" role="button" class="btn btn--secondary btn--small btn--link">' +
    '<span class="btn__inner">Cookie settings</span>' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = formHTML;
  document.body.appendChild(wrapper);

  const banner = wrapper.querySelector('.cookies-banner');

  return {
    wrapper,
    banner,
  };
}
