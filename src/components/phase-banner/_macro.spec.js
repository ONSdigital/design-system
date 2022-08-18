/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_PHASE_BANNER_MINIMAL = {
  html: 'Example content with a <a href="#">link</a>',
};

describe('macro: phase-banner', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('phase-banner', EXAMPLE_PHASE_BANNER_MINIMAL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has expected html content', () => {
    const $ = cheerio.load(renderComponent('phase-banner', EXAMPLE_PHASE_BANNER_MINIMAL));

    const htmlContent = $('.ons-phase-banner__desc')
      .html()
      .trim();
    expect(htmlContent).toBe('Example content with a <a href="#">link</a>');
  });

  it('has the "Beta" badge by default', () => {
    const $ = cheerio.load(renderComponent('phase-banner', EXAMPLE_PHASE_BANNER_MINIMAL));

    const badgeText = $('.ons-phase-banner__badge')
      .text()
      .trim();
    expect(badgeText).toBe('Beta');
  });

  it('has the provided `badge` text', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
        badge: 'Alpha',
      }),
    );

    const badgeText = $('.ons-phase-banner__badge')
      .text()
      .trim();
    expect(badgeText).toBe('Alpha');
  });

  it('has no badge when `hideBadge` is true', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
        hideBadge: true,
      }),
    );

    expect($('.ons-phase-banner__badge').length).toBe(0);
  });

  it('has `container--wide` class when `wide` is true', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
        wide: true,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
  });

  it('does not have `container--wide` class when `wide` is not set', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--wide')).toBe(false);
  });

  it('has `container--full-width` class when `fullWidth` is true', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
        fullWidth: true,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
  });

  it('does not have `container--full-width` class when `fullWidth` is not set', () => {
    const $ = cheerio.load(
      renderComponent('phase-banner', {
        ...EXAMPLE_PHASE_BANNER_MINIMAL,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--full-width')).toBe(false);
  });
});
