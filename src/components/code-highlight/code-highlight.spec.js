import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: code-highlight', () => {
  describe('mode: link', () => {
    it('highlights tokens in code', async () => {
      await setTestPage(
        '/test',
        renderComponent('code-highlight', {
          language: 'js',
          code: 'let a = 42;',
        }),
      );

      const tokenCount = await page.$$eval('.ons-patternlib-example__code .token', elements => elements.length);
      expect(tokenCount).toBeGreaterThanOrEqual(1);
    });
  });
});
