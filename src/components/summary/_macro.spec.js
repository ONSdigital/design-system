/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SUMMARY_ROWS = {
  rows: [
    {
      // Contains - row with icon, attributes and rowTitleAttributes, other value, no action
      id: 'row-id-1',
      rowTitle: 'row title 1',
      rowItems: [
        {
          rowTitleAttributes: {
            a: 123,
            b: 456,
          },
          attributes: {
            a: 'aaa',
            b: 'bbb',
          },
          iconType: 'check',
          id: 'item-id-1',
          valueList: [
            {
              text: 'row value 1',
              other: 'other value',
            },
          ],
        },
      ],
    },
    {
      // Contains - row with error and multiple actions
      id: 'row-id-2',
      rowTitle: 'row title 2',
      error: true,
      errorMessage: 'there are errors',
      rowItems: [
        {
          id: 'item-id-2',
          valueList: [
            {
              text: 'row value 2',
            },
          ],
          actions: [
            {
              text: 'Action 1',
              ariaLabel: 'action aria label 1',
              attributes: {
                a: 'abc',
                b: 'def',
              },
              url: '#1',
            },
            {
              text: 'Action 2',
              ariaLabel: 'action aria label 2',
              url: '#2',
            },
          ],
        },
      ],
    },
    {
      // Contains - row with multiple rows and multiple values
      id: 'row-id-3',
      rowTitle: 'row title 3',
      rowItems: [
        {
          id: 'item-id-3',
          valueList: [
            {
              text: 'row value 3',
            },
            {
              text: 'row value 3b',
            },
          ],
        },
        {
          id: 'item-id-4',
          valueList: [
            {
              text: 'row value 4',
            },
          ],
        },
      ],
    },
    {
      // Contains - row with total
      id: 'row-id-4',
      rowTitle: 'row title 4',
      total: true,
      rowItems: [
        {
          id: 'item-id-5',
          valueList: [
            {
              text: '£234,000.00',
            },
          ],
        },
      ],
    },
  ],
};

const EXAMPLE_SUMMARY_GROUPS = {
  groups: [
    {
      id: 'group-id-1',
      groupTitle: 'group title',
      ...EXAMPLE_SUMMARY_ROWS,
    },
  ],
};

const EXAMPLE_SUMMARY_GROUPS_NO_ROWS = {
  groups: [
    {
      placeholderText: 'Placeholder text',
      summaryLink: {
        text: 'Summary link',
        url: '#0',
        attributes: {
          a: 'xyz',
        },
      },
    },
  ],
};

const EXAMPLE_SUMMARY_HOUSEHOLD_GROUP = {
  rows: [
    {
      rowItems: [
        {
          rowTitle: 'row item 1',
          valueList: [
            {
              text: 'list item 1',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Change list item',
              url: '#0',
            },
            {
              text: 'Remove',
              ariaLabel: 'Remove list item',
              url: '#0',
            },
          ],
        },
        {
          rowTitle: 'row item 2',
          valueList: [
            {
              text: 'list item 2',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Remove list item',
              url: '#0',
            },
          ],
        },
        {
          rowTitle: 'row item 3',
          valueList: [
            {
              text: 'list item 3',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Change list item',
              url: '#0',
            },
          ],
        },
      ],
    },
    {
      rowItems: [
        {
          rowTitle: 'row item 4',
          valueList: [
            {
              text: 'list item 4',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Change answer',
              url: '#0',
            },
            {
              text: 'Remove',
              ariaLabel: 'Change list item',
              url: '#0',
            },
          ],
        },
        {
          rowTitle: 'row item 5',
          valueList: [
            {
              text: 'list item 5',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Change list item',
              url: '#0',
            },
          ],
        },
        {
          rowTitle: 'row item 6',
          valueList: [
            {
              text: 'list item 6',
            },
          ],
          actions: [
            {
              text: 'Change',
              ariaLabel: 'Change list item',
              url: '#0',
            },
          ],
        },
      ],
    },
  ],
  summaryLink: {
    text: 'Summary link',
    url: '#0',
  },
};

const EXAMPLE_SUMMARY_BASIC = {
  summaries: [
    {
      ...EXAMPLE_SUMMARY_GROUPS,
    },
  ],
};

const EXAMPLE_SUMMARY_WITH_TITLE = {
  summaries: [
    {
      summaryTitle: 'summary title',
      ...EXAMPLE_SUMMARY_GROUPS,
    },
  ],
};

const EXAMPLE_SUMMARY_WITH_NO_ROWS = {
  summaries: [
    {
      summaryTitle: 'summary title',
      ...EXAMPLE_SUMMARY_GROUPS_NO_ROWS,
    },
  ],
};

const EXAMPLE_SUMMARY_MULTIPLE_GROUPS = {
  summaries: [
    {
      summaryTitle: 'summary title',
      groups: [
        {
          id: 'group-id-1',
          groupTitle: 'group title',
          ...EXAMPLE_SUMMARY_ROWS,
        },
        {
          id: 'group-id-2',
          groupTitle: 'group title',
          ...EXAMPLE_SUMMARY_HOUSEHOLD_GROUP,
        },
        {
          id: 'group-id-3',
          groupTitle: 'group title',
          ...EXAMPLE_SUMMARY_ROWS,
        },
      ],
    },
  ],
};

