import Timeout from '../../../components/timeout-modal/timeout';
import renderTemplate from '../../helpers/render-template';

import chai from 'chai';
import chaiSpies from 'chai-spies';
import eventMock from '../../stubs/event.stub.spec';

chai.use(chaiSpies);

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
      this.time = new Date(Date.now() + 7 * 1000);
      this.timeout = new Timeout(this.component, null, this.time);
      this.openModalSpy = chai.spy.on(this.timeout, 'openModal');
      this.startUiCountdownSpy = chai.spy.on(this.timeout, 'startUiCountdown');
      this.hasExpiryTimeResetInAnotherTabSpy = chai.spy.on(this.timeout, 'hasExpiryTimeResetInAnotherTab');
      this.getExpiryTimeSpy = chai.spy.on(this.timeout, 'getExpiryTime');
    });

    it('then the modal should display after the set amount of seconds', function(done) {
      setTimeout(() => {
        expect(this.component.classList.contains('ons-u-db')).to.be.true;
        expect(this.openModalSpy).to.have.been.called();
        expect(this.startUiCountdownSpy).to.have.been.called();
        expect(this.hasExpiryTimeResetInAnotherTabSpy).to.have.been.called();
        expect(this.getExpiryTimeSpy).to.have.been.called();
        done();
      }, 3000);
    });

    it('then the ui should show the time going down', function(done) {
      const time = parseInt(document.querySelector('.ons-js-timeout-timer span').innerHTML.charAt(0));
      setTimeout(() => {
        const timeUpdated = parseInt(document.querySelector('.ons-js-timeout-timer span').innerHTML.charAt(0));
        expect(timeUpdated).to.be.lessThan(time);
        done();
      }, 1500);
    });

    it('then the aria-live should be set to assertive', function() {
      expect(document.querySelector('.ons-js-timeout-timer-acc').getAttribute('aria-live')).to.equal('assertive');
    });

    it('then the accessibility countdown should contain the correct values', function() {
      expect(parseInt(document.querySelector('.ons-js-timeout-timer-acc span').innerHTML.charAt(0))).to.equal(5);
    });

    it('then the timer text should change to redirecting text when 0 seconds are left', function(done) {
      setTimeout(() => {
        const text = document.querySelector('.ons-js-timeout-timer span').innerHTML;
        expect(text).to.equal('You are being signed out');
        done();
      }, 3000);
    });
  });

  describe('When the modal is open and the continue button is clicked', function() {
    beforeEach(function(done) {
      this.time = new Date(Date.now() + 7 * 1000);
      this.timeout = new Timeout(this.component, null, this.time);
      this.closeModalSpy = chai.spy.on(this.timeout, 'closeModalAndRestartTimeout');
      this.restartTimeoutSpy = chai.spy.on(this.timeout, 'restartTimeout');
      this.startTimeoutSpy = chai.spy.on(this.timeout, 'startTimeout');

      setTimeout(() => {
        const continueButton = this.component.querySelector('.ons-js-modal-btn');
        continueButton.click();
        done();
      }, 3000);
    });

    it('then the modal should close', function() {
      expect(this.closeModalSpy).to.have.been.called();
    });

    it('then the timer should restart', function() {
      expect(this.restartTimeoutSpy).to.have.been.called();
      expect(this.startTimeoutSpy).to.have.been.called();
    });
  });

  describe('When the modal is open and the escape key is pressed', function() {
    beforeEach(function(done) {
      this.time = new Date(Date.now() + 7 * 1000);
      this.timeout = new Timeout(this.component, null, this.time);
      this.closeModalSpy = chai.spy.on(this.timeout, 'closeModalAndRestartTimeout');
      this.restartTimeoutSpy = chai.spy.on(this.timeout, 'restartTimeout');
      this.startTimeoutSpy = chai.spy.on(this.timeout, 'startTimeout');

      setTimeout(() => {
        this.mockedEvent = eventMock({ keyCode: 27 });
        this.timeout.escToClose(this.mockedEvent);
        done();
      }, 3000);
    });

    it('then the modal should close', function() {
      expect(this.closeModalSpy).to.have.been.called();
    });

    it('then the timer should restart', function() {
      expect(this.restartTimeoutSpy).to.have.been.called();
      expect(this.startTimeoutSpy).to.have.been.called();
    });
  });

  describe('When the modal is open and expiry time has been updated elsewhere', function() {
    beforeEach(function(done) {
      this.time = new Date(Date.now() + 7 * 1000);
      this.timeout = new Timeout(this.component, null, this.time);
      this.closeModalSpy = chai.spy.on(this.timeout, 'closeModalAndRestartTimeout');
      setTimeout(() => {
        this.timeout.expiryTime = new Date(Date.now() + 7 * 1000);
        done();
      }, 3000);
      this.timeout.hasExpiryTimeResetInAnotherTab();
    });

    it('then the modal should close', function() {
      expect(this.closeModalSpy).to.have.been.called();
    });
  });

  describe('When there is a click event', function() {
    beforeEach(function(done) {
      this.time = new Date(Date.now() + 20 * 1000);
      this.timeout = new Timeout(this.component, null, this.time);
      this.timeout.modal.closeDialog();
      this.throttleSpy = chai.spy.on(this.timeout, 'throttle');

      setTimeout(() => {
        document.body.click();
        done();
      }, 3000);
    });

    it('then the throttle function should be called', function() {
      expect(this.throttleSpy).to.have.been.called();
    });
  });

  describe('When a fetch is made to get the current expiry time', function() {
    beforeEach(function() {
      this.timeout = new Timeout(this.component, 'base/src/tests/spec/timeout-modal/stub.json', null);
      this.fetchSpy = chai.spy.on(this.timeout, 'fetchExpiryTime');
      this.timeout.getExpiryTime();
    });

    it('then the fetchExpiryTime function should be called', function() {
      expect(this.fetchSpy).to.have.been.called();
    });
  });

  describe('When a fetch is made to set a new expiry time', function() {
    beforeEach(function() {
      this.timeout = new Timeout(this.component, 'base/src/tests/spec/timeout-modal/stub.json', null);
      this.fetchSpy = chai.spy.on(this.timeout, 'fetchExpiryTime');
      this.timeout.setNewExpiryTime();
    });

    it('then the fetchExpiryTime function should be called', function() {
      expect(this.fetchSpy).to.have.been.called();
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
