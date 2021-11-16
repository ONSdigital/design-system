import Timeout from '../../../components/timeout-modal/timeout';
import renderTemplate from '../../helpers/render-template';

import chai from 'chai';
import chaiSpies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiSpies);
chai.use(chaiAsPromised);

const params = {
  showModalTimeInSeconds: 5,
  redirectUrl: '#!',
  title: 'You will be signed out soon',
  textFirstLine: 'It appears you have been inactive for a while.',
  countdownText: 'To protect your information, your progress will be saved and you will be signed out in',
  redirectingText: 'You are being signed out',
  btnText: 'Continue survey',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
};

describe('Component: Timeout modal', function() {
  beforeEach(function() {
    const component = renderComponent(params);
    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When the component initialises', function() {
    beforeEach(function() {
      this.timeout = new Timeout(this.component);
      this.openModalSpy = chai.spy.on(this.timeout, 'openModal');
      this.startUiCountdownSpy = chai.spy.on(this.timeout, 'startUiCountdown');
      this.hasExpiryTimeResetInAnotherTabSpy = chai.spy.on(this.timeout, 'hasExpiryTimeResetInAnotherTab');
      this.redirectSpy = chai.spy.on(this.timeout, 'redirect');
    });

    it('then the modal should display after the set amount of seconds', function(done) {
      setTimeout(() => {
        expect(this.component.classList.contains('ons-u-db')).to.be.true;
        expect(this.openModalSpy).to.have.been.called();
        expect(this.startUiCountdownSpy).to.have.been.called();
        expect(this.hasExpiryTimeResetInAnotherTabSpy).to.have.been.called();
        done();
      }, 3000);
    });

    it('then the ui should show the time going down', function(done) {
      const time = document.querySelector('.ons-js-timeout-timer span').innerHTML;
      expect(time).to.equal('4 seconds');
      setTimeout(() => {
        const timeUpdated = document.querySelector('.ons-js-timeout-timer span').innerHTML;
        expect(timeUpdated).to.equal('3 seconds');
        done();
      }, 1000);
    });

    it('then the aria-live should be set to assertive', function() {
      expect(document.querySelector('.ons-js-timeout-timer-acc').getAttribute('aria-live')).to.equal('assertive');
    });

    describe('When the timer has expired', function() {
      it('then the timer text should change to redirecting text', function() {
        const text = document.querySelector('.ons-js-timeout-timer span').innerHTML;
        expect(this.hasExpiryTimeResetInAnotherTabSpy).to.have.been.called();
        setTimeout(() => {
          expect(text).to.equal('You are being signed out');
          done();
        }, 3000);
      });
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/timeout-modal/_test-template.njk', { params });
  const wrapper = document.createElement('div');
  wrapper.classList.add('ons-page');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
  const component = document.querySelector('.ons-js-timeout-modal');

  return {
    component,
  };
}
