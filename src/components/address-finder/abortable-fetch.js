class AbortableFetch {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.controller = new window.AbortController();
    this.status = 'UNSENT';
  }

  send() {
    this.status = 'LOADING';

    return new Promise((resolve, reject) => {
      abortableFetch(this.url, { signal: this.controller.signal, ...this.options })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            this.status = 'DONE';
            resolve(response);
          } else if (response.status >= 400) {
            this.status = 'DONE';
            resolve(response);
          } else {
            this.status = 'DONE';
            reject(response);
          }
        })
        .catch(error => {
          this.status = 'undefined';
          reject(error);
        });
    });
  }

  abort() {
    this.controller.abort();
  }
}

function abortableFetch(url, options) {
  return window
    .fetch(url, options)
    .then(response => {
      if (response) {
        return response;
      } else {
        const error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => {
      throw error;
    });
}

export default (url, options) => new AbortableFetch(url, options);
