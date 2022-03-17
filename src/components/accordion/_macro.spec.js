import * as cheerio from 'cheerio';

import { renderComponent } from '../../tests/helpers/rendering';

const MINIMAL_ACCORDION_WITH_TWO_ITEMS = {
  id: 'accordion-identifier',
  itemsList: [
    {
      title: 'Title for item 1',
      content: 'Content for item 1',
    },
    {
      title: 'Title for item 2',
      content: 'Content for item 2',
    },
  ],
};

describe('macro: accordion', () => {
  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('accordion', MINIMAL_ACCORDION_WITH_TWO_ITEMS));

    expect($('.ons-accordion').attr('id')).toBe('accordion-identifier');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('accordion', {
        ...MINIMAL_ACCORDION_WITH_TWO_ITEMS,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-accordion').hasClass('extra-class')).toBe(true);
    expect($('.ons-accordion').hasClass('another-extra-class')).toBe(true);
  });

  describe('item', () => {
    it('has provided variant style classes', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          ...MINIMAL_ACCORDION_WITH_TWO_ITEMS,
          variants: ['variant-a', 'variant-b'],
        }),
      );

      expect($('.ons-collapsible--variant-a').length).toBe(2);
      expect($('.ons-collapsible--variant-b').length).toBe(2);
    });

    it('has provided title text', () => {
      const $ = cheerio.load(renderComponent('accordion', MINIMAL_ACCORDION_WITH_TWO_ITEMS));

      const titleText = $('.ons-collapsible__title')
        .first()
        .text()
        .trim();
      expect(titleText).toBe('Title for item 1');
    });

    it('has title with provided tag override', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          itemsList: [
            {
              title: 'Title for item 1',
              titleTag: 'h5',
              content: 'Content for item 1',
            },
          ],
        }),
      );

      const titleTag = $('.ons-collapsible__title')[0].tagName;
      expect(titleTag).toBe('h5');
    });

    it('has provided content text', () => {
      const $ = cheerio.load(renderComponent('accordion', MINIMAL_ACCORDION_WITH_TWO_ITEMS));

      const titleText = $('.ons-collapsible__content')
        .first()
        .text()
        .trim();
      expect(titleText).toBe('Content for item 1');
    });

    it('outputs a button with the expected class', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          itemsList: [
            {
              title: 'Title for item 1',
              button: {
                open: 'Open label',
                close: 'Close label',
              },
            },
            {
              title: 'Title for item 2',
              button: {
                open: 'Open label',
                close: 'Close label',
              },
            },
          ],
        }),
      );

      expect($('button.ons-js-collapsible-button').length).toBe(2);
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          itemsList: [
            {
              title: 'Title for item 1',
              attributes: {
                a: 123,
                b: 456,
              },
            },
          ],
        }),
      );

      expect($('.ons-collapsible').attr('a')).toBe('123');
      expect($('.ons-collapsible').attr('b')).toBe('456');
    });

    it('has additionally provided `headingAttributes`', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          itemsList: [
            {
              title: 'Title for item 1',
              headingAttributes: {
                a: 123,
                b: 456,
              },
            },
          ],
        }),
      );

      expect($('.ons-collapsible__heading').attr('a')).toBe('123');
      expect($('.ons-collapsible__heading').attr('b')).toBe('456');
    });

    it('has additionally provided `contentAttributes`', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          itemsList: [
            {
              title: 'Title for item 1',
              content: 'Content for item 1',
              contentAttributes: {
                a: 123,
                b: 456,
              },
            },
          ],
        }),
      );

      expect($('.ons-collapsible__content').attr('a')).toBe('123');
      expect($('.ons-collapsible__content').attr('b')).toBe('456');
    });
  });

  describe('toggle all button', () => {
    it('outputs a button with the expected class', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          ...MINIMAL_ACCORDION_WITH_TWO_ITEMS,
          allButton: {
            open: 'Open label',
            close: 'Close label',
          },
        }),
      );

      expect($('button.ons-js-collapsible-all').length).toBe(1);
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('accordion', {
          ...MINIMAL_ACCORDION_WITH_TWO_ITEMS,
          allButton: {
            open: 'Open label',
            close: 'Close label',
            attributes: {
              a: 123,
              b: 456,
            },
          },
        }),
      );

      expect($('button.ons-js-collapsible-all').attr('a')).toBe('123');
      expect($('button.ons-js-collapsible-all').attr('b')).toBe('456');
    });
  });
});
