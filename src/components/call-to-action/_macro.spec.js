/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CALL_TO_ACTION = {
  headingText: 'Call to action heading.',
  paragraphText: 'Descriptive text about call to action',
  button: {
    text: 'Start',
    url: 'https://example.com/start',
  },
};

describe('macro: call-to-action', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `headingText`', () => {
    const $ = cheerio.load(renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION));

    const headingText = $('.ons-call-to-action__heading')
      .text()
      .trim();
    expect(headingText).toBe('Call to action heading.');
  });

  it('has the provided `paragraphText`', () => {
    const $ = cheerio.load(renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION));

    const paragraphText = $('.ons-call-to-action__text')
      .text()
      .trim();
    expect(paragraphText).toBe('Descriptive text about call to action');
  });

  it('outputs the expected call-to-action button', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION);

    expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Start');
    expect(buttonSpy.occurrences[0]).toHaveProperty('url', 'https://example.com/start');
  });
});
