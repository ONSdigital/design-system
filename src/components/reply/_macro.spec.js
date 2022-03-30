/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TEXTAREA = {
  id: 'reply-textarea',
  name: 'reply',
  label: {
    text: 'Reply',
  },
};

const EXAMPLE_BUTTON = {
  id: 'reply-button',
  type: 'button',
  text: 'Send message',
  classes: 'u-mb-xs',
};

const EXAMPLE_REPLY = {
  textarea: EXAMPLE_TEXTAREA,
  button: EXAMPLE_BUTTON,
  closeLinkText: 'Close conversation',
  closeLinkUrl: '/close-conversation',
};

describe('macro: reply', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('reply', EXAMPLE_REPLY));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('renders the provided `textarea` using the `textarea` component', () => {
    const faker = templateFaker();
    const textareaSpy = faker.spy('textarea');

    cheerio.load(faker.renderComponent('reply', EXAMPLE_REPLY));

    expect(textareaSpy.occurrences[0]).toEqual(EXAMPLE_TEXTAREA);
  });

  it('renders the provided `button` using the `button` component', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    cheerio.load(faker.renderComponent('reply', EXAMPLE_REPLY));

    expect(buttonSpy.occurrences[0]).toEqual(EXAMPLE_BUTTON);
  });

  it('has the expected hyperlink URL', async () => {
    const $ = cheerio.load(renderComponent('reply', EXAMPLE_REPLY));

    const $el = $('.ons-reply__link');
    expect($el.attr('href')).toBe(EXAMPLE_REPLY.closeLinkUrl);
  });

  it('has the expected link text', async () => {
    const $ = cheerio.load(renderComponent('reply', EXAMPLE_REPLY));

    const $el = $('.ons-reply__link');
    expect($el.text()).toBe(EXAMPLE_REPLY.closeLinkText);
  });
});
