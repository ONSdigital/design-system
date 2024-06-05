import { renderComponent, renderTemplate, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_DETAILS_BASIC = {
    id: 'details-id',
    title: 'Title for details',
    content: 'Content for details',
};

const EXAMPLE_PAGE = `
    ${renderComponent('details', {
        id: 'details-id',
        title: 'Title for details',
        content: 'Content for details',
    })}

    ${renderComponent('details', {
        id: 'details-id-2',
        title: 'Title for details',
        content: 'Content for details',
    })}
`;

const RENDERED_EXAMPLE_PAGE = renderTemplate(EXAMPLE_PAGE);

describe('script: details', () => {
    it('begins open when specified', async () => {
        await setTestPage(
            '/test',
            renderComponent('details', {
                ...EXAMPLE_DETAILS_BASIC,
                open: true,
            }),
        );

        const detailsOpenClass = await page.$eval('.ons-js-details', (node) => node.classList.contains('ons-details--open'));
        expect(detailsOpenClass).toBe(true);
    });

    describe('when the details heading is clicked to open the details', () => {
        beforeEach(async () => {
            await setTestPage('/test', renderComponent('details', EXAMPLE_DETAILS_BASIC));
            await page.click('.ons-js-details-heading');
        });

        it('sets the `open` attribute and adds the correct class', async () => {
            const detailsOpenClass = await page.$eval('.ons-js-details', (node) => node.classList.contains('ons-details--open'));

            expect(detailsOpenClass).toBe(true);
        });

        it('sets the `ga` attributes', async () => {
            const gaHeadingAttribute = await page.$eval('.ons-js-details-heading', (element) => element.getAttribute('data-ga-action'));

            expect(gaHeadingAttribute).toBe('Open panel');
        });
    });

    describe('when there is more than one details component and a details heading is clicked to open the details', () => {
        beforeEach(async () => {
            await setTestPage('/test', RENDERED_EXAMPLE_PAGE);
            await page.click('#details-id > .ons-js-details-heading');
        });

        it('sets the `open` attribute and open class on the right component', async () => {
            const detailsOpenClass = await page.$eval('#details-id', (node) => node.classList.contains('ons-details--open'));
            const detailsOpenClass2 = await page.$eval('#details-id-2', (node) => node.classList.contains('ons-details--open'));

            expect(detailsOpenClass).toBe(true);
            expect(detailsOpenClass2).toBe(false);
        });
    });

    describe('when the details heading is focused', () => {
        beforeEach(async () => {
            await setTestPage('/test', renderComponent('details', EXAMPLE_DETAILS_BASIC));
            await page.focus('.ons-js-details-heading');
        });

        describe('when the space bar is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('Space');
            });

            it('opens the details content', async () => {
                const detailsOpenClass = await page.$eval('.ons-js-details', (node) => node.classList.contains('ons-details--open'));
                expect(detailsOpenClass).toBe(true);
            });
        });

        describe('when the Enter key is pressed', () => {
            beforeEach(async () => {
                await page.keyboard.press('Enter');
            });

            it('opens the details content', async () => {
                const detailsOpenClass = await page.$eval('.ons-js-details', (node) => node.classList.contains('ons-details--open'));
                expect(detailsOpenClass).toBe(true);
            });
        });
    });

    describe('when the state is set to save', () => {
        beforeEach(async () => {
            await setTestPage(
                '/test',
                renderComponent('details', {
                    ...EXAMPLE_DETAILS_BASIC,
                    saveState: true,
                }),
            );
        });

        describe('when the details is opened', () => {
            beforeEach(async () => {
                await page.click('.ons-js-details-heading');
            });

            it('sets state in localStorage', async () => {
                const localStorage = await page.evaluate(() => localStorage.getItem('details-id'));
                expect(localStorage).toBe('true');
            });
        });

        describe('when the details is closed', () => {
            beforeEach(async () => {
                await page.click('.ons-js-details-heading');
            });

            it('removes state in localStorage', async () => {
                const localStorage = await page.evaluate(() => localStorage.getItem('details-id'));
                expect(localStorage).toBe(null);
            });
        });
    });
});
