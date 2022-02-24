class AbortableFetch {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.controller = new window.AbortController();
    this.status = 'UNSENT';
  }

  async send() {
    this.status = 'LOADING';
    try {
      const response = await window.fetch(this.url, { signal: this.controller.signal, ...this.options });
      const isResponseOK = (response.status >= 200 && response.status < 300) || response.status >= 400;
      if (!isResponseOK) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.response = response;
        throw error;
      }
      return response;
    } finally {
      this.status = 'DONE';
    }
  }

  abort() {
    this.controller.abort();
  }
}

export default (url, options) => new AbortableFetch(url, options);
