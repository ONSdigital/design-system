/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('macro: back-to-top', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        description: 'Back to top',
        anchor: 'example-target',
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has a target element', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        description: 'Back to top',
        anchor: 'example-target',
      }),
    );

    expect($('.ons-back-to-top')[0].tagName).toBe('a');
  });
  it('has back to top link with the provided description', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        description: 'Back to top',
        anchor: 'example-target',
      }),
    );
    expect($('.ons-back-to-top').text().trim()).toBe('Back to top');
  });
  it('has back to top link with the default description if no description provided', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        anchor: 'example-target',
      }),
    );

    expect($('.ons-back-to-top').text().trim()).toBe('Back to top');
  });
  it('has back to top link with the default anchor if no anchor provided', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        description: 'Back to top',
      }),
    );

    expect($('.ons-back-to-top').attr('href')).toBe('#');
  });
  it('has back to top link with the provided anchor', async () => {
    const $ = cheerio.load(
      renderComponent('back-to-top', {
        description: 'Back to top',
        anchor: 'example-target',
      }),
    );

    expect($('.ons-back-to-top').attr('href')).toBe('#example-target');
  });
});
