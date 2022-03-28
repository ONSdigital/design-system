/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_FEEDBACK_MINIMAL = {
  heading: 'Feedback heading',
  content: 'Feedback content...',
  url: 'http://example.com',
  linkText: 'Feedback link text',
};

const EXAMPLE_FEEDBACK_FULL = {
  id: 'example-feedback',
  classes: 'extra-class',
  heading: 'Feedback heading',
  headingLevel: 5,
  headingClasses: 'extra-heading-class another-extra-heading-class',
  content: 'Feedback content...',
  url: 'http://example.com',
  linkText: 'Feedback link text',
};

describe('macro: feedback', () => {
  it('passes jest-axe checks with minimum parameters', async () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_MINIMAL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks with full parameters', async () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_FULL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('feedback', {
        id: 'example-id',
      }),
    );

    expect($('#example-id').length).toBe(1);
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('feedback', {
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-feedback').hasClass('extra-class')).toBe(true);
    expect($('.ons-feedback').hasClass('another-extra-class')).toBe(true);
  });

  it.each([
    [1, 'h1'],
    [4, 'h4'],
  ])('has the correct element type for the provided `headingLevel` (%i -> %s)', (headingLevel, expectedTitleTag) => {
    const $ = cheerio.load(
      renderComponent('feedback', {
        ...EXAMPLE_FEEDBACK_MINIMAL,
        headingLevel,
      }),
    );

    expect(
      $(`${expectedTitleTag}.ons-feedback__heading`)
        .text()
        .trim(),
    ).toBe('Feedback heading');
  });

  it('has a default `headingLevel` of 2', () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_MINIMAL));

    expect(
      $(`h2.ons-feedback__heading`)
        .text()
        .trim(),
    ).toBe('Feedback heading');
  });

  it('has additional heading style classes', () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_FULL));

    expect($('.ons-feedback__heading').hasClass('extra-heading-class')).toBe(true);
    expect($('.ons-feedback__heading').hasClass('another-extra-heading-class')).toBe(true);
  });

  it('has a paragraph with the provided `content`', () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_MINIMAL));

    expect(
      $('p')
        .text()
        .trim(),
    ).toBe('Feedback content...');
  });

  it('has a link with the provided `url`', () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_MINIMAL));

    expect($('.ons-feedback__link').attr('href')).toBe('http://example.com');
  });

  it('has a link with the provided `linkText`', () => {
    const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_MINIMAL));

    expect(
      $('.ons-feedback__link')
        .text()
        .trim(),
    ).toBe('Feedback link text');
  });
});
