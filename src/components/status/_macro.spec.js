/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: status', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('status', {
        type: 'success',
        label: 'Example status message',
        size: 'small',
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the default type "info" when `type` is not provided', () => {
    const $ = cheerio.load(
      renderComponent('status', {
        label: 'Example status message',
      }),
    );

    expect($('.ons-status').hasClass('ons-status--info')).toBe(true);
  });

  it('has the provided `type`', () => {
    const $ = cheerio.load(
      renderComponent('status', {
        type: 'success',
        label: 'Example status message',
      }),
    );

    expect($('.ons-status').hasClass('ons-status--success')).toBe(true);
  });

  it('does not have the `ons-status--small` modifier by default', () => {
    const $ = cheerio.load(
      renderComponent('status', {
        label: 'Example status message',
      }),
    );

    expect($('.ons-status').hasClass('ons-status--small')).not.toBe(true);
  });

  it('has the `ons-status--small` when provided', () => {
    const $ = cheerio.load(
      renderComponent('status', {
        label: 'Example status message',
        size: 'small',
      }),
    );

    expect($('.ons-status').hasClass('ons-status--small')).toBe(true);
  });

  it('has the provided `label`', () => {
    const $ = cheerio.load(
      renderComponent('status', {
        label: 'Example status message',
      }),
    );

    expect(
      $('.ons-status')
        .text()
        .trim(),
    ).toBe('Example status message');
  });
});
