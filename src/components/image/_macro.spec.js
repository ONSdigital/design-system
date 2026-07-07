/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_IMAGE_SRC_URL_MINIMAL = {
    src: 'example.png',
};

const EXAMPLE_IMAGE_IMAGE_MINIMAL = {
    image: {
        smallSrc: 'example-small.png',
        largeSrc: 'example-large.png',
    },
};

describe('macro: image', () => {
    it('outputs a `figure` element wrapping the image', () => {
        const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_SRC_URL_MINIMAL));

        expect($('.ons-figure')[0].tagName).toBe('figure');
        expect($('.ons-figure .ons-image').length).toBe(1);
    });

    it('outputs a `figcaption` element when `caption` is provided', () => {
        const $ = cheerio.load(
            renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                caption: 'Example image caption',
            }),
        );

        expect($('.ons-figure__caption')[0].tagName).toBe('figcaption');
    });

    it('outputs a `figcaption` element with provided `caption` text', () => {
        const $ = cheerio.load(
            renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                caption: 'Example image caption',
            }),
        );

        expect($('.ons-figure__caption').text().trim()).toBe('Example image caption');
    });

    describe('figure params', () => {
        it('passes `id` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                id: 'my-image',
            });

            expect(figureSpy.occurrences[0].id).toBe('my-image');
        });

        it('passes `headingLevel` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                headingLevel: 4,
            });

            expect(figureSpy.occurrences[0].headingLevel).toBe(4);
        });

        it('passes `figureNumber` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                figureNumber: 'Image 1',
            });

            expect(figureSpy.occurrences[0].figureNumber).toBe('Image 1');
        });

        it('passes `title` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                title: 'Image title',
            });

            expect(figureSpy.occurrences[0].title).toBe('Image title');
        });

        it('passes `subtitle` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                subtitle: 'Image subtitle',
            });

            expect(figureSpy.occurrences[0].subtitle).toBe('Image subtitle');
        });

        it('passes `caption` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                caption: 'A caption',
            });

            expect(figureSpy.occurrences[0].caption).toBe('A caption');
        });

        it('passes `footnotes` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            const footnotes = {
                title: 'Footnotes',
                content: 'Some notes about this image.',
            };

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                footnotes,
            });

            expect(figureSpy.occurrences[0].footnotes).toEqual(footnotes);
        });

        it('passes `download` to the figure component', () => {
            const faker = templateFaker();
            const figureSpy = faker.spy('figure');

            const download = {
                title: 'Download this image',
                itemsList: [
                    {
                        text: 'High resolution image (JPG, 1.2MB)',
                        url: '/img/example.jpg',
                        download: 'file',
                    },
                ],
            };

            faker.renderComponent('image', {
                ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                download,
            });

            expect(figureSpy.occurrences[0].download).toEqual(download);
        });
    });

    describe('mode: src', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_SRC_URL_MINIMAL));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('outputs an `img` element', () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_SRC_URL_MINIMAL));

            expect($('.ons-image__img')[0].tagName).toBe('img');
        });

        it('outputs an `img` element with the expected `src`', () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_SRC_URL_MINIMAL));

            expect($('.ons-image__img').attr('src')).toBe('example.png');
        });

        it('outputs an `img` element with the expected alt text', () => {
            const $ = cheerio.load(
                renderComponent('image', {
                    ...EXAMPLE_IMAGE_SRC_URL_MINIMAL,
                    alt: 'Example alt text',
                }),
            );

            expect($('.ons-image__img').attr('alt')).toBe('Example alt text');
        });
    });

    describe('mode: image', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_IMAGE_MINIMAL));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('outputs an `img` element', () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_IMAGE_MINIMAL));

            expect($('.ons-image__img')[0].tagName).toBe('img');
        });

        it('outputs an `img` element with the expected `srcset`', () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_IMAGE_MINIMAL));

            expect($('.ons-image__img').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
        });

        it('outputs an `img` element with the expected `src`', () => {
            const $ = cheerio.load(renderComponent('image', EXAMPLE_IMAGE_IMAGE_MINIMAL));

            expect($('.ons-image__img').attr('src')).toBe('example-small.png');
        });

        it('outputs an `img` element with the expected alt text', () => {
            const $ = cheerio.load(
                renderComponent('image', {
                    ...EXAMPLE_IMAGE_IMAGE_MINIMAL,
                    alt: 'Example alt text',
                }),
            );

            expect($('.ons-image__img').attr('alt')).toBe('Example alt text');
        });
    });
});
