import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_INPUT_MINIMAL = {
    id: 'example-id',
    name: 'example-name',
};

describe('script: input', () => {
    it('focuses input when abbreviation is clicked', async () => {
        await setTestPage(
            '/test',
            renderComponent('input', {
                ...EXAMPLE_INPUT_MINIMAL,
                prefix: {
                    id: 'example-prefix-id',
                    title: 'Example prefix title',
                    text: 'Example prefix text',
                },
            }),
        );
        await page.click('.ons-js-input-abbr');
        const focusedElementId = await page.evaluate(() => document.activeElement.id);
        expect(focusedElementId).toEqual('example-id');
    });
});
