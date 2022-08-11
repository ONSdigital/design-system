/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_LIST_TEXT_ITEMS = {
  itemsList: [{ text: 'First item' }, { text: 'Second item' }],
};

const EXAMPLE_ITEM_TEXT = {
  text: 'Text item with <strong>markup</strong>',
};

const EXAMPLE_ITEM_ARTICLE_TITLE = {
  title: 'Article title',
};

const EXAMPLE_ITEM_NAVIGATION_TITLE = {
  title: 'Long article title',
  navigationTitle: 'Nav friendly title',
};

describe('macro: lists', () => {
  describe('list element', () => {
    it('has `id` attribute when provided', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          id: 'example-id',
        }),
      );

      expect($('.ons-list').attr('id')).toBe('example-id');
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('.ons-list').hasClass('extra-class')).toBe(true);
      expect($('.ons-list').hasClass('another-extra-class')).toBe(true);
    });

    it('has provided variant style class when one variant is provided', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          variants: 'dashed',
        }),
      );

      expect($('.ons-list').hasClass('ons-list--dashed')).toBe(true);
    });

    it('has provided variant style classes when multiple variants are provided', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          variants: ['dashed', 'inline'],
        }),
      );

      expect($('.ons-list').hasClass('ons-list--dashed')).toBe(true);
      expect($('.ons-list').hasClass('ons-list--inline')).toBe(true);
    });

    it('assumes the "bare" variant with a prefix modifier class when the first list item has a prefix', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [{ text: 'Item text', prefix: 'Abc' }],
        }),
      );

      expect($('.ons-list').hasClass('ons-list--bare')).toBe(true);
      expect($('.ons-list').hasClass('ons-list--prefix')).toBe(true);
    });

    it('assumes the "bare" variant with a suffix modifier class when the first list item has a suffix', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [{ text: 'Item text', suffix: 'Abc' }],
        }),
      );

      expect($('.ons-list').hasClass('ons-list--bare')).toBe(true);
      expect($('.ons-list').hasClass('ons-list--suffix')).toBe(true);
    });

    it('assumes the "bare" variant with a icons modifier class when the first list item has an icon', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          iconPosition: 'before',
          iconType: 'check',
        }),
      );

      expect($('.ons-list').hasClass('ons-list--bare')).toBe(true);
      expect($('.ons-list').hasClass('ons-list--icons')).toBe(true);
    });

    it('renders a <ul> element by default', () => {
      const $ = cheerio.load(renderComponent('lists', EXAMPLE_LIST_TEXT_ITEMS));

      expect($('.ons-list')[0].tagName).toBe('ul');
    });

    it('renders a custom element when a custom `element` is provided', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          element: 'div',
        }),
      );

      expect($('.ons-list')[0].tagName).toBe('div');
    });

    it('renders a <ol> element when specified', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          element: 'ol',
        }),
      );

      expect($('.ons-list')[0].tagName).toBe('ol');
    });

    it('has the expected quantity of <li> elements when a <ol> element is specified', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          element: 'ol',
        }),
      );

      expect($('.ons-list li').length).toBe(2);
    });

    describe('when <ol> is specified but there is only one list item', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          element: 'ol',
          itemsList: [{ text: 'Only item' }],
        }),
      );

      it('renders a <p> element', () => {
        expect($('.ons-list')[0].tagName).toBe('p');
      });

      it('has `ons-list--p` modifier class', () => {
        expect($('.ons-list').hasClass('ons-list--p')).toBe(true);
      });

      it('does not output any <li> elements', () => {
        expect($('.ons-list li').length).toBe(0);
      });
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          ...EXAMPLE_LIST_TEXT_ITEMS,
          attributes: {
            a: 123,
            b: 456,
          },
        }),
      );

      expect($('.ons-list').attr('a')).toBe('123');
      expect($('.ons-list').attr('b')).toBe('456');
    });
  });

  describe.each([
    ['text', EXAMPLE_ITEM_TEXT, 'Text item with <strong>markup</strong>'],
    ['article title', EXAMPLE_ITEM_ARTICLE_TITLE, 'Article title'],
    ['navigation title', EXAMPLE_ITEM_NAVIGATION_TITLE, 'Nav friendly title'],
  ])('with %s', (_, item, expectedItemText) => {
    describe('content without link', () => {
      it('passes jest-axe checks', async () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [item],
          }),
        );

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
      });

      it('renders the expected list item text', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [item],
          }),
        );

        expect($.html()).toContain(expectedItemText);
      });

      it('does not render a hyperlink element', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [item],
          }),
        );

        expect($('a').length).toBe(0);
      });
    });

    describe('content with an internal link', () => {
      it('passes jest-axe checks', async () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
              },
            ],
          }),
        );

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
      });

      it('renders a hyperlink element', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
              },
            ],
          }),
        );

        expect($('.ons-list__link').is('a')).toBe(true);
        expect($('.ons-list__link').attr('href')).toBe('/internal-link');
      });

      it('does not render a hyperlink element for current item', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                current: true,
              },
            ],
          }),
        );

        expect($('a').length).toBe(0);
      });

      it('supports the `inPageLink` variant', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                variants: 'inPageLink',
              },
            ],
          }),
        );

        expect($('.ons-list__link').hasClass('ons-js-inpagelink')).toBe(true);
      });

      it('has additionally provided style classes', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                classes: 'extra-class another-extra-class',
              },
            ],
          }),
        );

        expect($('.ons-list__link').hasClass('extra-class')).toBe(true);
        expect($('.ons-list__link').hasClass('another-extra-class')).toBe(true);
      });

      it('has the provided `target` attribute', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                target: '_blank',
              },
            ],
          }),
        );

        expect($('.ons-list__link').attr('target')).toBe('_blank');
      });

      it('renders visually hidden screen reader message when target is "_blank"', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                target: '_blank',
                screenreaderMessage: 'opens in a new tab',
              },
            ],
          }),
        );

        expect($('.ons-list__link .ons-u-vh').text()).toBe(' (opens in a new tab)');
      });

      it('renders a default visually hidden screen reader message when target is "_blank"', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                target: '_blank',
              },
            ],
          }),
        );

        expect($('.ons-list__link .ons-u-vh').text()).toBe(' (opens in a new tab)');
      });

      it('has additionally provided `attributes`', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                attributes: {
                  a: 123,
                  b: 456,
                },
              },
            ],
          }),
        );

        expect($('.ons-list__link').attr('a')).toBe('123');
        expect($('.ons-list__link').attr('b')).toBe('456');
      });

      it('renders visually hidden prefix', () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: '/internal-link',
                prefix: 'item prefix',
              },
            ],
          }),
        );

        expect($('.ons-list__link .ons-u-vh').text()).toBe('item prefix');
      });
    });

    describe('content with an external link', () => {
      it('passes jest-axe checks', async () => {
        const $ = cheerio.load(
          renderComponent('lists', {
            itemsList: [
              {
                ...item,
                url: 'https://example.com/external-link',
                external: true,
              },
            ],
          }),
        );

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
      });

      it('uses the `external-link` component to render external links', () => {
        const faker = templateFaker();
        const externalLinkSpy = faker.spy('external-link');

        faker.renderComponent('lists', {
          itemsList: [
            {
              ...item,
              url: 'https://example.com/external-link',
              external: true,
            },
          ],
        });

        expect(externalLinkSpy.occurrences[0]).toEqual({
          url: 'https://example.com/external-link',
          linkText: expectedItemText,
        });
      });

      it('does not use the `external-link` component to render the current item', () => {
        const faker = templateFaker();
        const externalLinkSpy = faker.spy('external-link');

        faker.renderComponent('lists', {
          itemsList: [
            {
              ...item,
              url: 'https://example.com/external-link',
              external: true,
              current: true,
            },
          ],
        });

        expect(externalLinkSpy.occurrences.length).toBe(0);
      });
    });
  });

  describe('prefix', () => {
    it('renders item `prefix` content', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [
            {
              prefix: '[PREFIX]',
              text: 'Item text',
            },
          ],
        }),
      );

      expect(
        $('.ons-list__prefix')
          .text()
          .trim(),
      ).toBe('[PREFIX].');
    });

    it('marks `prefix` content as visually hidden when list element is not <ol>', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [
            {
              prefix: '[PREFIX]',
              text: 'Item text',
            },
          ],
        }),
      );

      expect($('.ons-list__prefix').attr('aria-hidden')).toBe('true');
    });

    it('does not mark `prefix` content as visually hidden when list element is <ol>', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          element: 'ol',
          itemsList: [
            {
              prefix: '[PREFIX]',
              text: 'Item text 1',
            },
            {
              prefix: '[PREFIX]',
              text: 'Item text 2',
            },
          ],
        }),
      );

      expect($('.ons-list__prefix').attr('aria-hidden')).toBeUndefined();
    });
  });

  describe('suffix', () => {
    it('renders item `suffix` content', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [
            {
              suffix: '[SUFFIX]',
              text: 'Item text',
            },
          ],
        }),
      );

      expect(
        $('.ons-list__suffix')
          .text()
          .trim(),
      ).toBe('[SUFFIX]');
    });

    it('marks `suffix` content as visually hidden when list element is not <ol>', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [
            {
              suffix: '[SUFFIX]',
              text: 'Item text',
            },
          ],
        }),
      );

      expect($('.ons-list__suffix').attr('aria-hidden')).toBe('true');
    });

    it('does not mark `suffix` content as visually hidden when list element is <ol>', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          element: 'ol',
          itemsList: [
            {
              suffix: '[SUFFIX]',
              text: 'Item text 1',
            },
            {
              suffix: '[SUFFIX]',
              text: 'Item text 2',
            },
          ],
        }),
      );

      expect($('.ons-list__suffix').attr('aria-hidden')).toBeUndefined();
    });
  });

  describe('icons', () => {
    it.each([['before'], ['after']])('renders default icon on list items when icon is positioned %s', iconPosition => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('lists', {
        ...EXAMPLE_LIST_TEXT_ITEMS,
        iconPosition,
        iconType: 'check',
        iconSize: 'xl',
      });

      expect(iconsSpy.occurrences[0]).toEqual({ iconType: 'check', iconSize: 'xl' });
      expect(iconsSpy.occurrences[1]).toEqual({ iconType: 'check', iconSize: 'xl' });
    });

    it.each([['before'], ['after']])('renders a custom icon on specific list items when icon is positioned %s', iconPosition => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('lists', {
        itemsList: [{ text: 'First item' }, { text: 'Second item', iconType: 'print' }, { text: 'Third item' }],
        iconPosition,
        iconType: 'check',
        iconSize: 'xxl',
      });

      expect(iconsSpy.occurrences[0]).toEqual({ iconType: 'check', iconSize: 'xxl' });
      expect(iconsSpy.occurrences[1]).toEqual({ iconType: 'print', iconSize: 'xxl' });
      expect(iconsSpy.occurrences[2]).toEqual({ iconType: 'check', iconSize: 'xxl' });
    });

    it('renders the icon before the item text', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [{ text: '<span id="first">First item</span>' }, { text: '<span id="second">Second item</span>' }],
          iconPosition: 'before',
          iconType: 'check',
          iconSize: 'xl',
        }),
      );

      expect($('.ons-list__prefix + #first').length).toBe(1);
    });

    it('renders the icon after the item text', () => {
      const $ = cheerio.load(
        renderComponent('lists', {
          itemsList: [{ text: '<span id="first">First item</span>' }, { text: '<span id="second">Second item</span>' }],
          iconPosition: 'after',
          iconType: 'check',
          iconSize: 'xl',
        }),
      );

      expect($('#first + .ons-list__suffix').length).toBe(1);
    });
  });
});
