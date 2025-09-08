/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_MESSAGE_LIST_MINIMAL = {
    unreadText: 'New',
    fromLabel: 'From',
    dateLabel: 'Date',
    hiddenReadLabel: 'Read the message',
    bodyLabel: 'Body',
    messages: [
        {
            id: 'message1',
            unread: true,
            subject: {
                url: 'https://example.com/message/1',
                text: 'Example message subject',
            },
            fromText: 'Example Sender 1',
            dateText: 'Tue 4 Jul 2020 at 7:47',
            body: 'An example message.',
        },
        {
            id: 'message2',
            subject: {
                url: 'https://example.com/message/2',
                text: 'Another example message subject',
            },
            fromText: 'Example Sender 2',
            dateText: 'Mon 1 Oct 2019 at 9:52',
            body: 'Another example message.',
        },
    ],
};

const EXAMPLE_MESSAGE_LIST = {
    ...EXAMPLE_MESSAGE_LIST_MINIMAL,
    ariaLabel: 'Message list for ONS Business Surveys',
    ariaLabelMetaData: 'Message information',
};

const EXAMPLE_MESSAGE_LIST_WITHOUT_BODYLABEL_PARAM = {
    unreadText: 'New',
    fromLabel: 'From',
    dateLabel: 'Date',
    hiddenReadLabel: 'Read the message',
    messages: [
        {
            id: 'message1',
            unread: true,
            subject: {
                url: 'https://example.com/message/1',
                text: 'Example message subject',
            },
            fromText: 'Example Sender 1',
            dateText: 'Tue 4 Jul 2020 at 7:47',
            body: 'An example message.',
        },
    ],
};

describe('macro: message-list', () => {
    it('passes jest-axe checks when all parameters are provided', async () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute on `.ons-message-list` with the correct default value', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-list').attr('aria-label')).toBe('Message List');
    });

    it('has `aria-label` attribute on `.ons-message-list` using the provided value', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST));

        expect($('.ons-message-list').attr('aria-label')).toBe('Message list for ONS Business Surveys');
    });

    it('has `aria-label` attribute on `.ons-message-item__metadata` with the correct default value', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item__metadata:first').attr('aria-label')).toBe('Message metadata');
    });

    it('has `aria-label` attribute on `.ons-message-item__metadata` using the provided value', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST));

        expect($('.ons-message-item__metadata:first').attr('aria-label')).toBe('Message information');
    });

    it('has `unreadText` for unread messages', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST));

        expect($('#message1 .ons-message-item__unread').text().trim()).toBe('(New)');
    });

    it('has visually hidden label `fromLabel`', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item__metadata-term--from:first').text().trim()).toBe('From:');
    });

    it('has visually hidden label `dateLabel`', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item__metadata-term--date:first').text().trim()).toBe('Date:');
    });

    it('has visually hidden label `hiddenReadLabel`', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item__link:first').text()).toContain('Read the message: ');
    });

    it('has visually hidden label `bodyLabel` when `bodyLabel` is provided`', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item__metadata-term--body:first').text().trim()).toBe('Body:');
    });

    it('has the default text for visually hidden label `bodyLabel` when `bodyLabel` is not provided', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_WITHOUT_BODYLABEL_PARAM));

        expect($('.ons-message-item__metadata-term--body:first').text().trim()).toBe('Message text:');
    });

    it('has message as expected', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        const $message2 = $('.ons-message-item:nth-child(2)');

        expect($message2.find('.ons-message-item__subject').text().trim()).toBe('Another example message subject');
        expect($message2.find('.ons-message-item__subject').attr('id')).toBe('message2');
        expect($message2.find('.ons-message-item__metadata-value--from').text().trim()).toBe('Example Sender 2');
        expect($message2.find('.ons-message-item__metadata-value--date').text().trim()).toBe('Mon 1 Oct 2019 at 9:52');
        expect($message2.find('.ons-message-item__metadata-value--body').text().trim()).toBe('Another example message.');
        expect($message2.find('.ons-message-item__link a').attr('href')).toBe('https://example.com/message/2');
    });

    it('has `aria-labelledby` attribute on message', () => {
        const $ = cheerio.load(renderComponent('message-list', EXAMPLE_MESSAGE_LIST_MINIMAL));

        expect($('.ons-message-item:first').attr('aria-labelledby')).toBe('message1');
    });
});
