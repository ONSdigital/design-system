/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_TABS = {
    title: 'Example tabs',
    tabs: [
        {
            id: 'first-tab',
            title: 'Tab 1',
            content: 'Example content...',
            hiddenSpan: 'for Example',
        },
        {
            id: 'second-tab',
            title: 'Tab 2',
            content: 'Some nested <strong>strong element</strong>...',
        },
    ],
};

const EXAMPLE_TABS_WITH_SHOWTITLE = {
    title: 'Example tabs',
    tabs: [
        {
            id: 'first-tab',
            title: 'Tab 1',
            showTitle: true,
            content: 'Example content...',
        },
        {
            id: 'second-tab',
            title: 'Tab 2',
            content: 'Some nested <strong>strong element</strong>...',
        },
    ],
};

const EXAMPLE_TABS_WITHOUT_TAB_IDS = {
    title: 'Example tabs',
    tabs: [
        {
            title: 'Tab 1',
            content: 'Example content...',
        },
        {
            title: 'Tab 2',
            content: 'Some nested <strong>strong element</strong>...',
        },
    ],
};

describe('macro: tabs', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has the provided variant classes', () => {
        const $ = cheerio.load(
            renderComponent('tabs', {
                ...EXAMPLE_TABS,
                variants: ['details', 'example-variant'],
            }),
        );

        expect($('.ons-tabs').hasClass('ons-tabs--details')).toBe(true);
        expect($('.ons-tabs').hasClass('ons-tabs--example-variant')).toBe(true);
    });

    it('has the provided `title`', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

        expect($('.ons-tabs__title').text().trim()).toBe('Example tabs');
    });

    it('has title with provided tag override', () => {
        const $ = cheerio.load(
            renderComponent('tabs', {
                ...EXAMPLE_TABS,
                headingLevel: 4,
            }),
        );

        const expectedTitleTag = $('.ons-tabs__title')[0].tagName;
        expect(expectedTitleTag).toBe('h4');
    });

    it('has the provided tab id attributes', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

        expect($('.ons-tabs__panel:first').attr('id')).toBe('first-tab');
        expect($('.ons-tabs__panel:last').attr('id')).toBe('second-tab');
    });

    it('has default tab id attribute values when identifiers are not provided', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS_WITHOUT_TAB_IDS));

        expect($('.ons-tabs__panel:first').attr('id')).toBe('tab-1');
        expect($('.ons-tabs__panel:last').attr('id')).toBe('tab-2');
    });

    it('has expected label text in tab links and visually hidden span in tab 1', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

        expect($('.ons-tab:first').html()).toBe('Tab 1<span class="ons-u-vh">for Example</span>');
        expect($('.ons-tab:last').text().trim()).toBe('Tab 2');
    });

    it('has expected content in tab panels', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

        expect($('.ons-tabs__panel:first').html().trim()).toBe('Example content...');
        expect($('.ons-tabs__panel:last').html().trim()).toBe('Some nested <strong>strong element</strong>...');
    });

    it('displays a h2 when showTitle set to true', () => {
        const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS_WITH_SHOWTITLE));

        expect($('.ons-tabs__panel:first').find('h2').length).toBe(1);
    });
});
