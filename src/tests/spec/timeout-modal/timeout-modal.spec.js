import TimeoutModal from '../../../components/timeout-modal/timeout-modal';
import renderTemplate from '../../helpers/render-template';

import chai from 'chai';
import chaiSpies from 'chai-spies';
import eventMock from '../../stubs/event.stub.spec';

chai.use(chaiSpies);

const params = {
  showModalTimeInSeconds: 56,
  redirectUrl: '#!',
  title: 'You will be signed out soon',
  textFirstLine: 'It appears you have been inactive for a while.',
  countdownText: 'To protect your information, your progress will be saved and you will be signed out in',
  countdownExpiredText: 'You are being signed out.',
  btnText: 'Continue survey',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  endWithFullStop: true,
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
      this.timeoutModal = new TimeoutModal(this.component, null, null);
      this.openModalSpy = chai.spy.on(this.timeoutModal.modal, 'openDialog');
      this.startUiCountdownSpy = chai.spy.on(this.timeoutModal.timeout, 'startUiCountdown');
      this.hasExpiryTimeResetInAnotherTabSpy = chai.spy.on(this.timeoutModal, 'hasExpiryTimeResetInAnotherTab');
      this.getExpiryTimeSpy = chai.spy.on(this.timeoutModal.timeout, 'getExpiryTime');
    });

    it('then the modal should display after the set amount of seconds', function(done) {
      setTimeout(() => {
        expect(this.component.classList.contains('ons-u-db')).to.be.true;
        expect(this.openModalSpy).to.have.been.called();
        expect(this.startUiCountdownSpy).to.have.been.called();
        expect(this.hasExpiryTimeResetInAnotherTabSpy).to.have.been.called();
        expect(this.getExpiryTimeSpy).to.have.been.called();
        done();
      }, 5000);
    });
  });

  describe('When the modal is open', function() {
    beforeEach(function() {
      this.timeoutModal = new TimeoutModal(this.component, null, null);
    });

    it('then the timer should show the seconds counting', function(done) {
      const time = document.querySelector('.ons-js-timeout-timer span').innerHTML;
      setTimeout(() => {
        const changedTime = document.querySelector('.ons-js-timeout-timer span').innerHTML;
        expect(changedTime).to.not.equal(time);
        done();
      }, 2000);
    });
  });

  describe('When the modal is open and the escape key is pressed', function() {
    beforeEach(function(done) {
      this.timeoutModal = new TimeoutModal(this.component, null, null);
      this.timeoutModal.modal.openDialog();
      this.closeModalSpy = chai.spy.on(this.timeoutModal, 'closeModalAndRestartTimeout');
      this.restartTimeoutSpy = chai.spy.on(this.timeoutModal.timeout, 'restartTimeout');

      setTimeout(() => {
        this.mockedEvent = eventMock({ keyCode: 27 });
        this.timeoutModal.escToClose(this.mockedEvent);
        done();
      }, 1000);
    });

    it('then the modal should close', function() {
      expect(this.closeModalSpy).to.have.been.called();
    });

    it('then the timer should restart', function() {
      expect(this.restartTimeoutSpy).to.have.been.called();
    });
  });

  describe('When the modal is open and the continue button is clicked', function() {
    beforeEach(function(done) {
      this.timeoutModal = new TimeoutModal(this.component, null, null);
      this.timeoutModal.modal.openDialog();
      this.restartTimeoutSpy = chai.spy.on(this.timeoutModal.timeout, 'restartTimeout');

      setTimeout(() => {
        const continueButton = this.component.querySelector('.ons-js-modal-btn');
        continueButton.click();
        done();
      }, 1000);
    });

    it('then the timer should restart', function() {
      expect(this.restartTimeoutSpy).to.have.been.called();
    });
  });

  describe('When the modal is open and expiry time has been updated elsewhere', function() {
    beforeEach(function(done) {
      this.timeoutModal = new TimeoutModal(this.component, null, null);
      this.restartTimeoutSpy = chai.spy.on(this.timeoutModal.timeout, 'restartTimeout');
      setTimeout(() => {
        this.timeoutModal.timeout.expiryTime = new Date(Date.now() + 7 * 1000);
        done();
      }, 3000);
      this.timeoutModal.hasExpiryTimeResetInAnotherTab();
    });

    it('then the timer should restart', function() {
      expect(this.restartTimeoutSpy).to.have.been.called();
    });
  });

  describe('When there is a click event', function() {
    beforeEach(function(done) {
      this.timeoutModal = new TimeoutModal(this.component, null, null);
      this.timeoutModal.modal.closeDialog();
      this.throttleSpy = chai.spy.on(this.timeoutModal.timeout, 'throttle');

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
      this.timeoutModal = new TimeoutModal(this.component, 'base/src/tests/spec/timeout-modal/stub.json', null);
      this.fetchSpy = chai.spy.on(this.timeoutModal.timeout, 'fetchExpiryTime');
      this.timeoutModal.timeout.getExpiryTime();
    });

    it('then the fetchExpiryTime function should be called', function() {
      expect(this.fetchSpy).to.have.been.called();
    });
  });

  describe('When a fetch is made to set a new expiry time', function() {
    beforeEach(function() {
      this.timeoutModal = new TimeoutModal(this.component, 'base/src/tests/spec/timeout-modal/stub.json', null);
      this.fetchSpy = chai.spy.on(this.timeoutModal.timeout, 'fetchExpiryTime');
      this.timeoutModal.timeout.setNewExpiryTime();
    });

    it('then the fetchExpiryTime function should be called', function() {
      expect(this.fetchSpy).to.have.been.called();
    });
  });

  describe('When the window receives focus', function() {
    beforeEach(function() {
      this.timeoutModal = new TimeoutModal(this.component, 'base/src/tests/spec/timeout-modal/stub.json', null);
      this.startUiCountdownSpy = chai.spy.on(this.timeoutModal.timeout, 'startUiCountdown');
      this.timeoutModal.timeout.countdownStarted = true;
      this.timeoutModal.timeout.handleWindowFocus();
    });

    it('then the setNewExpiryTime function should be called', function() {
      expect(this.startUiCountdownSpy).to.have.been.called();
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
