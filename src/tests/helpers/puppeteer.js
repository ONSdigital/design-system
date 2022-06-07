import * as url from 'url';

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
  #overrides = new Map();
  #temporaryOverrides = new Map();
  #requestHistory = null;

  constructor(basePath) {
    this.domain = `http://localhost:${process.env.TEST_PORT}`;
    this.baseUrl = `${this.domain}${basePath}`;
    this.suppressWarnings = false;
  }

  get requestHistory() {
    return this.#requestHistory;
  }

  async setup(page) {
    await page.setRequestInterception(true);
    page.on('request', this.#handleRequest.bind(this));
  }

  reset() {
    this.#requestHistory = [];
    this.#temporaryOverrides.clear();
  }

  setOverride(path, response) {
    this.#overrides.set(sanitizeHref(this.baseUrl + path), response);
  }

  setTemporaryOverride(path, response) {
    this.#temporaryOverrides.set(sanitizeHref(this.baseUrl + path), response);
  }

  getRequestCount(path) {
    console.log(this.requestHistory.map(n => n.path));
    path = sanitizeHref(path);
    return this.requestHistory.filter(entry => entry.path === path).length;
  }

  #resolveOverride(href) {
    href = sanitizeHref(href);
    return this.#temporaryOverrides.get(href) ?? this.#overrides.get(href);
  }

  #handleRequest(interceptedRequest) {
    if (interceptedRequest.isInterceptResolutionHandled()) {
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
