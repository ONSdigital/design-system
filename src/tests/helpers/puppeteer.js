import * as url from 'url';

const INTERCEPT_INSTANCE_HEADER_NAME = 'x-test-intercept-instance';

export async function getNodeAttributes(page, selector) {
  return await page.$eval(selector, node => {
    const reducer = (map, attr) => {
      map[attr.name] = attr.value;
      return map;
    };
    return [...node.attributes].reduce(reducer, {});
  });
}

function sanitizeHref(href) {
  return url.parse(href, false).href;
}

export class PuppeteerEndpointFaker {
  #page = null;
  #overrides = new Map();
  #temporaryOverrides = new Map();
  #requestHistory = null;
  #currentInstance = 0;

  constructor(basePath) {
    this.domain = `http://localhost:${process.env.TEST_PORT}`;
    this.baseUrl = `${this.domain}${basePath}`;
    this.suppressWarnings = false;
  }

  get requestHistory() {
    return this.#requestHistory;
  }

  get requestedPaths() {
    return this.requestHistory.map(entry => entry.path);
  }

  async setup(page) {
    if (this.#page !== null) {
      throw new Error('faker has already been setup');
    }

    this.#page = page;

    page.on('request', this.#handleRequest.bind(this));
    await this.#refreshInstanceHeader();
    await page.setRequestInterception(true);
  }

  async reset() {
    await this.#refreshInstanceHeader();
    this.#requestHistory = [];
    this.#temporaryOverrides.clear();
  }

  setOverride(path, response) {
    this.#overrides.set(sanitizeHref(this.baseUrl + path), response);
  }

  setOverrides(paths, response) {
    paths.forEach(path => this.setOverride(path, response));
  }

  setTemporaryOverride(path, response) {
    this.#temporaryOverrides.set(sanitizeHref(this.baseUrl + path), response);
  }

  setTemporaryOverrides(paths, response) {
    paths.forEach(path => this.setTemporaryOverride(path, response));
  }

  getRequestCount(path) {
    path = sanitizeHref(path);
    return this.requestHistory.filter(entry => entry.path === path).length;
  }

  async #refreshInstanceHeader() {
    await this.#page.setExtraHTTPHeaders({
      [INTERCEPT_INSTANCE_HEADER_NAME]: `${++this.#currentInstance}`,
    });
  }

  #resolveOverride(href) {
    href = sanitizeHref(href);
    return this.#temporaryOverrides.get(href) ?? this.#overrides.get(href);
  }

  #handleRequest(interceptedRequest) {
    if (interceptedRequest.isInterceptResolutionHandled()) {
      return;
    }

    // Ignore if this instance has been reset since the request was made.
    const requestInstance = interceptedRequest.headers()[INTERCEPT_INSTANCE_HEADER_NAME];
    if (requestInstance !== this.#currentInstance.toString()) {
      interceptedRequest.continue();
      return;
    }

    if (interceptedRequest.url().startsWith(this.baseUrl)) {
      const requestInfo = {
        url: url.parse(interceptedRequest.url(), true),
        path: interceptedRequest.url().replace(this.baseUrl, ''),
        headers: interceptedRequest.headers(),
      };

      this.requestHistory.push(requestInfo);

      const override = this.#resolveOverride(requestInfo.url.href);
      if (!!override) {
        console.log(`Faked API request for ${requestInfo.url.href}`);
        interceptedRequest.respond({
          status: override.status ?? 200,
          headers: override.headers ?? {},
          contentType: override.contentType ?? 'application/json',
          body: override.body ?? JSON.stringify(override.data),
        });
        return;
      } else if (!this.suppressWarnings) {
        console.warn(`Fake response not defined for ${requestInfo.url.href}`);
      }
    }

    interceptedRequest.continue();
  }
}