describe('macro: summary', () => {
  describe('mode: general', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has custom classes applied', () => {
      const $ = cheerio.load(
        renderComponent('summary', {
          ...EXAMPLE_SUMMARY_BASIC,
          classes: 'ons-custom-class',
        }),
      );

      expect($('.ons-summary').hasClass('ons-custom-class')).toBe(true);
    });

    describe('part: group', () => {
      it('has the correct group `id`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('#group-id-1').length).toBe(1);
      });

      it('has the correct `groupTitle` tag', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__group-title')[0].tagName).toBe('h2');
      });

      it('has the `groupTitle` text', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__group-title').text()).toBe('group title');
      });

      it('has larger margin between groups if the top one is a household style summary', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_MULTIPLE_GROUPS));

        expect($('.ons-summary__group:nth-last-of-type(2) .ons-summary__link').hasClass('ons-u-mb-xl')).toBe(true);
      });
    });

    describe('part: row', () => {
      it('has the correct row class when `error` is `true`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(2)').hasClass('ons-summary__item--error')).toBe(true);
      });

      it('has the correct row class when `total` is `true`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(4)').hasClass('ons-summary__item--total')).toBe(true);
      });

      it('displays the `rowTitle` text', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(3) .ons-summary__row-title').text()).toBe('row title 3');
      });

      it('overrides the `rowTitle` with the `errorMessage` if provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__row-title--error').text()).toBe('there are errors');
      });

      it('has the correct row `id` for each row', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('#row-id-1').length).toBe(1);
        expect($('#row-id-2').length).toBe(1);
        expect($('#row-id-3').length).toBe(1);
      });

      it('has the correct class for each row when there is a `valueList`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__row--has-values').length).toBe(5);
      });

      it('has custom `rowTitleAttributes`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__item-title').attr('a')).toBe('123');
        expect($('.ons-summary__item-title').attr('b')).toBe('456');
      });
    });

    describe('part: item title', () => {
      it('displays the `rowTitle` text', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(1) .ons-summary__item--text')
            .text()
            .trim(),
        ).toBe('row title 1');
      });

      it('has a custom icon `iconType`', () => {
        const faker = templateFaker();
        const iconsSpy = faker.spy('icons');

        faker.renderComponent('summary', EXAMPLE_SUMMARY_BASIC);

        expect(iconsSpy.occurrences[0].iconType).toBe('check');
      });

      it('has the correct icon class when `iconType` is `check`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__item-title-icon').hasClass('ons-summary__item-title-icon--check')).toBe(true);
      });

      it('has the correct item text class when `iconType` is provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__item--text').hasClass('ons-summary__item-title--text')).toBe(true);
      });

      it('has custom `attributes`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__values').attr('a')).toBe('aaa');
        expect($('.ons-summary__values').attr('b')).toBe('bbb');
      });
    });

    describe('part: item value', () => {
      it('displays the `valueList` text', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(1) dl .ons-summary__values .ons-summary__text')
            .text()
            .trim(),
        ).toBe('row value 1');
      });

      it('displays the `other` text', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(1) dl .ons-summary__values ul li')
            .text()
            .trim(),
        ).toBe('other value');
      });

      it('wraps the `valueList` in a ul if multiple values provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(3) .ons-summary__values ul').length).toBe(1);
      });
    });

    describe('part: item action', () => {
      it('has a spacer element if multiple actions are provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__spacer').length).toBe(1);
      });

      it('has the correct `url` for each action provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr('href'),
        ).toBe('#1');
        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child').attr('href'),
        ).toBe('#2');
      });

      it('has the action `text` for each action provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').text(),
        ).toBe('Action 1');
        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child').text(),
        ).toBe('Action 2');
      });

      it('has the `aria-label` provided', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr(
            'aria-label',
          ),
        ).toBe('action aria label 1');
        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child').attr(
            'aria-label',
          ),
        ).toBe('action aria label 2');
      });

      it('has custom `attributes`', () => {
        const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr('a'),
        ).toBe('abc');
        expect(
          $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr('b'),
        ).toBe('def');
      });
    });
  });

  describe('mode: with title', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('displays the `summaryTitle`', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));

      expect($('.ons-summary__title').text()).toBe('summary title');
    });
  });

  describe('mode: hub', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('summary', {
          ...EXAMPLE_SUMMARY_BASIC,
          hub: true,
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the correct class applied', () => {
      const $ = cheerio.load(
        renderComponent('summary', {
          ...EXAMPLE_SUMMARY_BASIC,
          hub: true,
        }),
      );

      expect($('.ons-summary').hasClass('ons-summary--hub')).toBe(true);
    });

    it('has the value rendered after the `rowTitle` that shows on mobile', () => {
      const $ = cheerio.load(
        renderComponent('summary', {
          ...EXAMPLE_SUMMARY_BASIC,
          hub: true,
        }),
      );

      expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__row .ons-summary__item-title span').text()).toBe(
        ' — row value 2',
      );
    });
  });

  describe('mode: no rows', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the `placeholderText` provided', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      expect($('.ons-summary__group .ons-summary__placeholder').text()).toBe('Placeholder text');
    });

    it('has the correct class added to the `summaryLink` when `placeholderText` is provided', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      expect($('.ons-summary__group .ons-summary__link').hasClass('ons-u-pt-s')).toBe(true);
    });

    it('has custom `attributes` on the `summaryLink`', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      expect($('.ons-summary__group .ons-summary__link a').attr('a')).toBe('xyz');
    });

    it('has the correct link `text`', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      expect(
        $('.ons-summary__group .ons-summary__link a')
          .text()
          .trim(),
      ).toBe('Summary link');
    });

    it('has the correct link `url`', () => {
      const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

      expect($('.ons-summary__group .ons-summary__link a').attr('href')).toBe('#0');
    });
  });
});
