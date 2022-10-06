import puppeteer from 'puppeteer';

import { setViewport } from '../../tests/helpers/puppeteer';
import { renderComponent, renderTemplate, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_PAGE = `
  <div class="ons-page">
    <div class="ons-js-adv-filter">
    <div class="ons-js-adv-filter__wrap">
      ${renderComponent('button', {
        type: 'button',
        text: 'Show filters',
        classes: 'ons-adv-filter__trigger ons-js-adv-filter__trigger',
        'aria-expanded': 'false',
        'aria-controls': 'filter-panel',
      })}

      <div class="ons-adv-filter__panel ons-js-adv-filter__panel" id="filter-panel">
        <h2>Filters</h2>
        <form class="ons-js-adv-filter__form" method="POST">
          ${renderComponent('button', {
            type: 'reset',
            text: 'Reset all filters',
            classes: 'ons-adv-filter__reset ons-js-adv-filter__reset',
          })}

          <div class="ons-adv-filter__item ons-js-adv-filter__item" data-default-text="All audiences" data-multi-select-text="{n} filters selected">
            <fieldset class="ons-fieldset" aria-controls="adv-filter-gallery">
              <legend class="ons-fieldset__legend">Audience</legend>
              <div class="ons-adv-filter__selection">
                <span>Active filters: </span>
                <span class="ons-js-adv-filter__selection">All audiences</span>
              </div>
              ${renderComponent('checkboxes', {
                dontWrap: 'true',
                legend: 'Audience',
                name: 'audience',
                checkboxes: [
                  {
                    classes: 'ons-checkbox--toggle',
                    id: 'community-groups',
                    label: {
                      text: 'Community groups',
                    },
                    value: 'community-groups',
                    attributes: {
                      'data-filter': 'community-groups',
                    },
                  },
                  {
                    classes: 'ons-checkbox--toggle',
                    id: 'general-public',
                    label: {
                      text: 'General public',
                    },
                    value: 'general-public',
                    attributes: {
                      'data-filter': 'general-public',
                    },
                  },
                ],
              })}
            </fieldset>
          </div>

          <div class="ons-adv-filter__item ons-js-adv-filter__item" data-default-text="All types" data-multi-select-text="{n} filters selected">
            <fieldset class="ons-fieldset" aria-controls="adv-filter-gallery">
              <legend class="ons-fieldset__legend">Type</legend>
              <div class="ons-adv-filter__selection">
                <span>Active filters: </span>
                <span class="ons-js-adv-filter__selection">All types</span>
              </div>
              ${renderComponent('checkboxes', {
                dontWrap: 'true',
                legend: 'Type',
                name: 'type',
                checkboxes: [
                  {
                    classes: 'ons-checkbox--toggle',
                    id: 'booklet',
                    label: {
                      text: 'Booklet',
                    },
                    value: 'booklet',
                    attributes: {
                      'data-filter': 'booklet',
                    },
                  },
                  {
                    classes: 'ons-checkbox--toggle',
                    id: 'logo',
                    label: {
                      text: 'Logo',
                    },
                    value: 'logo',
                    attributes: {
                      'data-filter': 'logo',
                    },
                  },
                ],
              })}
            </fieldset>
          </div>

          <div class="ons-adv-filter__actions">
            ${renderComponent('button', {
              type: 'button',
              html: 'Show (<span class="ons-js-adv-filter__show-results">7</span> results',
              classes: 'ons-js-adv-filter__show',
            })}
            ${renderComponent('button', {
              type: 'button',
              html: 'Close',
              classes: 'ons-js-adv-filter__close',
            })}
          </div>
        </form>
        </div>
        </div>

      <div class="ons-adv-filter__results-options">
        <div class="ons-adv-filter__results-count">
          <span class="ons-js-adv-filter__results-count">9</span> results of 150
        </div>

        <div class="ons-adv-filter__results-sort">
          <label class="ons-label" for="sort">Sort by</label>
          <select class="ons-input ons-input--select" id="sort" name="sort" aria-controls="adv-filter-gallery" data-sort="true">
            <option value="index" data-sort-number="true">Latest</option>
            <option value="index" data-sort-order="desc" data-sort-number="true">Oldest</option>
          </select>
        </div>
      </div>

      ${renderComponent('document-list', {
        id: 'adv-filter-gallery',
        classes: 'ons-adv-filter__gallery ons-js-adv-filter__gallery',
        attributes: {
          'data-filter-animation': 'off',
        },
        documents: [
          {
            classes: 'ons-filter__item ons-js-filter__item',
            attributes: {
              'data-filter': 'general-public booklet',
              'data-sort-index': '1',
            },
            url: '/example-booklet-1',
            title: 'Example booklet 1',
            description: 'The first example booklet.',
          },
          {
            classes: 'ons-filter__item ons-js-filter__item',
            attributes: {
              'data-filter': 'general-public booklet logo',
              'data-sort-index': '2',
            },
            url: '/example-booklet-2',
            title: 'Example booklet 2 with logo',
            description: 'The second example booklet with a logo.',
          },
          {
            classes: 'ons-filter__item ons-js-filter__item',
            attributes: {
              'data-filter': 'logo',
              'data-sort-index': '3',
            },
            url: '/example-logo',
            title: 'Example logo',
            description: 'An example logo.',
          },
        ],
      })}

      <div class="ons-adv-filter__no-results" data-fallback-gallery-id="adv-filter-gallery">
        <h2>No results found</h2>
        <p>Try selecting different filters to get results.</p>
      </div>
    </div>
  </div>
  `;

const RENDERED_EXAMPLE_PAGE = renderTemplate(EXAMPLE_PAGE);

describe('script: download-resources', () => {
  describe('no filtering', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
    });

    it('shows all documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual([]);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['All audiences', 'All types']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('3');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('filtering one parameter where there are no results', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#community-groups');
    });

    it('hides all documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example booklet 1', 'Example booklet 2 with logo', 'Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['Community groups', 'All types']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('0');
    });

    it('shows the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(false);
    });
  });

  describe('filtering one parameter where there are results', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#general-public');
    });

    it('hides non-matching documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['General public', 'All types']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('2');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('filtering two values of the same parameter', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#booklet');
      await page.click('#logo');
    });

    it('hides non-matching documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual([]);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['All audiences', '2 filters selected']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('3');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('filtering two parameters where there are no results', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#community-groups');
      await page.click('#booklet');
    });

    it('hides all documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example booklet 1', 'Example booklet 2 with logo', 'Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['Community groups', 'Booklet']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('0');
    });

    it('shows the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(false);
    });
  });

  describe('filtering two parameters where results match both', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#general-public');
      await page.click('#booklet');
    });

    it('hides non-matching documents', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['General public', 'Booklet']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('2');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('filtering two parameters where results do not match both', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#general-public');
      await page.click('#logo');
    });

    it('hides non-matching documents ', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example booklet 1', 'Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['General public', 'Logo']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('1');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('adding and then removing a filter', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#general-public');
      await page.click('#logo');
      await page.click('#logo');
    });

    it('hides non-matching documents ', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual(['Example logo']);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['General public', 'All types']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('2');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('sorting', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
    });

    it('sorts ascending by default', async () => {
      const shownTitles = await getShownDocumentTitles(page);
      expect(shownTitles).toEqual(['Example booklet 1', 'Example booklet 2 with logo', 'Example logo']);
    });

    it('sorts descending when "sort" selection is set to "desc"', async () => {
      await page.type('#sort', 'O');

      const shownTitles = await getShownDocumentTitles(page);
      expect(shownTitles).toEqual(['Example logo', 'Example booklet 2 with logo', 'Example booklet 1']);
    });
  });

  describe('"Reset all filters" button', () => {
    beforeEach(async () => {
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
      await page.click('#general-public');
      await page.click('#logo');
      await page.click('.ons-js-adv-filter__reset');
    });

    it('resets state of all filter checkboxes ', async () => {
      const selector = '.ons-js-adv-filter__item .ons-js-checkbox';
      const checkboxStates = await page.$$eval(selector, nodes => nodes.map(node => `${node.id}: ${node.checked}`));

      expect(checkboxStates).toEqual(['community-groups: false', 'general-public: false', 'booklet: false', 'logo: false']);
    });

    it('shows all documents ', async () => {
      const hiddenTitles = await getHiddenDocumentTitles(page);
      expect(hiddenTitles).toEqual([]);
    });

    it('updates filter selection labels ', async () => {
      const filterSelectionLabels = await getFilterSelectionLabels(page);
      expect(filterSelectionLabels).toEqual(['All audiences', 'All types']);
    });

    it('updates result count text', async () => {
      const resultsCount = await page.$eval('.ons-js-adv-filter__results-count', node => node.textContent.trim());
      expect(resultsCount).toBe('3');
    });

    it('hides the "No results" content', async () => {
      const isHidden = await page.$eval('.ons-adv-filter__no-results', node => node.classList.contains('ons-u-hidden'));
      expect(isHidden).toBe(true);
    });
  });

  describe('when the viewport is large', () => {
    beforeEach(async () => {
      await setViewport(page, { width: 1650, height: 1050 });
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
    });

    afterEach(async () => {
      // Clear viewport size and browser emulation after each test.
      await jestPuppeteer.resetPage();
    });

    it('hides elements that are only needed for mobile', async () => {
      const displayStyle = await page.$eval('.ons-adv-filter__trigger', node => getComputedStyle(node).display);
      expect(displayStyle).toBe('none');
    });

    it('shows filter elements', async () => {
      const displayStyle = await page.$eval('.ons-adv-filter__panel', node => getComputedStyle(node).display);
      expect(displayStyle).not.toBe('none');
    });
  });

  describe('when the viewport is small', () => {
    beforeEach(async () => {
      await page.emulate(puppeteer.devices['iPhone X']);
      await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
    });

    afterEach(async () => {
      // Clear viewport size and browser emulation after each test.
      await jestPuppeteer.resetPage();
    });

    it('shows elements that are only needed for mobile', async () => {
      const displayStyle = await page.$eval('.ons-adv-filter__trigger', node => getComputedStyle(node).display);
      expect(displayStyle).not.toBe('none');
    });

    it('hides filter elements', async () => {
      const displayStyle = await page.$eval('.ons-adv-filter__panel', node => getComputedStyle(node).display);
      expect(displayStyle).toBe('none');
    });

    it('shows filter elements when the "Show filters" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');

      const displayStyle = await page.$eval('.ons-adv-filter__panel', node => getComputedStyle(node).display);
      expect(displayStyle).not.toBe('none');
    });

    it('hides the underlying page elements when the "Show filters" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');

      const pageIsHidden = await page.$eval('.ons-page', node => node.classList.contains('ons-u-d-no'));
      const pageIsAriaHidden = await page.$eval('.ons-page', node => node.getAttribute('aria-hidden'));

      expect(pageIsHidden).toBe(true);
      expect(pageIsAriaHidden).toBe('true');
    });

    it('hides filter elements when the "Show (n results)" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');
      await page.click('.ons-js-adv-filter__show');

      const displayStyle = await page.$eval('.ons-adv-filter__panel', node => getComputedStyle(node).display);
      expect(displayStyle).toBe('none');
    });

    it('shows the underlying page elements when the "Show (n results)" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');
      await page.click('.ons-js-adv-filter__show');

      const pageIsHidden = await page.$eval('.ons-page', node => node.classList.contains('ons-u-d-no'));
      const pageIsAriaHidden = await page.$eval('.ons-page', node => node.getAttribute('aria-hidden'));

      expect(pageIsHidden).toBe(false);
      expect(pageIsAriaHidden).toBe('false');
    });

    it('hides filter elements when the "Close" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');
      await page.click('.ons-js-adv-filter__close');

      const displayStyle = await page.$eval('.ons-adv-filter__panel', node => getComputedStyle(node).display);
      expect(displayStyle).toBe('none');
    });

    it('shows the underlying page elements when the "Close" button is pressed', async () => {
      await page.click('.ons-js-adv-filter__trigger');
      await page.click('.ons-js-adv-filter__close');

      const pageIsHidden = await page.$eval('.ons-page', node => node.classList.contains('ons-u-d-no'));
      const pageIsAriaHidden = await page.$eval('.ons-page', node => node.getAttribute('aria-hidden'));

      expect(pageIsHidden).toBe(false);
      expect(pageIsAriaHidden).toBe('false');
    });
  });
});

async function getTextContent(page, selector) {
  return await page.$$eval(selector, nodes => nodes.map(node => node.textContent.trim()));
}

async function getFilterSelectionLabels(page) {
  return await getTextContent(page, '.ons-js-adv-filter__selection');
}

async function getHiddenDocumentTitles(page) {
  return await getTextContent(page, '.ons-js-filter__item.ons-u-hidden .ons-document-list__item-title');
}

async function getShownDocumentTitles(page) {
  return await getTextContent(page, '.ons-js-filter__item:not(.ons-u-hidden) .ons-document-list__item-title');
}
