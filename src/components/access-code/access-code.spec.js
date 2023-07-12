import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: access-code', () => {
  describe('Data grouping', () => {
    it('correctly formats user input with spaces', async () => {
      await setTestPage(
        '/test',
        renderComponent('access-code', {
          id: 'test-access-code',
          groupSize: 5,
        }),
      );

      await page.focus('#test-access-code');
      await page.keyboard.type('1234');

      const valueSample1 = await page.$eval('#test-access-code', element => element.value);
      expect(valueSample1).toBe('1234');

      await page.keyboard.type('5678');

      const valueSample2 = await page.$eval('#test-access-code', element => element.value);
      expect(valueSample2).toBe('12345 678');
    });
  });
});
