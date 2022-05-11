import { gotoTestPath } from '../src/tests/helpers/rendering';

describe('dev-server', () => {
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
