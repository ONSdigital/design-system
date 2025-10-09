/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_PANEL_BASIC = {
    id: 'panel',
    body: 'Some panel text',
};

describe('macro: panel', () => {
    describe.each([
        ['info', 'Important information:'],
        ['bare', 'Important information:'],
        ['error', 'Error:'],
        ['pending', 'Pending:'],
        ['warn', 'Warning:'],
        ['warn-branded', 'Warning:'],
        ['branded', 'Important information:'],
        ['success', 'Completed:'],
        ['announcement', 'Announcement:'],
    ])('mode: %s', (panelVariant, accessibleText) => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has correct panel variant class', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel').hasClass(`ons-panel--${panelVariant}`)).toBe(true);
        });

        it('has the provided `body` text', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel__body').text().trim()).toBe('Some panel text');
        });

        it('calls with content', () => {
            const $ = cheerio.load(renderComponent('panel', { EXAMPLE_PANEL_BASIC, variant: panelVariant }, 'Example content...'));

            const content = $('.ons-panel__body').text().trim();
            expect(content).toBe('Example content...');
        });

        it('has the provided `id` attribute', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );

            expect($('#panel').length).toBe(1);
        });

        it('has custom classes applied', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                    classes: 'ons-custom-class',
                }),
            );

            expect($('.ons-panel').hasClass('ons-custom-class')).toBe(true);
        });

        it('has additionally provided `attributes`', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                    attributes: {
                        a: '123',
                        b: '456',
                    },
                }),
            );
            expect($('.ons-panel').attr('a')).toBe('123');
            expect($('.ons-panel').attr('b')).toBe('456');
        });

        it('has visually hidden accessible element', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel__assistive-text').length).toBe(1);
        });

        it('has the default visually hidden accessible text', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel__assistive-text').text().trim()).toBe(accessibleText);
        });

        it('has the provided visually hidden accessible text', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: panelVariant,
                    assistiveTextPrefix: 'Some helpful text:',
                }),
            );

            expect($('.ons-panel__assistive-text').text().trim()).toBe('Some helpful text:');
        });
    });

    describe.each([
        ['info', 'div'],
        ['', 'div'],
        ['pending', 'div'],
    ])('mode: %s', (panelVariant, tagEl) => {
        it('has the default title tag', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Panel title',
                    variant: panelVariant,
                }),
            );

            const titleTag = $('.ons-panel__title')[0].tagName;
            expect(titleTag).toBe(tagEl);
        });

        it('has the provided `headingLevel`', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Panel title',
                    variant: panelVariant,
                    headingLevel: 3,
                }),
            );

            const titleTag = $('.ons-panel__title')[0].tagName;
            expect(titleTag).toBe('h3');
        });

        it('has the provided `title` text', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Panel title',
                    variant: panelVariant,
                }),
            );

            const titleText = $('.ons-panel__title').text();
            expect(titleText).toBe('Panel title');
        });
    });

    describe.each(['bare', 'warn', 'warn-branded', 'announcement'])('mode: %s', (panelVariant) => {
        it('does not render a title when `title` is provided', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Panel title',
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel__title').length).toBe(0);
        });
    });

    describe.each([
        ['error', 'h2'],
        ['success', 'div'],
    ])('mode: %s', (panelVariant, tagEl) => {
        it('has the default id set', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            expect($('#alert').length).toBe(1);
        });

        it('has the correct default title tag', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            const titleTag = $('.ons-panel__title')[0].tagName;
            expect(titleTag).toBe(tagEl);
        });

        it('has the provided `headingLevel`', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Panel title',
                    variant: panelVariant,
                    headingLevel: 3,
                }),
            );

            const titleTag = $('.ons-panel__title')[0].tagName;
            expect(titleTag).toBe('h3');
        });

        it('has aria-labelledby attribute set with default value', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel').attr('aria-labelledby')).toBe('alert');
        });

        it('has the role attribute set to alert', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel').attr('role')).toBe('alert');
        });

        it('has the tabindex attribute set to -1', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel').attr('tabindex')).toBe('-1');
        });

        it('has the autofocus attribute set to autofocus', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    title: 'Title',
                    variant: panelVariant,
                }),
            );

            expect($('.ons-panel').attr('autofocus')).toBe('autofocus');
        });

        it('does not have the autofocus attribute set if `isDesignSystemExample` is provided', () => {
            const isDesignSystemExample = true;

            const $ = cheerio.load(
                renderComponent(
                    'panel',
                    {
                        ...EXAMPLE_PANEL_BASIC,
                        title: 'Title',
                        variant: panelVariant,
                    },
                    null,
                    null,
                    isDesignSystemExample,
                ),
            );

            expect($('.ons-panel').attr('autofocus')).toBe(undefined);
        });
    });

    describe('mode: spacious', () => {
        it('has the correct class set', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    spacious: true,
                }),
            );

            expect($('.ons-panel').hasClass('ons-panel--spacious')).toBe(true);
        });
    });

    describe('mode: announcement', () => {
        it('creates containers with the correct classes', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: 'announcement',
                }),
            );

            expect($('.ons-announcement').length).toBe(1);
            expect($('.ons-container').length).toBe(1);
        });

        it('has `arrow-forward` icon', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

            faker.renderComponent('panel', {
                ...EXAMPLE_PANEL_BASIC,
                variant: 'announcement',
            });

            expect(iconsSpy.occurrences[0].iconType).toBe('arrow-forward');
        });
    });

    describe('mode: warn', () => {
        it('has a default "!" prefix', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: 'warn',
                }),
            );

            expect($('.ons-panel__icon').text().trim()).toBe('!');
        });
    });

    describe('mode: warn-branded', () => {
        it('creates a container div', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: 'warn-branded',
                }),
            );

            expect($('.ons-branded-warning').length).toBe(1);
            expect($('.ons-container').length).toBe(1);
        });

        it('has a default "!" prefix', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    variant: 'warn-branded',
                }),
            );

            expect($('.ons-panel__icon').text().trim()).toBe('!');
        });
    });

    describe('mode: custom icon', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    iconType: 'check',
                }),
            );

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has a custom icon `iconType`', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

            faker.renderComponent('panel', {
                ...EXAMPLE_PANEL_BASIC,
                iconType: 'check',
            });

            expect(iconsSpy.occurrences[0].iconType).toBe('check');
        });

        it('has the default icon size set', () => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    iconType: 'check',
                }),
            );

            expect($('.ons-panel__icon').hasClass('ons-u-fs-r')).toBe(true);
        });

        it.each(['r', 'm', 'l', 'xl'])('has the correct class for the provided `iconSize` override (%s)', (customIconSize) => {
            const $ = cheerio.load(
                renderComponent('panel', {
                    ...EXAMPLE_PANEL_BASIC,
                    iconType: 'check',
                    iconSize: customIconSize,
                }),
            );

            expect($('.ons-panel__icon').hasClass(`ons-u-fs-${customIconSize}`)).toBe(true);
        });
    });
});
