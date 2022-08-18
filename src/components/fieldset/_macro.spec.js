/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_FIELDSET_BASIC = {
  id: 'example-fieldset',
  legend: 'Fieldset legend',
  description: 'A fieldset description',
};

describe('macro: fieldset', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    expect($('.ons-fieldset').attr('id')).toBe('example-fieldset');
  });

  it('has the `legend` text', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    const title = $('.ons-fieldset__legend-title').text();
    expect(title).toBe('Fieldset legend');
  });

  it('has the correct `aria-decribedby` value', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    const ariaDescByVal = $('.ons-fieldset__legend').attr('aria-describedby');
    expect(ariaDescByVal).toBe('example-fieldset-legend-description');
  });

  it('has the `description` text', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    const title = $('.ons-fieldset__description')
      .html()
      .trim();
    expect(title).toBe('A fieldset description');
  });

  it('has the correct `description` `id` when no `fieldset `id` is provided', () => {
    const $ = cheerio.load(renderComponent('fieldset', { ...EXAMPLE_FIELDSET_BASIC, id: undefined }));

    const id = $('.ons-fieldset__description').attr('id');
    expect(id).toBe('legend-description');
  });

  it('has the correct `description` `id` when `fieldset `id` is provided', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    const id = $('.ons-fieldset__description').attr('id');
    expect(id).toBe('example-fieldset-legend-description');
  });

  it('has the correct `legend` class when `description` is provided', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC));

    expect($('.ons-fieldset__legend').hasClass('ons-fieldset__legend--with-description')).toBe(true);
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('fieldset', {
        ...EXAMPLE_FIELDSET_BASIC,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-fieldset').hasClass('extra-class')).toBe(true);
    expect($('.ons-fieldset').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided `legendClasses`', () => {
    const $ = cheerio.load(
      renderComponent('fieldset', {
        ...EXAMPLE_FIELDSET_BASIC,
        legendClasses: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-fieldset__legend').hasClass('extra-class')).toBe(true);
    expect($('.ons-fieldset__legend').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('fieldset', {
        ...EXAMPLE_FIELDSET_BASIC,
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-fieldset').attr('a')).toBe('123');
    expect($('.ons-fieldset').attr('b')).toBe('456');
  });

  it('has the correct element with `dontWrap`', () => {
    const $ = cheerio.load(
      renderComponent('fieldset', {
        ...EXAMPLE_FIELDSET_BASIC,
        dontWrap: true,
      }),
    );

    expect($('.ons-input-items').length).toBe(1);
    expect($('.ons-fieldset').length).toBe(0);
  });

  it('calls with content', () => {
    const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_BASIC, 'Example content...'));

    const content = $('.ons-fieldset')
      .html()
      .trim();
    expect(content).toEqual(expect.stringContaining('Example content...'));
  });

  it('calls the error component when `error` is provided', () => {
    const faker = templateFaker();
    const errorSpy = faker.spy('error');

    faker.renderComponent('fieldset', {
      ...EXAMPLE_FIELDSET_BASIC,
      error: { text: 'There is an error' },
    });

    expect(errorSpy.occurrences[0]).toEqual({
      text: 'There is an error',
    });
  });

  describe('with `legendIsQuestionTitle`', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('fieldset', { ...EXAMPLE_FIELDSET_BASIC, legendIsQuestionTitle: true }));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('renders the legend in a H1', () => {
      const $ = cheerio.load(renderComponent('fieldset', { ...EXAMPLE_FIELDSET_BASIC, legendIsQuestionTitle: true }));
      const titleTag = $('.ons-fieldset__legend-title')[0].tagName;

      expect(titleTag).toBe('h1');
    });

    it('has additionally provided `legendTitleClasses`', () => {
      const $ = cheerio.load(
        renderComponent('fieldset', {
          ...EXAMPLE_FIELDSET_BASIC,
          legendTitleClasses: 'extra-class another-extra-class',
          legendIsQuestionTitle: true,
        }),
      );

      expect($('.ons-fieldset__legend-title').hasClass('extra-class')).toBe(true);
      expect($('.ons-fieldset__legend-title').hasClass('another-extra-class')).toBe(true);
    });

    it('has the `legend` text', () => {
      const $ = cheerio.load(
        renderComponent('fieldset', {
          ...EXAMPLE_FIELDSET_BASIC,
          legendTitleClasses: 'extra-class another-extra-class',
          legendIsQuestionTitle: true,
        }),
      );

      const title = $('.ons-fieldset__legend-title')
        .html()
        .trim();
      expect(title).toBe('Fieldset legend');
    });

    it('has the correct `description` classes', () => {
      const $ = cheerio.load(renderComponent('fieldset', { ...EXAMPLE_FIELDSET_BASIC, legendIsQuestionTitle: true }));

      expect($('.ons-fieldset__description').hasClass('ons-fieldset__description--title')).toBe(true);
      expect($('.ons-fieldset__description').hasClass('ons-u-mb-m')).toBe(true);
    });
  });
});
