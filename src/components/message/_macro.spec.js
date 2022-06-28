/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_MESSAGE_MINIMAL = {
  type: 'sent',
  fromLabel: 'From',
  fromValue: 'Example Sender',
  sentLabel: 'Date sent',
  sentValue: 'Tue 4 Jul 2020 at 7:47',
};

const EXAMPLE_MESSAGE = {
  ...EXAMPLE_MESSAGE_MINIMAL,
  unreadLink: 'https://example.com/message/1',
  unreadLinkText: 'Unread message',
  id: 'message1',
  name: 'example-message-1',
  fromId: 'from1',
  sentId: 'sent1',
  unreadLinkId: 'unreadLink1',
  messageID: 'messageBody1',
};

describe('macro: message', () => {
  it('passes jest-axe checks when all parameters are provided', async () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it.each([
    ['sent', 'ons-message--sent'],
    ['received', 'ons-message--received'],
  ])('has appropriate class for provided `type` (%s -> %s)', (type, expectedClass) => {
    const $ = cheerio.load(
      renderComponent(
        'message',
        {
          ...EXAMPLE_MESSAGE_MINIMAL,
          type,
        },
        ['Message content...'],
      ),
    );

    expect($('.ons-message').hasClass(expectedClass)).toBe(true);
  });

  it('has `id` attribute on `.ons-message__metadata` using the provided value', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    expect($('.ons-message__metadata').attr('id')).toBe('message1');
  });

  it('has the provided `fromLabel`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE_MINIMAL, ['Message content...']));

    expect(
      $('.ons-message__sender .ons-message__term')
        .text()
        .trim(),
    ).toBe('From:');
  });

  it('has the provided `fromValue`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE_MINIMAL, ['Message content...']));

    expect(
      $('.ons-message__sender .ons-message__value')
        .text()
        .trim(),
    ).toBe('Example Sender');
  });

  it('has the provided `fromId`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    expect($('.ons-message__sender .ons-message__value').attr('id')).toBe('from1');
  });

  it('has the provided `sentLabel`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE_MINIMAL, ['Message content...']));

    expect(
      $('.ons-message__timestamp .ons-message__term')
        .text()
        .trim(),
    ).toBe('Date sent:');
  });

  it('has the provided `sentValue`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE_MINIMAL, ['Message content...']));

    expect(
      $('.ons-message__timestamp .ons-message__value')
        .text()
        .trim(),
    ).toBe('Tue 4 Jul 2020 at 7:47');
  });

  it('has the provided `sentId`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    expect($('.ons-message__timestamp .ons-message__value').attr('id')).toBe('sent1');
  });

  it('has the provided `unreadLink`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    expect($('.ons-message__unread-link').attr('href')).toBe('https://example.com/message/1');
  });

  it('has the provided `unreadLinkText`', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE, ['Message content...']));

    expect(
      $('.ons-message__unread-link')
        .text()
        .trim(),
    ).toBe('Unread message');
  });

  it('has the message content', () => {
    const $ = cheerio.load(renderComponent('message', EXAMPLE_MESSAGE_MINIMAL, ['Message content...']));

    expect(
      $('.ons-message__body')
        .text()
        .trim(),
    ).toBe('Message content...');
  });
});
