import fetch from '../../../js/abortable-fetch';
import { awaitPolyfills } from '../../../js/polyfills/await-polyfills';
import fetchMock from '../../stubs/window.fetch.stub.spec';

describe('Function: Abortable Fetch', function() {
  before(() => awaitPolyfills);

  describe('When fetch is called successfully', () => {
    beforeEach(function(done) {
      const originalFetch = window.fetch;
      const mockedFetch = fetchMock(true);

      this.thenCallback = chai.spy();

      window.fetch = mockedFetch;

      fetch('url').then(this.thenCallback);

      window.fetch = originalFetch;

      // Wait for mocked fetch to run callbacks
      setTimeout(done);
    });

    it('then callback should be fired', function() {
      expect(this.thenCallback).to.have.been.called();
    });
  });

  describe('When fetch is fails', () => {
    beforeEach(function(done) {
      const originalFetch = window.fetch;
      const mockedFetch = fetchMock(false, 500);

      this.thenCallback = chai.spy();

      window.fetch = mockedFetch;

      fetch('url').catch(this.thenCallback);

      window.fetch = originalFetch;

      // Wait for mocked fetch to run callbacks
      setTimeout(done);
    });

    it('then callback should be fired', function() {
      expect(this.thenCallback).to.have.been.called();
    });
  });

  describe('When the fetch is aborted', function() {
    beforeEach(function(done) {
      const originalFetch = window.fetch;
      const mockedFetch = fetchMock(true);

      window.fetch = mockedFetch;

      this.abortableFetch = fetch('url').then(() => {});

      chai.spy.on(this.abortableFetch.controller, 'abort');

      this.abortableFetch.abort();

      window.fetch = originalFetch;

      // Wait for mocked fetch to run callbacks
      setTimeout(done);
    });

    it('then the fetch abort controller abort method should be called', function() {
      expect(this.abortableFetch.controller.abort).to.have.been.called();
    });
  });
});
