import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('FOR: VR: Access-code', () => {
    describe('GIVEN: required params', () => {
        it('THEN: component renders correctly', async () => {
            await setTestPage(
                '/test',
                renderComponent('access-code', {
                    id: 'test-access-code',
                    label: {
                        text: 'Enter your 16-character access code',
                        description: 'Keep this code safe. You will need to enter it every time you access your study',
                    },
                }),
            );
            const { toMatchImageSnapshot } = require('jest-image-snapshot');
            expect.extend({ toMatchImageSnapshot });
            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();
        });
    });
});
