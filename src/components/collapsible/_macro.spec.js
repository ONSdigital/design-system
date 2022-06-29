/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_COLLAPSIBLE_BASIC = {
  id: 'collapsible-id',
  title: 'Title for collapsible',
  content: 'Content for collapsible',
};

describe('macro: collapsible', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    expect($('.ons-collapsible').attr('id')).toBe('collapsible-id');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-collapsible').hasClass('extra-class')).toBe(true);
    expect($('.ons-collapsible').hasClass('another-extra-class')).toBe(true);
  });

  it('has provided variant style classes', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        variants: ['variant-a', 'variant-b'],
      }),
    );

    expect($('.ons-collapsible--variant-a').length).toBe(1);
    expect($('.ons-collapsible--variant-b').length).toBe(1);
  });

  it('has provided title text', () => {
    const $ = cheerio.load(renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const titleText = $('.ons-collapsible__title')
      .first()
      .text()
      .trim();
    expect(titleText).toBe('Title for collapsible');
  });

  it('has title with provided tag override', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        titleTag: 'h4',
      }),
    );

    const titleTag = $('.ons-collapsible__title')[0].tagName;
    expect(titleTag).toBe('h4');
  });

  it('has provided content text', () => {
    const $ = cheerio.load(renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const titleText = $('.ons-collapsible__content')
      .text()
      .trim();
    expect(titleText).toEqual(expect.stringContaining('Content for collapsible'));
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );
    expect($('.ons-collapsible').attr('a')).toBe('123');
    expect($('.ons-collapsible').attr('b')).toBe('456');
  });

  it('has the correct data attribute when `saveState` is provided', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        saveState: true,
      }),
    );
    expect($('.ons-collapsible').attr('data-save-state')).toBe('true');
  });

  it('has the correct data attribute when `open` is provided', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        open: true,
      }),
    );
    expect($('.ons-collapsible').attr('data-open')).toBe('true');
  });

  it('has additionally provided `headingAttributes`', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        headingAttributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-collapsible__heading').attr('a')).toBe('123');
    expect($('.ons-collapsible__heading').attr('b')).toBe('456');
  });

  it('has additionally provided `contentAttributes`', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        contentAttributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-collapsible__content').attr('a')).toBe('123');
    expect($('.ons-collapsible__content').attr('b')).toBe('456');
  });

  it('has `chevron` icon', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');
    faker.renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC);

    expect(iconsSpy.occurrences[0].iconType).toBe('chevron');
  });

  it('has the expected button output', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('collapsible', {
      ...EXAMPLE_COLLAPSIBLE_BASIC,
      button: {
        close: 'Close this',
        attributes: {
          a: 123,
          b: 456,
        },
      },
    });

    expect(buttonSpy.occurrences[0]).toEqual({
      text: 'Close this',
      type: 'button',
      buttonContext: 'Title for collapsible content',
      classes: 'ons-js-collapsible-button ons-u-d-no ons-btn--secondary',
      innerClasses: 'ons-js-collapsible-button-inner',
      variants: 'small',
      attributes: {
        a: 123,
        b: 456,
      },
    });
  });

  it('has the expected data attribute when `button` is provided', () => {
    const $ = cheerio.load(
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        button: {
          close: 'Close this',
        },
      }),
    );
    expect($('.ons-collapsible').attr('data-btn-close')).toBe('Close this');
  });

  it('calls with content', () => {
    const $ = cheerio.load(renderComponent('collapsible', { EXAMPLE_COLLAPSIBLE_BASIC }, 'Example content...'));

    const content = $('.ons-collapsible__content')
      .text()
      .trim();
    expect(content).toEqual(expect.stringContaining('Example content...'));
  });
});
