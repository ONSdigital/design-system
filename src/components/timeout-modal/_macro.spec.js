/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TIMEOUT_MODAL_BASIC = {
  showModalTimeInSeconds: 60,
  redirectUrl: '#!',
  title: 'You will be signed out soon',
  serverSessionExpiryEndpoint: '/some-endpoint',
  sessionExpiresAt: '000-000-000',
  textFirstLine: 'It appears you have been inactive for a while.',
  countdownText: 'To protect your information, your progress will be saved and you will be signed out in',
  countdownExpiredText: 'You are being signed out.',
  btnText: 'Continue survey',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  endWithFullStop: true,
};

describe('macro: timeout modal', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('timeout-modal', EXAMPLE_TIMEOUT_MODAL_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('provides expected parameters to the inner `modal` component', () => {
    const faker = templateFaker();
    const modalSpy = faker.spy('modal');

    cheerio.load(faker.renderComponent('timeout-modal', EXAMPLE_TIMEOUT_MODAL_BASIC));

    expect(modalSpy.occurrences[0]).toEqual({
      title: 'You will be signed out soon',
      btnText: 'Continue survey',
      classes: 'ons-js-timeout-modal',
      attributes: {
        'data-redirect-url': '#!',
        'data-server-session-expires-at': '000-000-000',
        'data-show-modal-time': 60,
        'data-server-session-expiry-endpoint': '/some-endpoint',
        'data-countdown-text': 'To protect your information, your progress will be saved and you will be signed out in',
        'data-countdown-expired-text': 'You are being signed out.',
        'data-minutes-text-singular': 'minute',
        'data-minutes-text-plural': 'minutes',
        'data-seconds-text-singular': 'second',
        'data-seconds-text-plural': 'seconds',
        'data-full-stop': true,
        'aria-describedby': 'timeout-time-remaining',
      },
    });
  });

  it('has expected `textFirstLine`', () => {
    const $ = cheerio.load(renderComponent('timeout-modal', EXAMPLE_TIMEOUT_MODAL_BASIC));

    const title = $('.ons-modal__body > p')
      .html()
      .trim();
    expect(title).toBe('It appears you have been inactive for a while.');
  });
});
