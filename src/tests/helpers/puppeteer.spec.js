import * as puppeteer from '../../tests/helpers/puppeteer';

import { setTestPage } from '../../tests/helpers/rendering';

describe('getNodeAttributes(page, selector)', () => {
  it('gets an empty object when the target element has no attributes', async () => {
    await setTestPage('/test', `<strong>Test</strong>`);

    const attributes = await puppeteer.getNodeAttributes(page, 'strong');

    expect(attributes).toEqual({});
  });

  it('gets all attributes of the target element', async () => {
    await setTestPage('/test', `<strong id="test-id" aria-label="Test Label" data-test="123">Test</strong>`);

    const attributes = await puppeteer.getNodeAttributes(page, 'strong');

    expect(attributes).toEqual({
      id: 'test-id',
      'aria-label': 'Test Label',
      'data-test': '123',
    });
  });
});

describe('PuppeteerEndpointFaker', () => {
  const apiFaker = new puppeteer.PuppeteerEndpointFaker('/test/fake/api');

  // Suppress warnings since these tests will intentionally trigger them.
  apiFaker.suppressWarnings = true;

  beforeAll(async () => {
    await apiFaker.setup(page);

    apiFaker.setOverride('/test/fake/api/text?abc=123', {
      body: '<div>123</div>',
    });
    apiFaker.setOverride('/test/fake/api/json?abc=456', {
      data: { value: 456 },
    });
  });

  beforeEach(async () => {
    apiFaker.reset();
  });

  const TEST_HTML_REQUEST_DATA_FROM_ENDPOINT = `
    <div id="output"></div>
    <script>
      fetch('/test/fake/api/json/abc')
        .then(async (response) => {
          const data = await response.json();
          const el = document.getElementById('output');
          el.innerHTML = response.status + ':' + data.value;
          el.classList.add('test');
        });
    </script>
  `;

  describe('get requestHistory()', () => {
    it('has faked requests in history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
            fetch('/test/fake/api/json?abc=456');
          </script>
        `,
      );

      const paths = apiFaker.requestHistory.map(entry => entry.path);
      expect(paths).toEqual(['/text?abc=123', '/json?abc=456']);
    });

    it('includes non-faked requests in history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
            fetch('/test/fake/api/text?abc=789');
            fetch('/test/fake/api/other');
            fetch('/test/fake/api/json?abc=456');
          </script>
        `,
      );

      const paths = apiFaker.requestHistory.map(entry => entry.path);
      expect(paths).toEqual(['/text?abc=123', '/text?abc=789', '/other', '/json?abc=456']);
    });

    it('does not include requests outside api domain in history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
            fetch('/test');
            fetch('/test/fake/api/json?abc=456');
          </script>
        `,
      );

      const paths = apiFaker.requestHistory.map(entry => entry.path);
      expect(paths).toEqual(['/text?abc=123', '/json?abc=456']);
    });

    it('includes full url in history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
          </script>
        `,
      );

      const entry = apiFaker.requestHistory.find(entry => entry.path === '/text?abc=123');
      expect(entry.url.href).toBe(`http://localhost:${process.env.TEST_PORT}/test/fake/api/text?abc=123`);
    });

    it('includes request headers in history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123', {
              headers: {
                'foo': '123',
              }
            });
          </script>
        `,
      );

      const entry = apiFaker.requestHistory.find(entry => entry.path === '/text?abc=123');
      expect(entry.headers).toHaveProperty('foo', '123');
    });
  });

  describe('reset()', () => {
    it('clears the history', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
            fetch('/test/fake/api/json?abc=456');
          </script>
        `,
      );
      apiFaker.reset();

      expect(apiFaker.requestHistory.length).toBe(0);
    });

    it('restores base resource override', async () => {
      apiFaker.setOverride('/json/abc', {
        data: { value: 123 },
      });
      apiFaker.setTemporaryOverride('/json/abc', {
        data: { value: 456 },
      });

      apiFaker.reset();

      await setTestPage('/test', TEST_HTML_REQUEST_DATA_FROM_ENDPOINT);
      await page.waitForSelector('#output.test');

      const output = await page.$eval('#output', node => node.textContent);
      expect(output).toBe('200:123');
    });
  });

  describe('setOverride(path, response)', () => {
    it('overrides the resource', async () => {
      apiFaker.setOverride('/json/abc', {
        data: { value: 123 },
      });

      await setTestPage('/test', TEST_HTML_REQUEST_DATA_FROM_ENDPOINT);
      await page.waitForSelector('#output.test');

      const output = await page.$eval('#output', node => node.textContent);
      expect(output).toBe('200:123');
    });

    it('overrides response status code', async () => {
      apiFaker.setOverride('/json/abc', {
        status: 400,
        data: { value: 123 },
      });

      await setTestPage('/test', TEST_HTML_REQUEST_DATA_FROM_ENDPOINT);
      await page.waitForSelector('#output.test');

      const output = await page.$eval('#output', node => node.textContent);
      expect(output).toBe('400:123');
    });
  });

  describe('setOverrides(paths, response)', () => {
    it('calls `setOveride` for each provided path', () => {
      const faker = new puppeteer.PuppeteerEndpointFaker('/test/fake/api');
      const calls = [];
      faker.setOverride = (path, response) => {
        calls.push([path, response]);
      };

      faker.setOverrides(['/a', '/b'], { test: 42 });

      expect(calls).toEqual([
        ['/a', { test: 42 }],
        ['/b', { test: 42 }],
      ]);
    });
  });

  describe('setTemporaryOverride(path, response)', () => {
    it('overrides the resource and base override', async () => {
      apiFaker.setOverride('/json/abc', {
        data: { value: 123 },
      });
      apiFaker.setTemporaryOverride('/json/abc', {
        data: { value: 456 },
      });

      await setTestPage('/test', TEST_HTML_REQUEST_DATA_FROM_ENDPOINT);
      await page.waitForSelector('#output.test');

      const output = await page.$eval('#output', node => node.textContent);
      expect(output).toBe('200:456');
    });

    it('overrides response status code', async () => {
      apiFaker.setOverride('/json/abc', {
        data: { value: 123 },
      });
      apiFaker.setTemporaryOverride('/json/abc', {
        status: 400,
        data: { value: 456 },
      });

      await setTestPage('/test', TEST_HTML_REQUEST_DATA_FROM_ENDPOINT);
      await page.waitForSelector('#output.test');

      const output = await page.$eval('#output', node => node.textContent);
      expect(output).toBe('400:456');
    });
  });

  describe('setTemporaryOverrides(paths, response)', () => {
    it('calls `setTemporaryOverride` for each provided path', () => {
      const faker = new puppeteer.PuppeteerEndpointFaker('/test/fake/api');
      const calls = [];
      faker.setTemporaryOverride = (path, response) => {
        calls.push([path, response]);
      };

      faker.setTemporaryOverrides(['/a', '/b'], { test: 42 });

      expect(calls).toEqual([
        ['/a', { test: 42 }],
        ['/b', { test: 42 }],
      ]);
    });
  });

  describe('getRequestCount(path)', () => {
    it('gets the count of requests for the given path', async () => {
      await setTestPage(
        '/test',
        `
          <script>
            fetch('/test/fake/api/text?abc=123');
            fetch('/test/fake/api/json?abc=456');
            fetch('/test/fake/api/json?abc=456');
          </script>
        `,
      );

      const paths = apiFaker.requestHistory.map(entry => entry.path);
      expect(apiFaker.getRequestCount('/text?abc=123')).toBe(1);
      expect(apiFaker.getRequestCount('/json?abc=456')).toBe(2);
      expect(apiFaker.getRequestCount('/other')).toBe(0);
    });
  });
});
