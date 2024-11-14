/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('FOR: Macro: Button', () => {
    describe('GIVEN: Params: no params', () => {
        describe('WHEN: there are no params provided', () => {
            test('THEN: has expected style classes', () => {
                const $ = cheerio.load(renderComponent('button'));
                expect($('.ons-btn .ons-btn__inner').length).toBe(1);
            });

            test('THEN: the button is rendered', () => {
                const $ = cheerio.load(renderComponent('button'));
                expect($('button').length).toBe(1);
            });
        });
    });
    describe('GIVEN: Params: text, name and value', () => {
        describe('WHEN: text, name and value params are provided', () => {
            test('THEN: passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        text: 'Example button',
                        name: 'example',
                        value: 'example-value',
                    }),
                );
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
    describe('GIVEN: Params: id', () => {
        describe('WHEN: the id param is provided', () => {
            it('THEN: the button has the provided id', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        id: 'example-id',
                    }),
                );
                expect($('#example-id').length).toBe(1);
            });
        });
    });
    describe('GIVEN: Params: attributes', () => {
        describe('WHEN: the attributes param is provided', () => {
            it('THEN: the button has the additionally provided attributes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        attributes: {
                            a: 123,
                            b: 456,
                        },
                    }),
                );
                expect($('button').attr('a')).toBe('123');
                expect($('button').attr('b')).toBe('456');
            });
        });
    });
    describe('GIVEN: Params: text', () => {
        describe('WHEN: the text param is provided', () => {
            test('THEN: the button has the label text', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        text: 'Click > me!',
                    }),
                );
                expect($('.ons-btn__text').html()).toBe('Click &gt; me!');
            });
        });
    });
    describe('GIVEN: Params: name', () => {
        describe('WHEN: the name param is provided', () => {
            test('THEN: the button renders with the provided name', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        name: 'example',
                    }),
                );
                expect($('button').attr('name')).toBe('example');
            });
        });
    });
    describe('GIVEN: Params: value', () => {
        describe('WHEN: the value param is provided', () => {
            test('THEN: the button renders with the provided value', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        value: 'example-value',
                    }),
                );
                expect($('button').attr('value')).toBe('example-value');
            });
        });
    });
    describe('GIVEN: Params: buttonContext', () => {
        describe('WHEN: buttonContext parameter is provided', () => {
            test('THEN: the button has the provided button context', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        buttonContext: 'button context text',
                    }),
                );
                expect($('.ons-btn__context').text()).toBe('button context text');
            });
        });
    });
    describe('GIVEN: Params: html', () => {
        describe('WHEN: html parameter is provided', () => {
            test('THEN: the button label has the provided html', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        html: 'Click <strong>me</strong>!',
                    }),
                );
                expect($('.ons-btn__text').html()).toBe('Click <strong>me</strong>!');
            });
        });
    });
    describe('GIVEN: Params: iconPosition', () => {
        describe('WHEN: iconPosition is set to before for custom icon', () => {
            test('THEN: renders custom icon before button text', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        text: 'Click me!',
                        iconPosition: 'before',
                        iconType: 'exit',
                    }),
                );
                expect($('.ons-icon + .ons-btn__text').text()).toBe('Click me!');
            });
        });
        describe('WHEN: iconPosition is set to after for custom icon', () => {
            test('THEN: renders custom icon after button text', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        text: 'Click me!',
                        iconPosition: 'after',
                        iconType: 'exit',
                    }),
                );
                expect($('.ons-btn__text + .ons-icon').prev().text()).toBe('Click me!');
            });
        });
    });

    describe('GIVEN: Params: iconType', () => {
        describe('WHEN: iconType parameter is provided', () => {
            test('THEN: the button has an svg element', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        text: 'Click me!',
                        iconPosition: 'after',
                        iconType: 'exit',
                    }),
                );
                expect($('svg').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: variants', () => {
        describe('WHEN: variants are present', () => {
            test('THEN: the button has the expected variant classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: ['variant-a', 'variant-b'],
                    }),
                );

                expect($('.ons-btn').hasClass('ons-btn--variant-a')).toBe(true);
                expect($('.ons-btn').hasClass('ons-btn--variant-b')).toBe(true);
            });
        });
        describe('WHEN: variants contains download', () => {
            test('THEN: the button has the download class', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        url: 'http://example.com',
                        variants: 'download',
                    }),
                );
                expect($('.ons-btn').hasClass('ons-btn--download')).toBe(true);
            });
            test('THEN: the button has the download icon', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    url: 'http://example.com',
                    variants: 'download',
                });

                expect(iconsSpy.occurrences[0].iconType).toBe('download');
            });
            test('THEN: the button has the download attribute', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'download',
                    }),
                );

                expect($('.ons-btn').attr('download')).toBeDefined();
            });
        });
        describe('WHEN: variants contains loader', () => {
            test('THEN: the button has the loader classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'loader',
                    }),
                );

                expect($('.ons-btn').hasClass('ons-btn--loader')).toBe(true);
                expect($('.ons-btn').hasClass('ons-js-loader')).toBe(true);
                expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
            });
            test('THEN: the button has the loader icon', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    variants: 'loader',
                });

                expect(iconsSpy.occurrences[0].iconType).toBe('loader');
            });
        });
        describe('WHEN: variants contains timer', () => {
            test('THEN: the button has the timer classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'timer',
                    }),
                );

                expect($('.ons-btn').hasClass('ons-js-timer')).toBe(true);
                expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
            });
        });
        describe('WHEN: variants contains print', () => {
            test('THEN: renders provided variant style classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'print',
                    }),
                );

                expect($('.ons-btn').hasClass('ons-btn--print')).toBe(true);
                expect($('.ons-btn').hasClass('ons-u-d-no')).toBe(true);
                expect($('.ons-btn').hasClass('ons-js-print-btn')).toBe(true);
            });

            test('THEN: button has the print icon', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    url: 'http://example.com',
                    variants: 'print',
                });

                expect(iconsSpy.occurrences[0].iconType).toBe('print');
            });
        });
    });
    describe('GIVEN: Params: type', () => {
        describe('WHEN: type parameter is provided', () => {
            test('THEN: has the provided type attribute', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        type: 'special-type',
                    }),
                );

                expect($('button').attr('type')).toBe('special-type');
            });
        });
        describe('WHEN: type parameter is provided and variant contains print', () => {
            test('THEN: has the provided type attribute', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        type: 'special-type',
                        variants: 'print',
                    }),
                );

                expect($('button').attr('type')).toBe('special-type');
            });
        });
        describe('WHEN: type parameter is not provided', () => {
            test('THEN: defaults to being a submit button', () => {
                const $ = cheerio.load(renderComponent('button'));

                expect($('button').attr('type')).toBe('submit');
            });
        });
        describe('WHEN: type parameter is not provided and variant contains print', () => {
            test('THEN: defaults to being a button', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'print',
                    }),
                );

                expect($('button').attr('type')).toBe('button');
            });
        });
    });

    describe('GIVEN: Params: url', () => {
        describe('WHEN: url parameter is provided', () => {
            const $ = cheerio.load(
                renderComponent('button', {
                    text: 'Example button',
                    name: 'example',
                    value: 'example-value',
                    url: 'http://example.com',
                }),
            );
            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders an <a> element', () => {
                expect($('a').length).toBe(1);
            });

            test('THEN: has expected style classes', () => {
                expect($('a').hasClass('ons-btn')).toBe(true);
                expect($('.ons-btn').hasClass('ons-btn--link')).toBe(true);
                expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
            });

            test('THEN: the link points to the provided url', () => {
                expect($('a').attr('href')).toBe('http://example.com');
            });

            test('THEN: the link button has the arrow-next icon by default', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    url: 'http://example.com',
                });

                expect(iconsSpy.occurrences[0].iconType).toBe('arrow-next');
            });

            test('THEN: the role attribute is set to button', () => {
                expect($('.ons-btn').attr('role')).toBe('button');
            });

            test('THEN: the link does not have a name attribute', () => {
                expect($('a').attr('name')).toBeUndefined();
            });

            test('THEN: the link does not have a value attribute', () => {
                expect($('a').attr('value')).toBeUndefined();
            });
        });
        describe('WHEN: url parameter is provided and newWindow is true', () => {
            test('THEN: has default new window description', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        url: 'http://example.com',
                        newWindow: true,
                    }),
                );
                expect($('.ons-btn__new-window-description').text()).toBe('(opens in a new tab)');
            });
        });
        describe('WHEN: url parameter is provided, newWindow is true and newWindowDescription is provided', () => {
            test('THEN: has custom new window description', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        url: 'http://example.com',
                        newWindow: true,
                        newWindowDescription: 'custom opens in a new window text',
                    }),
                );
                expect($('.ons-btn__new-window-description').text()).toBe('(custom opens in a new window text)');
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: classes parameter is provided', () => {
            test('THEN: the button has the additionally provided style classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        classes: 'extra-class another-extra-class',
                    }),
                );

                expect($('.ons-btn').hasClass('extra-class')).toBe(true);
                expect($('.ons-btn').hasClass('another-extra-class')).toBe(true);
            });
        });
        describe('WHEN: innerClasses parameter is provided', () => {
            test('THEN: the button inner has the additionally provided inner style classes', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        innerClasses: 'extra-inner-class another-extra-inner-class',
                    }),
                );

                expect($('.ons-btn__inner').hasClass('extra-inner-class')).toBe(true);
                expect($('.ons-btn__inner').hasClass('another-extra-inner-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: removeDownloadAttribute', () => {
        describe('WHEN: variants contains download and removeDownloadAttribute is true', () => {
            test('THEN: the button does not have the download attribute', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        variants: 'download',
                        removeDownloadAttribute: true,
                    }),
                );

                expect($('.ons-btn').attr('download')).toBeUndefined();
            });
        });
    });

    describe('GIVEN: Params: noIcon', () => {
        describe('WHEN: noIcon is set to true', () => {
            test('THEN: the button does not have the default arrow-next icon', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    url: 'http://example.com',
                    noIcon: true,
                });

                expect(iconsSpy.occurrences[0]).toBeUndefined();
            });
        });
        describe('WHEN: noIcon is set to false', () => {
            test('THEN: the button has the default arrow-next icon', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('button', {
                    url: 'http://example.com',
                    noIcon: false,
                });

                expect(iconsSpy.occurrences[0].iconType).toBe('arrow-next');
            });
        });
    });

    describe('GIVEN: Params: listeners', () => {
        describe('WHEN: listeners are provided', () => {
            test('THEN: the button renders each listener', () => {
                const $ = cheerio.load(
                    renderComponent('button', {
                        id: 'example-id',
                        listeners: {
                            click: `alert('Input was clicked')`,
                            keypress: `alert('Key was pressed')`,
                        },
                    }),
                );
                const script = $('script').html();
                expect(script).toContain(
                    `document.getElementById("example-id").addEventListener('click', function(){ alert(&#39;Input was clicked&#39;) });`,
                );
                expect(script).toContain(
                    `document.getElementById("example-id").addEventListener('keypress', function(){ alert(&#39;Key was pressed&#39;) });`,
                );
            });
        });
    });
});
