import url from 'url';

import * as helper from '../../tests/helpers/fake-endpoints';

describe('getFakeJsonEndpointUrl(jsonBody, status)', () => {
  it('gets a url with an empty but successful json response', () => {
    const result = helper.getFakeJsonEndpointUrl();

    const parsedUrl = url.parse(result, true);
    expect(parsedUrl.pathname).toBe('/test/endpoint');
    expect(parsedUrl.query.status).toBe('200');
    expect(parsedUrl.query.body).toBe('{}');
  });

  it('gets a url with a custom successful json response', () => {
    const result = helper.getFakeJsonEndpointUrl({ a: 42 });

    const parsedUrl = url.parse(result, true);
    expect(parsedUrl.pathname).toBe('/test/endpoint');
    expect(parsedUrl.query.status).toBe('200');
    expect(parsedUrl.query.body).toBe('{"a":42}');
  });

  it.each([
    [200, '200'],
    [400, '400'],
    [403, '403'],
  ])('gets a url with a custom json response with specified status %d', (status, expectedQueryStatus) => {
    const result = helper.getFakeJsonEndpointUrl({ a: 42, b: 'hello' }, status);

    const parsedUrl = url.parse(result, true);
    expect(parsedUrl.pathname).toBe('/test/endpoint');
    expect(parsedUrl.query.status).toBe(expectedQueryStatus);
    expect(parsedUrl.query.body).toBe('{"a":42,"b":"hello"}');
  });
});
