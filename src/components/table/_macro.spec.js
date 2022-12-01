/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TABLE_MINIMAL = {
  ths: [],
  trs: [],
};

const EXAMPLE_TABLE = {
  ...EXAMPLE_TABLE_MINIMAL,
  ths: [{ value: 'Column 1' }, { value: 'Column 2' }, { value: 'Column 3' }],
  trs: [
    {
      tds: [{ value: 'Row 1 Cell 1' }, { value: 'Row 1 Cell 2' }, { value: 'Row 1 Cell 3' }],
    },
    {
      tds: [{ value: 'Row 2 Cell 1' }, { value: 'Row 2 Cell 2' }, { value: 'Row 2 Cell 3' }],
    },
  ],
};

describe('macro: table', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('table', {
        ...EXAMPLE_TABLE,
        id: 'example-table',
      }),
    );

    expect($('.ons-table').attr('id')).toBe('example-table');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('table', {
        ...EXAMPLE_TABLE,
        tableClasses: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-table').hasClass('extra-class')).toBe(true);
    expect($('.ons-table').hasClass('another-extra-class')).toBe(true);
  });

  describe('header row', () => {
    it('renders header cells with expected text', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      const headerCellValues = mapAll($('.ons-table__header'), node => node.text().trim());
      expect(headerCellValues).toEqual(['Column 1', 'Column 2', 'Column 3']);
    });

    it('adds additionally provided class to column header', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          ths: [
            {
              value: 'Column 1',
              thClasses: 'extra-column-class another-extra-column-class',
            },
          ],
        }),
      );

      expect($('.ons-table__header').hasClass('extra-column-class')).toBe(true);
      expect($('.ons-table__header').hasClass('another-extra-column-class')).toBe(true);
    });

    it('does not add "numeric" modifier class to column header when `td.numeric` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__header').hasClass('ons-table__header--numeric')).toBe(false);
    });

    it('adds "numeric" modifier class to column header when `th.numeric` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          ths: [
            {
              value: 'Column 1',
              numeric: true,
            },
          ],
        }),
      );

      expect($('.ons-table__header').hasClass('ons-table__header--numeric')).toBe(true);
    });

    it('does not add visually hidden class to column headers', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      const hasClass = mapAll($('.ons-table__header > span'), node => node.hasClass('ons-u-vh'));
      expect(hasClass).toEqual([false, false, false]);
    });

    it('does not render "sort-sprite" icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('table', EXAMPLE_TABLE);

      expect(iconsSpy.occurrences.length).toBe(0);
    });
  });

  describe('row', () => {
    it('renders expected row cells', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      const row1Values = mapAll($('.ons-table__row:nth-child(1) .ons-table__cell'), node => node.text().trim());
      expect(row1Values).toEqual(['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3']);
      const row2Values = mapAll($('.ons-table__row:nth-child(2) .ons-table__cell'), node => node.text().trim());
      expect(row2Values).toEqual(['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']);
    });

    it('does not render `id` attribute on a cell when `id` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__cell').attr('id')).toBeUndefined();
    });

    it('renders provided `id` attribute on a cell', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [
                {
                  id: 'example-cell',
                  value: 'Example Cell',
                },
              ],
            },
          ],
        }),
      );

      expect($('.ons-table__cell').attr('id')).toBe('example-cell');
    });

    it('does not render `data-th` attribute on a cell when `data` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__cell').attr('data-th')).toBeUndefined();
    });

    it('renders `data-th` attribute on a cell when `data` is provided', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [
                {
                  value: 'Example Cell',
                  data: '123',
                },
              ],
            },
          ],
        }),
      );

      expect($('.ons-table__cell').attr('data-th')).toBe('123');
    });

    it('does not render `data-sort-value` attribute on a cell when `dataSort` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__cell').attr('data-sort-value')).toBeUndefined();
    });

    it('renders `data-sort-value` attribute on a cell when `dataSort` is provided', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [
                {
                  value: 'Example Cell',
                  dataSort: 42,
                },
              ],
            },
          ],
        }),
      );

      expect($('.ons-table__cell').attr('data-sort-value')).toBe('42');
    });

    it('does not add highlight class to row when `highlight` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__row').hasClass('ons-table__row--highlight')).toBe(false);
    });

    it('adds highlight class to row when `highlight` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [{ value: 'Row 1 Cell 1' }, { value: 'Row 1 Cell 2' }, { value: 'Row 1 Cell 3' }],
              highlight: true,
            },
          ],
        }),
      );

      expect($('.ons-table__row').hasClass('ons-table__row--highlight')).toBe(true);
    });

    it('adds additionally provided class to cell', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [
                {
                  value: 'Column 1',
                  tdClasses: 'extra-cell-class another-extra-cell-class',
                },
              ],
            },
          ],
        }),
      );

      expect($('.ons-table__cell').hasClass('extra-cell-class')).toBe(true);
      expect($('.ons-table__cell').hasClass('another-extra-cell-class')).toBe(true);
    });

    it('does not add "numeric" modifier class to cell when `td.numeric` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__cell').hasClass('ons-table__cell--numeric')).toBe(false);
    });

    it('adds "numeric" modifier class to cell when `td.numeric` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          trs: [
            {
              tds: [
                {
                  value: 'Column 1',
                  numeric: true,
                },
              ],
            },
          ],
        }),
      );

      expect($('.ons-table__cell').hasClass('ons-table__cell--numeric')).toBe(true);
    });

    describe('form', () => {
      const params = {
        ...EXAMPLE_TABLE,
        trs: [
          {
            tds: [
              {
                form: {
                  action: 'https://example.com/form',
                  button: {
                    text: 'Submit form',
                    id: 'submit-form-button',
                    classes: 'custom-button-class',
                    url: 'https://example.com/link',
                    value: '42',
                    name: 'submit-form-button-name',
                  },
                  hiddenFormField: {
                    name: 'example-hidden-field-name',
                    value: '123',
                  },
                },
              },
            ],
          },
        ],
      };

      it('does not render form section when `form` is not provided', () => {
        const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

        expect($('form').length).toBe(0);
      });

      it('renders form section when `form` is provided', () => {
        const $ = cheerio.load(renderComponent('table', params));

        expect($('form').length).toBe(1);
      });

      it('renders the provided `action` attribute', () => {
        const $ = cheerio.load(renderComponent('table', params));

        expect($('form').attr('action')).toBe('https://example.com/form');
      });

      it('renders a default value of "POST" for the `method` attribute', () => {
        const $ = cheerio.load(renderComponent('table', params));

        expect($('form').attr('method')).toBe('POST');
      });

      it('renders the provided `method` attribute', () => {
        const $ = cheerio.load(
          renderComponent('table', {
            ...EXAMPLE_TABLE,
            trs: [
              {
                tds: [
                  {
                    form: {
                      ...params.trs[0].tds[0].form,
                      method: 'PUT',
                    },
                  },
                ],
              },
            ],
          }),
        );

        expect($('form').attr('method')).toBe('PUT');
      });

      it('renders `button` component with the expected parameters', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('table', params);

        expect(buttonSpy.occurrences).toEqual([
          {
            text: 'Submit form',
            id: 'submit-form-button',
            classes: 'custom-button-class',
            url: 'https://example.com/link',
            value: '42', // `| safe` filter is used in macro which makes a string
            name: 'submit-form-button-name',
          },
        ]);
      });
    });
  });

  describe('footer row', () => {
    it('does not render footer section when `tfoot` is not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__foot').length).toBe(0);
    });

    it('renders footer cells with expected text', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          tfoot: [{ value: 'Footer Cell 1' }, { value: 'Footer Cell 2' }, { value: 'Footer Cell 3' }],
        }),
      );

      const footerCellValues = mapAll($('.ons-table__foot .ons-table__cell'), node => node.text().trim());
      expect(footerCellValues).toEqual(['Footer Cell 1', 'Footer Cell 2', 'Footer Cell 3']);
    });
  });

  describe('scrollable variant', () => {
    const params = {
      ...EXAMPLE_TABLE,
      variants: ['scrollable'],
      caption: 'Example table caption',
    };

    it('has the "scrollable" variant class', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table').hasClass('ons-table--scrollable')).toBe(true);
    });

    it('renders "scrollable" container element', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table-scrollable').length).toBe(1);
      expect($('.ons-table-scrollable--on').length).toBe(1);
    });

    it('renders "content" container element', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table-scrollable__content').length).toBe(1);
    });

    it('renders an appropriate `aria-label` attribute on the "content" container element', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table-scrollable__content').attr('aria-label')).toBe('Example table caption. Scrollable table');
    });

    it('renders a custom `aria-label` attribute on the "content" container element', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...params,
          ariaLabel: 'Special table',
        }),
      );

      expect($('.ons-table-scrollable__content').attr('aria-label')).toBe('Example table caption. Special table');
    });
  });

  describe('sortable variant', () => {
    const params = {
      ...EXAMPLE_TABLE,
      variants: ['sortable'],
      sortBy: 'Sort by',
      ariaAsc: 'ascending',
      ariaDesc: 'descending',
    };

    it('has the "sortable" variant class', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table').hasClass('ons-table--sortable')).toBe(true);
    });

    it('has `data-aria-sort` attribute', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table').attr('data-aria-sort')).toBe('Sort by');
    });

    it('adds `aria-sort` attribute when `ariaSort` is provided', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...params,
          ths: [
            {
              value: 'Column 1',
              ariaSort: 'ascending',
            },
          ],
        }),
      );

      expect($('.ons-table__header').attr('aria-sort')).toBe('ascending');
    });

    it('has `data-aria-asc` attribute', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table').attr('data-aria-asc')).toBe('ascending');
    });

    it('has `data-aria-desc` attribute', () => {
      const $ = cheerio.load(renderComponent('table', params));

      expect($('.ons-table').attr('data-aria-desc')).toBe('descending');
    });
  });

  describe('table caption', () => {
    it('does not render caption element when not provided', () => {
      const $ = cheerio.load(renderComponent('table', EXAMPLE_TABLE));

      expect($('.ons-table__caption').length).toBe(0);
    });

    it('renders caption element when provided', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          caption: 'Example table caption',
        }),
      );

      expect(
        $('.ons-table__caption')
          .text()
          .trim(),
      ).toBe('Example table caption');
    });

    it('does not visually hide caption when `hideCaption` is not provided', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          caption: 'Example table caption',
        }),
      );

      expect($('.ons-table__caption').hasClass('ons-u-vh')).toBe(false);
    });

    it('visually hides caption when `hideCaption` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('table', {
          ...EXAMPLE_TABLE,
          caption: 'Example table caption',
          hideCaption: true,
        }),
      );

      expect($('.ons-table__caption').hasClass('ons-u-vh')).toBe(true);
    });
  });
});
