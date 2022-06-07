import { gotoTestPath } from '../src/tests/helpers/rendering';

describe('dev-server', () => {
  describe('/test/fake/{FAKE_PATH}', () => {
    it.each([['/test/fake'], ['/test/fake/'], ['/test/fake/abc'], ['/test/fake/abc/'], ['/test/fake/abc/def']])(
      'returns empty object for any fake request path',
      async path => {
        await page.goto(`http://localhost:${process.env.TEST_PORT}${path}`);

        const body = await page.$eval('body', node => node.textContent);
        expect(body).toBe('{}');
      },
    );
  });

  describe('/test/endpoint?status={STATUS}&body={JSON_BODY}', () => {
    it.each([[200], [400], [403]])('has specified response status code', async statusCode => {
      const response = await gotoTestPath(`/test/endpoint?status=${statusCode}&body={}`);

      expect(response.status()).toBe(statusCode);
    });

    it.each([
      ['{}', {}],
      ['{"a":42}', { a: 42 }],
      ['{"a":42,"b":"hello"}', { a: 42, b: 'hello' }],
      ['null', null],
    ])('has the given json body', async (requestBody, expectedJson) => {
      const response = await gotoTestPath(`/test/endpoint?status=200&body=${requestBody}`);

      expect(await response.json()).toEqual(expectedJson);
    });
  });
});
