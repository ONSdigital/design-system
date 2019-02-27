class FetchStub {
  constructor(ok, status) {
    // Wait for callbacks to be set
    setTimeout(() => {
      if (ok || !this.catchCallback) {
        this.thenCallback({ ok, status });
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

export default (ok, status) => () => new FetchStub(ok, status);
