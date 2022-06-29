/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TIMEOUT_PANEL_BASIC = {
  id: 'countdown',
  sessionExpiresAt: '000-000-000',
  redirectUrl: '#!',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  countdownText: 'For security, your answers will only be available to view for another',
  nojsText: 'For security, your answers will only be available to view for another 1 minute',
  countdownExpiredText: 'You are being signed out',
  endWithFullStop: true,
};

describe('macro: timeout panel', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('timeout-panel', EXAMPLE_TIMEOUT_PANEL_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('provides expected parameters to the inner `panel` component', () => {
    const faker = templateFaker();
    const panelSpy = faker.spy('panel');

    cheerio.load(faker.renderComponent('timeout-panel', EXAMPLE_TIMEOUT_PANEL_BASIC));

    expect(panelSpy.occurrences[0]).toEqual({
      id: 'countdown',
      classes: 'ons-js-panel-with-countdown',
      type: 'warn',
      attributes: {
        'data-redirect-url': '#!',
        'data-server-session-expires-at': '000-000-000',
        'data-countdown-text': 'For security, your answers will only be available to view for another',
        'data-countdown-expired-text': 'You are being signed out',
        'data-minutes-text-singular': 'minute',
        'data-minutes-text-plural': 'minutes',
        'data-seconds-text-singular': 'second',
        'data-seconds-text-plural': 'seconds',
        'aria-describedby': 'timeout-time-remaining',
        'data-full-stop': true,
      },
    });
  });
});
