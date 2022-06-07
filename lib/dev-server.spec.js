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
});
