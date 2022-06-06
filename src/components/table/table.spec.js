import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: table', () => {
  describe('variant: scrollable', () => {
    // Construct a table with 15 columns and 15 rows with long labels.
    const params = {
      variants: ['scrollable'],
      ths: Array.from({ length: 15 }, (_, i) => ({ value: `Column ${i + 1}` })),
      trs: [
        {
          tds: Array.from({ length: 15 }, (_, i) => ({ value: `Business Register and Employment Survey ${i + 1}` })),
        },
      ],
    };

    beforeEach(async () => {
      await setTestPage('/test', renderComponent('table', params));
    });

    it('should add shadow elements', async () => {
      const leftShadowCount = await page.$$eval('.ons-table__left-shadow', nodes => nodes.length);
      expect(leftShadowCount).not.toBe(0);
      const rightShadowCount = await page.$$eval('.ons-table__right-shadow', nodes => nodes.length);
      expect(rightShadowCount).not.toBe(0);
    });

    describe('When the table component is scrolled,', () => {
      beforeEach(async () => {
        await page.focus('.ons-table-scrollable__content');
        await page.keyboard.press('ArrowRight');
      });

      it('should show both shadow elements', async () => {
        await page.waitForTimeout(200);

        const leftShadowVisibleCount = await page.$$eval('.ons-table__left-shadow.ons-visible', nodes => nodes.length);
        expect(leftShadowVisibleCount).not.toBe(0);
        const rightShadowVisibleCount = await page.$$eval('.ons-table__right-shadow.ons-visible', nodes => nodes.length);
        expect(rightShadowVisibleCount).not.toBe(0);
      });
    });
  });

  describe('variant: sortable', () => {
    const params = {
      variants: ['sortable'],
      sortBy: 'Sort by',
      ariaAsc: 'ascending',
      ariaDesc: 'descending',
      ths: [
        { value: 'Column 1', ariaSort: 'none' },
        { value: 'Column 2', ariaSort: 'none' },
        { value: 'Column 3', ariaSort: 'none' },
        { value: 'Column 4', ariaSort: 'none' },
      ],
      trs: [
        {
          tds: [
            { value: 'A', dataSort: '1' },
            { value: 'A', dataSort: '4' },
            { value: 'A', dataSort: '0' },
            { value: 'A', dataSort: '2' },
          ],
        },
        {
          tds: [
            { value: 'B', dataSort: '2' },
            { value: 'B', dataSort: '4' },
            { value: 'B', dataSort: '0' },
            { value: 'B', dataSort: '2' },
          ],
        },
        {
          tds: [
            { value: 'C', dataSort: '3' },
            { value: 'C', dataSort: '4' },
            { value: 'C', dataSort: '0' },
            { value: 'C', dataSort: '2' },
          ],
        },
      ],
    };

    beforeEach(async () => {
      await setTestPage('/test', renderComponent('table', params));
    });

    it('should create a button element in each TH', async () => {
      const buttonCount = await page.$$eval('.ons-table__header .ons-table__sort-button', nodes => nodes.length);
      expect(buttonCount).toBe(4);
    });

    it('should create a status element with aria attributes', async () => {
      const ariaLiveAttribute = await page.$eval('.ons-sortable-table-status', node => node.getAttribute('aria-live'));
      expect(ariaLiveAttribute).toBe('polite');
      const roleAttribute = await page.$eval('.ons-sortable-table-status', node => node.getAttribute('role'));
      expect(roleAttribute).toBe('status');
      const ariaAtomicAttribute = await page.$eval('.ons-sortable-table-status', node => node.getAttribute('aria-atomic'));
      expect(ariaAtomicAttribute).toBe('true');
    });

    describe('Each sort button element', () => {
      it('should contain an aria-label attribute', async () => {
        const ariaLabelValues = await page.$$eval('.ons-table__sort-button', nodes => nodes.map(node => node.getAttribute('aria-label')));
        expect(ariaLabelValues).toEqual(['Sort by Column 1', 'Sort by Column 2', 'Sort by Column 3', 'Sort by Column 4']);
      });

      it('should contain a data-index attribute', async () => {
        const dataIndexValues = await page.$$eval('.ons-table__sort-button', nodes => nodes.map(node => node.getAttribute('data-index')));
        expect(dataIndexValues).toEqual(['0', '1', '2', '3']);
      });
    });

    describe('When a sort button is clicked', () => {
      beforeEach(async () => {
        await page.click('.ons-table__header:nth-child(1) .ons-table__sort-button');
      });

      it('should update aria-sort value for each column header', async () => {
        const ariaSortValues = await page.$$eval('.ons-table__header', nodes => nodes.map(node => node.getAttribute('aria-sort')));
        expect(ariaSortValues).toEqual(['descending', 'none', 'none', 'none']);
      });

      it('should sort the column into descending order', async () => {
        const firstColumnValues = await page.$$eval('.ons-table__row .ons-table__cell:first-child', nodes =>
          nodes.map(node => node.textContent.trim()),
        );
        expect(firstColumnValues).toEqual(['C', 'B', 'A']);
      });

      it('should update the aria-live status', async () => {
        const statusText = await page.$eval('.ons-sortable-table-status', node => node.textContent);
        expect(statusText).toBe('Sort by Column 1 (descending)');
      });

      describe('When a sort button is clicked again', () => {
        beforeEach(async () => {
          await page.click('.ons-table__header:nth-child(1) .ons-table__sort-button');
        });

        it('should update aria-sort value for each column header', async () => {
          const ariaSortValues = await page.$$eval('.ons-table__header', nodes => nodes.map(node => node.getAttribute('aria-sort')));
          expect(ariaSortValues).toEqual(['ascending', 'none', 'none', 'none']);
        });

        it('should sort the column into ascending order', async () => {
          const firstColumnValues = await page.$$eval('.ons-table__row .ons-table__cell:first-child', nodes =>
            nodes.map(node => node.textContent.trim()),
          );
          expect(firstColumnValues).toEqual(['A', 'B', 'C']);
        });
      });
    });
  });
});
