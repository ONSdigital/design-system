import 'js/fetch';
import 'components/timeout/src/timeout';
import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/timeout/src/_template.njk';
import fetchMock from 'stubs/fetch.stub.spec';
import promiseInstanceMock from 'stubs/promise.stub.spec';
import dialogMock from 'stubs/dialog.stub.spec';
import loaderButtonMock from 'stubs/loader-btn.stub.spec';
import getTimeNowMock from 'stubs/getTimeNow.stub.spec';

const params = {
  id: 'timeout',
  title: 'Timeout',
  preTitle: 'Survey or service name',
  action: '/',
  loadingMessage: 'Continuing&hellip;',
  continueButton: 'Continue survey',
  submitButton: 'Save and sign out',
  countdown: {
    width: 40
  },
  timeout: 4,
  prompt: 4
};

describe('Component: Timeout', () => {
  const promiseInstance = promiseInstanceMock();
  const mockedFetch = fetchMock(promiseInstance);
  const mockedLoaderButton = loaderButtonMock();
  const mockedGetTimeNow = getTimeNowMock(789);

  let wrapper, instance, rewiremock;

  before(resolve => {
    awaitPolyfills.then(() => {
      rewiremock = require('rewiremock/webpack').default;
      resolve();
    });
  });

  beforeEach(done => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    const script = document.createElement('script');
    script.innerHTML = `window.__EQ_SESSION_TIMEOUT__ = ${params.timeout}; window.__EQ_SESSION_TIMEOUT_PROMPT__ = ${params.prompt};`;
    document.body.appendChild(script);

    rewiremock('./src/js/fetch')
      .es6()
      .withDefault(mockedFetch);

    rewiremock('./src/js/dialog')
      .es6()
      .withDefault(dialogMock);

    rewiremock('./src/js/loader-btn')
      .es6()
      .withDefault(mockedLoaderButton);

    rewiremock.enable();

    const mockedTimeout = require('components/timeout/src/timeout').default;

    instance = new mockedTimeout();

    // Wait for instance to complete initialisation
    setTimeout(done, 1000);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
      rewiremock.disable();
    }
  });

  describe('When handleContinue called', () => {
    it('should call the fetch API', () => {
      instance.handleContinue();

      expect(mockedFetch).to.be.spy;
      expect(mockedFetch).to.have.been.called();
      expect(promiseInstance.then).to.have.been.called();
      expect(promiseInstance.catch).to.have.been.called();
    });
  });

  describe('When continueSuccess called', () => {
    it('should call dialog.hide', () => {
      instance.continueSuccess();

      expect(instance.dialog.hide).to.be.spy;
      expect(instance.dialog.hide).to.have.been.called();
    });

    it('should reset all values', () => {
      chai.spy.on(instance.animation, 'reset');
      chai.spy.on(instance, 'reset');

      instance.continueSuccess();

      expect(instance.continueRetryCount).to.equal(instance.continueRetryLimit);
      expect(instance.continueBtn.reset).to.have.been.called();
      expect(instance.animation.reset).to.have.been.called();
      expect(instance.reset).to.have.been.called();
    });
  });

  describe('When continueFail called', () => {
    describe('and retry has been attempted less than 5 times', () => {
      it('should call handleContinue', () => {
        const originalSetTimeout = window.setTimeout;

        function fakeSetTimeout(func) {
          func();
        }

        window.setTimeout = chai.spy(fakeSetTimeout);

        chai.spy.on(instance, 'handleContinue');

        instance.continueFail();

        expect(instance.handleContinue).to.have.been.called();

        window.setTimeout = originalSetTimeout;
      });
    });

    describe('and return has been attempted 5 times', () => {
      it('should reset values', () => {
        instance.continueRetryCount = 0;

        instance.continueFail();

        expect(instance.continueBtn.reset).to.have.been.called();
        expect(instance.continueRetryCount).to.equal(instance.continueRetryLimit);
      });
    });
  });

  describe('When reset called', () => {
    it('should set timerStartCountdown', () => {
      const currentTime = 123;
      instance.timeStartCountdown = currentTime;

      instance.reset();

      expect(currentTime).to.not.be.equal(instance.timeStartCountdown);
    });
  });

  describe('When onTick called', () => {
    it('should return new time increment', () => {
      rewiremock.disable();

      rewiremock('./src/js/utils/getTimeNow')
        .es6()
        .withDefault(mockedGetTimeNow);

      rewiremock.enable();

      const mockedTimeout = require('components/timeout/src/timeout').default;

      instance = new mockedTimeout();

      instance.timeLimit = 123;
      instance.timeStartCountdown = 456;

      expect(instance.onTick()).to.equal(-210);
    });
  });
});
