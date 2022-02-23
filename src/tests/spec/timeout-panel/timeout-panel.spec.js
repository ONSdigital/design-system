import Timeout from '../../../js/timeout';
import renderTemplate from '../../helpers/render-template';

import chai from 'chai';
import chaiSpies from 'chai-spies';

chai.use(chaiSpies);

const params = {
  id: 'countdown',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  countdownText: 'For security, your answers will only be available to view for another',
  nojsText: 'For security, your answers will only be available to view for another 5 seconds',
  countdownExpiredText: 'For security, you can no longer view your answers',
  redirectUrl: '#!',
};

describe('Component: Timeout panel', function() {
  beforeEach(function() {
    const component = renderComponent(params);
    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
    this.time = new Date(Date.now() + 7 * 1000);
    this.url = params.redirectUrl;
    this.timeout = new Timeout(this.component, this.url, this.time, false, true);
    this.getExpiryTimeSpy = chai.spy.on(this.timeout, 'getExpiryTime');
    this.redirectSpy = chai.spy.on(this.timeout, 'redirect');
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When the component initialises', function() {
    it('then the panel should be shown and countdown started', function(done) {
      setTimeout(() => {
        const text = this.component.querySelector('.ons-js-timeout-timer').innerHTML;
        expect(text).contain('For security, your answers will only be available to view for another');
        expect(this.timeout.countdownStarted).to.equal(true);
        done();
      }, 1500);
    });

    it('then the ui should show the time going down', function(done) {
      const time = parseInt(this.component.querySelector('.ons-js-timeout-timer span').innerHTML.charAt(0));
      setTimeout(() => {
        const timeUpdated = parseInt(this.component.querySelector('.ons-js-timeout-timer span').innerHTML.charAt(0));
        expect(timeUpdated).to.be.lessThan(time);
        done();
      }, 1500);
    });

    it('then the aria-live should be set to assertive', function() {
      expect(this.component.querySelector('.ons-js-timeout-timer-acc').getAttribute('aria-live')).to.equal('assertive');
    });

    it('then the accessibility countdown should contain the correct values', function() {
      expect(parseInt(this.component.querySelector('.ons-js-timeout-timer-acc span').innerHTML.charAt(0))).to.equal(6);
    });

    it('then the timer text should change to expired text when 0 seconds are left', function(done) {
      setTimeout(() => {
        const text = this.component.querySelector('.ons-js-timeout-timer span').innerHTML;
        expect(text).to.equal('For security, you can no longer view your answers');
        expect(this.redirectSpy).to.have.been.called();
        done();
      }, 9000);
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/timeout-panel/_test-template.njk', { params });
  const wrapper = document.createElement('div');
  wrapper.classList.add('ons-page');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
  const component = document.querySelector('.ons-js-panel-with-countdown');

  return {
    component,
  };
}
