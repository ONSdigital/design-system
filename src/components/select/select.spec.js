import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_LANGUAGE_FILTER_PAGE = `
  <div class="ons-js-language-filter">
    ${renderComponent('select', {
      classes: 'ons-js-language-filter__select',
      id: 'language-filter-select',
      options: [
        {
          text: 'Native language',
          value: 'language-native',
        },
        {
          text: 'English',
          value: 'language-english',
        },
      ],
    })}
    <div class="ons-js-language-filter__content" id="language-native"></div>
    <div class="ons-js-language-filter__content ons-u-hidden" id="language-english"></div>
  </div>
`;

describe('script: select', () => {
  beforeEach(async () => {
    await setTestPage('/test', EXAMPLE_LANGUAGE_FILTER_PAGE);
  });

  describe('language filter page with multiple views', () => {
    it('shows first view by default', async () => {
      const isFirstHidden = await page.$eval('#language-native', node => node.classList.contains('ons-u-hidden'));
      expect(isFirstHidden).toBe(false);
      const isSecondHidden = await page.$eval('#language-english', node => node.classList.contains('ons-u-hidden'));
      expect(isSecondHidden).toBe(true);
    });

    it('shows second view when selection is changed to the second item', async () => {
      await page.select('#language-filter-select', 'language-english');

      const isFirstHidden = await page.$eval('#language-native', node => node.classList.contains('ons-u-hidden'));
      expect(isFirstHidden).toBe(true);
      const isSecondHidden = await page.$eval('#language-english', node => node.classList.contains('ons-u-hidden'));
      expect(isSecondHidden).toBe(false);
    });

    it('shows first view when selection is changed back to the first item', async () => {
      await page.select('#language-filter-select', 'language-english');
      await page.select('#language-filter-select', 'language-native');

      const isFirstHidden = await page.$eval('#language-native', node => node.classList.contains('ons-u-hidden'));
      expect(isFirstHidden).toBe(false);
      const isSecondHidden = await page.$eval('#language-english', node => node.classList.contains('ons-u-hidden'));
      expect(isSecondHidden).toBe(true);
    });
  });
});
