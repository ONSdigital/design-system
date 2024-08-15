/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('FOR: access-code', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    id: 'example-access-code',
                    label: {
                        text: 'Enter your 16-character access code',
                        description: 'Keep this code safe. You will need to enter it every time you access your study',
                    },
                }),
            );
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: autocomplete is disabled on text input', () => {
                expect($('input').attr('autocomplete')).toBe('off');
            });
            test('THEN: text input has automatic capitalisation', () => {
                expect($('input').attr('autocapitalize')).toBe('characters');
            });
        });
    });
    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    id: 'example-id',
                }),
            );
            test('THEN: renders with id provided', () => {
                expect($('#example-id').length).toBe(1);
            });
        });
    });
    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with additional classes provided', () => {
                expect($('.ons-panel--info').hasClass('extra-class')).toBe(true);
                expect($('.ons-panel--info').hasClass('another-extra-class')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: label', () => {
        describe('WHEN: label text and description params are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    label: {
                        text: 'Enter your 16-character access code',
                        description: 'Keep this code safe. You will need to enter it every time you access your study',
                    },
                }),
            );
            test('THEN: renders with provided text and description', () => {
                expect($('.ons-label--with-description').text()).toBe('Enter your 16-character access code');
                expect($('.ons-input--with-description').text()).toBe(
                    'Keep this code safe. You will need to enter it every time you access your study',
                );
            });
        });
    });
    describe('GIVEN: Params: type', () => {
        describe('WHEN: param is at default state', () => {
            const $ = cheerio.load(renderComponent('access-code'));
            test('THEN: renders with default type of "text"', () => {
                expect($('input').attr('type')).toBe('text');
            });
        });
        describe('WHEN: type param is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    type: 'number',
                }),
            );
            test('THEN: renders with provided type', () => {
                expect($('input').attr('inputmode')).toBe('numeric');
            });
        });
    });
    describe('GIVEN: Params: name', () => {
        describe('WHEN: name param is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    name: 'special-name',
                }),
            );
            test('THEN: renders with provided name', () => {
                expect($('input').attr('name')).toBe('special-name');
            });
        });
    });
    describe('GIVEN: Params: maxlength & groupSize', () => {
        describe('WHEN: params are at default state', () => {
            const $ = cheerio.load(renderComponent('access-code'));
            test('THEN: renders input with total maxlength of 19', () => {
                expect($('input').attr('maxlength')).toBe('19');
            });
            test('THEN: renders input with groupsize of 4', () => {
                expect($('input').attr('data-group-size')).toBe('4');
            });
        });
        describe('WHEN: maxlength param is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    maxlength: 8,
                }),
            );
            test('THEN: renders input with provided maxlength', () => {
                expect($('input').attr('maxlength')).toBe('9');
            });
        });
        describe('WHEN: groupsize param is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    groupSize: 2,
                }),
            );
            test('THEN: renders input with provided groupsize', () => {
                expect($('input').attr('data-group-size')).toBe('2');
            });
        });
        describe('WHEN: maxlength and groupsize params are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    maxlength: 6,
                    groupSize: 3,
                }),
            );
            test('THEN: renders input with provided maxlength accounting for provided groupsize', () => {
                expect($('input').attr('maxlength')).toBe('7');
            });
        });
    });
    describe('GIVEN: Params: securityMessage', () => {
        describe('WHEN: securityMessage param is provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    securityMessage: 'Example security message.',
                }),
            );
            test('THEN: renders with provided security message', () => {
                expect($('.ons-panel__body').text().trim()).toBe('Example security message.');
            });
        });
    });
    describe('GIVEN: Params: postTextboxLinkText & postTextBoxLinkUrl', () => {
        describe('WHEN: postTextboxLinkText & postTextBoxLinkUrl params are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    postTextboxLinkText: 'Example link text',
                    postTextboxLinkUrl: '#3',
                }),
            );
            test('THEN: renders link with provided link and text', () => {
                expect($('a[href="#3"]').text().trim()).toBe('Example link text');
            });
        });
    });
    describe('GIVEN: Params: error', () => {
        describe('WHEN: error id & text params are provided', () => {
            const $ = cheerio.load(
                renderComponent('access-code', {
                    error: {
                        id: 'access-code-error',
                        text: 'Enter an access code',
                    },
                }),
            );
            test('THEN: renders error with provided id and text', () => {
                expect($('#access-code-error').length).toBe(1);
                expect($('.ons-panel__error > strong').text()).toBe('Enter an access code');
            });
        });
    });
});
