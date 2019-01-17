import Fetch, { checkStatus } from 'js/fetch';
import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import promiseMock from 'stubs/promise.stub.spec';
import fetchMock from 'stubs/fetch.stub.spec';

describe('Function: fetch', () => {
  before(() => awaitPolyfills);

  describe('When checkStatus called with a successful response', () => {
    it('should return the response', () => {
      const response = { status: 200 };

      const result = checkStatus(response);
      expect(result).to.equal(result);
    });
  });

  describe('When checkStatus called with an unsuccessful response', () => {
    it('should throw an error', () => {
      const response = { status: 500, statusText: 'Error' };

      expect(() => checkStatus(response)).to.throw('Error');
    });
  });

  describe('When fetch is called', () => {
    it('Should return a promise', () => {
      const originalFetch = window.fetch;

      const mockedPromise = promiseMock();
      const mockedFetch = fetchMock(mockedPromise);

      window.fetch = mockedFetch;

      Fetch('/');

      expect(mockedFetch).to.have.been.called();
      expect(mockedPromise.then).to.have.been.called();

      window.fetch = originalFetch;
    });
  });
});
