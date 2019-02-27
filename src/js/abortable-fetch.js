class AboratableFetch {
  constructor(url, options) {
    this.url = url;
    this.controller = new window.AbortController();
    this.options = { ...options, signal: this.controller.signal };

    fetch(url, options).then(response => {
      if (response.ok) {
        this.thenCallback(response);
      } else {
        this.catchCallback(response);
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

  abort() {
    this.controller.abort();
  }
}

export default (url, options) => new AboratableFetch(url, options);
