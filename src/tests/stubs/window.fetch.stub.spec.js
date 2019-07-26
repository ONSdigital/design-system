class FetchStub {
  constructor(ok, status, response) {
    // Wait for callbacks to be set
    setTimeout(() => {
      if (ok || !this.catchCallback) {
        this.thenCallback({ ok, status, json: async () => response });
      } else {
        this.catchCallback({ ok, status });
      }
    });
  }

  then(callback) {
    this.thenCallback = callback;
    return this;
  }

  catch(callback) {
    this.catchCallback = callback;
    return this;
  }
}

export default (ok, status, response) => () => new FetchStub(ok, status, response);
