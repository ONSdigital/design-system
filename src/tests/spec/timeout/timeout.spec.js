import rm from 'rewiremock/webpack';

import 'js/fetch';
import 'components/timeout/src/timeout';
import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/timeout/src/_template.njk';
import fetchMock from 'stubs/fetch.stub.spec';
import promiseInstanceMock from 'stubs/promise.stub.spec';

const rewiremock = rm.default;

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

  rewiremock('./src/js/fetch.js')
    .es6()
    .withDefault(mockedFetch);

  rewiremock.enable();

  const mockedTimeout = require('components/timeout/src/timeout').default;

  let wrapper, instance;

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    const script = document.createElement('script');
    script.innerHTML = `window.__EQ_SESSION_TIMEOUT__ = ${params.timeout}; window.__EQ_SESSION_TIMEOUT_PROMPT__ = ${params.prompt};`;
    document.body.appendChild(script);

    instance = new mockedTimeout();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
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
});
