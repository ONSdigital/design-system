import { PuppeteerEndpointFaker } from '../../tests/helpers/puppeteer';
import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_ADDRESS_INPUT_WITH_API } from './_test-examples';

describe('FOR: address-input', () => {
    const apiFaker = new PuppeteerEndpointFaker(EXAMPLE_ADDRESS_INPUT_WITH_API.APIDomain);

    apiFaker.setOverrides(
        [
            '/addresses/eq?input=196%20colle&limit=10',
            '/addresses/eq?input=cf142&limit=10',
            '/addresses/eq?input=cf14%202nt&limit=100&groupfullpostcodes=combo',
        ],
        {
            data: {
                status: { code: 200 },
                response: {
                    addresses: [
                        {
                            uprn: '100070332099',
                            formattedAddress: '196 College Road, Birmingham, B44 8HF',
                            addressType: 'PAF',
                        },
                        {
                            uprn: '100100119969',
                            formattedAddress: '196 College Road, Whitchurch, Cardiff, CF14 2NZ',
                            addressType: 'PAF',
                        },
                    ],
                },
            },
        },
    );

    apiFaker.setOverrides(['/addresses/eq?input=cf14%202&limit=10'], {
        data: {
            status: { code: 200 },
            response: {
                partpostcode: 'cf14 2',
                postcodes: [
                    {
                        postcode: 'CF14 2AA',
                        streetName: 'Penlline Road',
                        townName: 'Whitchurch',
                        addressCount: 41,
                        firstUprn: 10002526869,
                        postTown: 'Cardiff',
                    },
                    {
                        postcode: 'CF14 2AB',
                        streetName: 'Penlline Road',
                        townName: 'Whitchurch',
                        addressCount: 1,
                        firstUprn: 10002511038,
                        postTown: 'Cardiff',
                    },
                ],
            },
        },
    });

    apiFaker.setOverrides(['/addresses/eq/uprn/100070332099?addresstype=paf', '/addresses/eq/uprn/100070332099?addresstype=paf&epoch=75'], {
        data: {
            status: { code: 200 },
            response: {
                address: {
                    uprn: '100070332099',
                    formattedAddress: '196 College Road, Whitchurch, Cardiff, CF14 2NT',
                    addressLine1: '196 College Road',
                    addressLine2: 'Whitchurch',
                    addressLine3: '',
                    townName: 'Cardiff',
                    postcode: 'CF14 2NT',
                    foundAddressType: 'PAF',
                },
            },
        },
    });

    apiFaker.setOverrides(['/addresses/eq/uprn/10002511038?addresstype=paf'], {
        data: {
            status: { code: 200 },
            response: {
                address: {
                    uprn: '10002511038',
                    formattedAddress: '197 College Road, Whitchurch, Cardiff, CF14 2AB',
                    addressLine1: '197 College Road',
                    addressLine2: 'Whitchurch',
                    addressLine3: '',
                    townName: 'Cardiff',
                    postcode: 'CF14 2AB',
                    foundAddressType: 'PAF',
                },
            },
        },
    });

    apiFaker.setOverrides(
        ['/addresses/eq/bucket?postcode=CF14%202AA&streetname=Penlline%20Road&townname=Whitchurch&groupfullpostcodes=combo'],
        {
            data: {
                status: { code: 200 },
                response: {
                    addresses: [
                        {
                            uprn: '10002511038',
                            formattedAddress: '197 College Road, Whitchurch, Cardiff, CF14 2AB',
                            addressType: 'PAF',
                        },
                    ],
                },
            },
        },
    );

    beforeAll(async () => {
        await apiFaker.setup(page);
    });

    beforeEach(async () => {
        await apiFaker.reset();
    });
    describe('GIVEN: the component initializes', () => {
        describe('WHEN: the component initializes without options', () => {
            test('THEN: it checks api status by trying a request', async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));
                await page.waitForTimeout(50);

                expect(apiFaker.getRequestCount('/addresses/eq?input=cf142&limit=10')).toBe(1);
            });

            describe('WHEN: api status is okay', () => {
                beforeEach(async () => {
                    await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));
                    await page.waitForTimeout(50);
                });

                test('THEN: it does not switch to manual input', async () => {
                    const isManualElementHidden = await page.$eval('.ons-js-address-input__manual', (node) =>
                        node.classList.contains('ons-u-db-no-js_enabled'),
                    );
                    expect(isManualElementHidden).toBe(true);
                    const isSearchElementHidden = await page.$eval('.ons-js-address-input__search', (node) =>
                        node.classList.contains('ons-u-d-no'),
                    );
                    expect(isSearchElementHidden).toBe(false);
                });
            });

            describe('WHEN: api status is not okay', () => {
                beforeEach(async () => {
                    apiFaker.setTemporaryOverride('/addresses/eq?input=cf142&limit=10', {
                        data: {
                            status: { code: 401 },
                        },
                    });

                    await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));
                    await page.waitForTimeout(50);
                });

                test('THEN: it switches to manual input', async () => {
                    const isManualElementHidden = await page.$eval('.ons-js-address-input__manual', (node) =>
                        node.classList.contains('ons-u-db-no-js_enabled'),
                    );
                    expect(isManualElementHidden).toBe(false);
                    const isSearchElementHidden = await page.$eval('.ons-js-address-input__search', (node) =>
                        node.classList.contains('ons-u-d-no'),
                    );
                    expect(isSearchElementHidden).toBe(true);
                });

                test('THEN: it hides the search button', async () => {
                    const hassClass = await page.$eval('.ons-js-address-search-btn', (node) => node.classList.contains('ons-u-d-no'));
                    expect(hassClass).toBe(true);
                });
            });
        });

        describe.each([
            [
                'english, epoch, workplace',
                '/addresses/eq?input=196%20colle&limit=10&classificationfilter=workplace&eboost=10&epoch=75',
                '/addresses/eq/uprn/100070332099?addresstype=paf&epoch=75',
                'en',
                {
                    regionCode: 'gb-eng',
                    oneYearAgo: true,
                    addressType: 'workplace',
                },
            ],
            [
                'ni, educational',
                '/addresses/eq?input=196%20colle&limit=10&classificationfilter=educational&eboost=0&sboost=0&wboost=0',
                '/addresses/eq/uprn/100070332099?addresstype=paf',
                'en',
                {
                    regionCode: 'gb-nir',
                    addressType: 'educational',
                },
            ],
            [
                'ni, workplace',
                '/addresses/eq?input=196%20colle&limit=10&classificationfilter=workplace&nboost=10',
                '/addresses/eq/uprn/100070332099?addresstype=paf',
                'en',
                {
                    regionCode: 'gb-nir',
                    addressType: 'workplace',
                },
            ],
            [
                'wales, workspace',
                '/addresses/eq?input=196%20colle&limit=10&classificationfilter=workplace&wboost=10&favourwelsh=true',
                '/addresses/eq/uprn/100070332099?addresstype=paf',
                'cy',
                {
                    regionCode: 'gb-wls',
                    addressType: 'workplace',
                },
            ],
        ])('WHEN: the component initialises with options - %s', (_, searchEndpoint, uprnEndpoint, lang, options) => {
            beforeEach(async () => {
                apiFaker.setTemporaryOverride(searchEndpoint, {
                    data: {
                        status: { code: 200 },
                        response: {
                            input: '196 colle',
                            limit: 10,
                            addresses: [
                                {
                                    uprn: '100070332099',
                                    formattedAddress: '196 College Road, Birmingham, B44 8HF',
                                    addressType: 'PAF',
                                },
                            ],
                        },
                    },
                });

                await setTestPage(
                    '/test',
                    renderComponent('address-input', {
                        ...EXAMPLE_ADDRESS_INPUT_WITH_API,
                        options,
                    }),
                );

                const setLangAttribute = (lang) => document.documentElement.setAttribute('lang', lang);
                await page.evaluate(setLangAttribute, lang);
            });

            test('THEN: it provides expected parameters to the address API', async () => {
                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = '196 coll'));
                await page.type('.ons-js-autosuggest-input', 'e');

                expect(apiFaker.getRequestCount(searchEndpoint)).toBe(1);
            });

            test('THEN: it requests further information for the selected address from the API with the expected parameters', async () => {
                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = '196 coll'));
                await page.type('.ons-js-autosuggest-input', 'e', { delay: 20 });
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');

                await page.waitForTimeout(50);

                expect(apiFaker.getRequestCount(uprnEndpoint)).toBe(1);
            });
        });
    });

    describe('GIVEN: the user inputs', () => {
        describe('WHEN: the "Down" arrow key is pressed', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'CF14'));
                await page.type('.ons-js-autosuggest-input', '2', { delay: 20 });
                await page.keyboard.press('ArrowDown');
            });

            test('THEN: it navigates to the first suggestion', async () => {
                const selectedOption = await page.$eval('.ons-autosuggest__option--focused', (node) => node.textContent);
                expect(selectedOption.trim()).toBe('196 College Road, Birmingham, B44 8HF');
            });
        });

        describe('WHEN: a character is typed', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = '196 coll'));
                await page.type('.ons-js-autosuggest-input', 'e');
            });

            test('THEN: it provides expected parameters to the address API', async () => {
                expect(apiFaker.getRequestCount('/addresses/eq?input=196%20colle&limit=10')).toBe(1);
            });
        });

        describe('WHEN: the language is Welsh', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));
                await page.evaluate(() => document.documentElement.setAttribute('lang', 'cy'));
            });

            test('THEN: the fetch url should contain the favour Welsh parameter', async () => {
                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = '196 coll'));
                await page.type('.ons-js-autosuggest-input', 'e');

                expect(apiFaker.getRequestCount('/addresses/eq?input=196%20colle&limit=10&favourwelsh=true')).toBe(1);
            });
        });

        describe('WHEN: the value is a full postcode', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'CF14 2N'));
                await page.type('.ons-js-autosuggest-input', 'T');
            });

            test('THEN: it provides expected parameters to the address API where `limit` is 100', async () => {
                expect(apiFaker.getRequestCount('/addresses/eq?input=cf14%202nt&limit=100&groupfullpostcodes=combo')).toBe(1);
            });

            test('THEN: it has expected suggestion entries', async () => {
                const suggestions = await page.$$eval('.ons-autosuggest__option', (nodes) => nodes.map((node) => node.textContent.trim()));
                expect(suggestions).toEqual(['196 College Road, Birmingham, B44 8HF', '196 College Road, Whitchurch, Cardiff, CF14 2NZ']);
            });
        });

        describe('WHEN: the query not a partial postcode', () => {
            beforeEach(async () => {
                apiFaker.setTemporaryOverride(
                    '/addresses/eq?input=penlline%20road%20whitchurch%20cardiff%20cf14%202nz&limit=100&groupfullpostcodes=combo',
                    {
                        data: {
                            status: { code: 200 },
                            response: {
                                addresses: [
                                    {
                                        uprn: '100070332099',
                                        formattedAddress: '1 Penlline Road, Whitchurch, Cardiff, CF14 2NZ',
                                        addressType: 'PAF',
                                    },
                                    {
                                        uprn: '100100119979',
                                        formattedAddress: '2 Penlline Road, Whitchurch, Cardiff, CF14 2NZ',
                                        addressType: 'PAF',
                                    },
                                ],
                            },
                        },
                    },
                );

                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'Penlline Road, Whitchurch, Cardiff, CF14 2N'));
                await page.type('.ons-js-autosuggest-input', 'Z');
                await page.waitForTimeout(100);
            });

            test('THEN: itprovides expected parameters to the address API', async () => {
                expect(
                    apiFaker.getRequestCount(
                        '/addresses/eq?input=penlline%20road%20whitchurch%20cardiff%20cf14%202nz&limit=100&groupfullpostcodes=combo',
                    ),
                ).toBe(1);
            });

            test('THEN: it has expected suggestion entries', async () => {
                const suggestions = await page.$$eval('.ons-autosuggest__option', (nodes) => nodes.map((node) => node.textContent.trim()));
                expect(suggestions).toEqual([
                    '1 Penlline Road, Whitchurch, Cardiff, CF14 2NZ',
                    '2 Penlline Road, Whitchurch, Cardiff, CF14 2NZ',
                ]);
            });

            describe('WHEN: a suggestion is selected', () => {
                beforeEach(async () => {
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(100);
                });

                test('THEN: it makes expected request when a suggestion is selected', async () => {
                    expect(apiFaker.getRequestCount('/addresses/eq/uprn/100070332099?addresstype=paf')).toBe(1);
                });

                test('THEN: it populates manual input fields with address from selection', async () => {
                    expect(await page.$eval('.ons-js-address-organisation', (node) => node.value)).toBe('');
                    expect(await page.$eval('.ons-js-address-line1', (node) => node.value)).toBe('196 College Road');
                    expect(await page.$eval('.ons-js-address-line2', (node) => node.value)).toBe('Whitchurch');
                    expect(await page.$eval('.ons-js-address-town', (node) => node.value)).toBe('Cardiff');
                    expect(await page.$eval('.ons-js-address-postcode', (node) => node.value)).toBe('CF14 2NT');
                    expect(await page.$eval('.ons-js-hidden-uprn', (node) => node.value)).toBe('100070332099');
                });
            });
        });

        describe('WHEN: the query is a partial postcode', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'CF14 '));
                await page.type('.ons-js-autosuggest-input', '2');
                await page.waitForTimeout(200);
            });

            test('THEN it provides expected parameters to the address API', async () => {
                expect(apiFaker.getRequestCount('/addresses/eq?input=cf14%202&limit=10')).toBe(1);
            });

            test('THEN: it has expected suggestion entries', async () => {
                const suggestions = await page.$$eval('.ons-autosuggest__option', (nodes) => nodes.map((node) => node.textContent.trim()));
                expect(suggestions).toEqual([
                    'Penlline Road, Whitchurch, Cardiff, CF14 2AA (41 addresses)',
                    '197 College Road, Whitchurch, Cardiff, CF14 2AB',
                ]);
            });

            describe('WHEN: a suggestion is selected', () => {
                beforeEach(async () => {
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(200);
                });

                test('THEN: it makes expected request', async () => {
                    expect(
                        apiFaker.getRequestCount(
                            '/addresses/eq/bucket?postcode=CF14%202AA&streetname=Penlline%20Road&townname=Whitchurch&groupfullpostcodes=combo',
                        ),
                    ).toBe(1);
                });

                test('THEN: it has expected suggestion entries', async () => {
                    const suggestions = await page.$$eval('.ons-autosuggest__option', (nodes) =>
                        nodes.map((node) => node.textContent.trim()),
                    );
                    expect(suggestions).toEqual(['197 College Road, Whitchurch, Cardiff, CF14 2AB']);
                });

                describe('WHEN: an inner suggestion is selected', () => {
                    beforeEach(async () => {
                        await page.keyboard.press('ArrowDown');
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(200);
                    });

                    test('THEN: it populates manual input fields with address from selection', async () => {
                        expect(await page.$eval('.ons-js-address-organisation', (node) => node.value)).toBe('');
                        expect(await page.$eval('.ons-js-address-line1', (node) => node.value)).toBe('197 College Road');
                        expect(await page.$eval('.ons-js-address-line2', (node) => node.value)).toBe('Whitchurch');
                        expect(await page.$eval('.ons-js-address-town', (node) => node.value)).toBe('Cardiff');
                        expect(await page.$eval('.ons-js-address-postcode', (node) => node.value)).toBe('CF14 2AB');
                        expect(await page.$eval('.ons-js-hidden-uprn', (node) => node.value)).toBe('10002511038');
                    });
                });
            });
        });

        describe('WHEN: there is an error retrieving the address', () => {
            beforeEach(async () => {
                apiFaker.setTemporaryOverride('/addresses/eq?input=cf142&limit=10', {
                    data: {
                        status: { code: 200 },
                        response: {
                            addresses: [
                                {
                                    uprn: 'bad',
                                    formattedAddress: '196 College Road, Birmingham, B44 8HF',
                                    addressType: 'PAF',
                                },
                            ],
                        },
                    },
                });

                apiFaker.setTemporaryOverride('/addresses/eq/uprn/bad?addresstype=paf', {
                    data: {
                        status: { code: 400 },
                    },
                });

                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'cf14'));
                await page.type('.ons-js-autosuggest-input', '2', { delay: 20 });
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');
                await page.waitForTimeout(100);
            });

            test('THEN: it switches to manual mode and hides search button', async () => {
                const isManualElementHidden = await page.$eval('.ons-js-address-input__manual', (node) =>
                    node.classList.contains('ons-u-db-no-js_enabled'),
                );
                expect(isManualElementHidden).toBe(false);

                const isSearchElementHidden = await page.$eval('.ons-js-address-input__search', (node) =>
                    node.classList.contains('ons-u-d-no'),
                );
                expect(isSearchElementHidden).toBe(true);

                const isSearchButtonElementHidden = await page.$eval('.ons-js-address-search-btn', (node) =>
                    node.classList.contains('ons-u-d-no'),
                );
                expect(isSearchButtonElementHidden).toBe(true);
            });
        });

        describe('WHEN: the form is submitted', () => {
            describe('WHEN: the selected address is manually changed', () => {
                test('THEN: clears the urpn field', async () => {
                    await setTestPage(
                        '/test',
                        `
                            <form action="/test/fake/form-handler" method="post">
                                ${renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API)}
                                <button type="submit">Submit</button>
                            </form>
                        `,
                    );

                    await page.$eval('form', (node) =>
                        node.addEventListener('submit', (event) => {
                            event.preventDefault();
                            return false;
                        }),
                    );

                    await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'CF14 2N'));
                    await page.type('.ons-js-autosuggest-input', 'T', { delay: 20 });
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(100);

                    const urpnValueBefore = await page.$eval('.ons-js-hidden-uprn', (node) => node.value);
                    expect(urpnValueBefore).toBe('100070332099');

                    await page.$eval('.ons-js-address-line1', (node) => (node.value = 'Something else'));
                    await page.click('button[type=submit]');

                    const urpnValueAfter = await page.$eval('.ons-js-hidden-uprn', (node) => node.value);
                    expect(urpnValueAfter).toBe('');
                });
            });

            describe('WHEN: the submit is invalid', () => {
                beforeEach(async () => {
                    await setTestPage(
                        '/test',
                        `
                            <div class="ons-question">
                                <form action="/test/fake/form-handler" method="post">
                                    ${renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API)}
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        `,
                    );

                    await page.$eval('form', (node) =>
                        node.addEventListener('submit', (event) => {
                            event.preventDefault();
                            return false;
                        }),
                    );

                    await page.click('button[type=submit]');
                });

                test('THEN: an error summary panel should be added to the DOM', async () => {
                    const panelExists = await page.$$eval('.ons-js-autosuggest-error-panel', (nodes) => nodes.length === 1);
                    expect(panelExists).toBe(true);
                });

                test('THEN: input should be wrapped in an error', async () => {
                    const inputIsError = await page.$$eval('#autosuggest-input-error', (nodes) => nodes.length === 1);
                    expect(inputIsError).toBe(true);
                });

                describe('WHEN: the mode is set to manual', () => {
                    test('THEN: the error summary should be removed', async () => {
                        await page.click('.ons-js-address-manual-btn');

                        const panelExists = await page.$$eval('.ons-js-autosuggest-error-panel', (nodes) => nodes.length === 1);
                        expect(panelExists).toBe(false);
                    });
                });
            });
        });
    });

    describe('GIVEN: When the manual link is clicked', () => {
        beforeEach(async () => {
            await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));
            await page.click('.ons-js-address-manual-btn');
        });

        describe('WHEN: the search link is not clicked', () => {
            test('THEN: it shows manual input fields', async () => {
                const isManualElementHidden = await page.$eval('.ons-js-address-input__manual', (node) =>
                    node.classList.contains('ons-u-db-no-js_enabled'),
                );
                expect(isManualElementHidden).toBe(false);
                const isSearchElementHidden = await page.$eval('.ons-js-address-input__search', (node) =>
                    node.classList.contains('ons-u-d-no'),
                );
                expect(isSearchElementHidden).toBe(true);
            });

            test('THEN: it clears autosuggest input', async () => {
                const value = await page.$eval('.ons-js-autosuggest-input', (node) => node.value);
                expect(value).toBe('');
            });
        });

        describe('WHEN: the search link is clicked', () => {
            beforeEach(async () => {
                await page.$eval('.ons-js-address-organisation', (node) => (node.value = 'Test organisation'));
                await page.$eval('.ons-js-address-line1', (node) => (node.value = 'Test address line 1'));
                await page.$eval('.ons-js-address-line2', (node) => (node.value = 'Test address line 2'));
                await page.$eval('.ons-js-address-town', (node) => (node.value = 'Test town'));
                await page.$eval('.ons-js-address-postcode', (node) => (node.value = 'PO37 60DE'));
                await page.$eval('.ons-js-hidden-uprn', (node) => (node.value = '100070332099'));

                await page.click('.ons-js-address-search-btn');
            });

            test('THEN: it hides manual input fields', async () => {
                const isManualElementHidden = await page.$eval('.ons-js-address-input__manual', (node) =>
                    node.classList.contains('ons-u-db-no-js_enabled'),
                );
                expect(isManualElementHidden).toBe(true);
                const isSearchElementHidden = await page.$eval('.ons-js-address-input__search', (node) =>
                    node.classList.contains('ons-u-d-no'),
                );
                expect(isSearchElementHidden).toBe(false);
            });

            test('THEN: it clears manual input fields', async () => {
                expect(await page.$eval('.ons-js-address-organisation', (node) => node.value)).toBe('');
                expect(await page.$eval('.ons-js-address-line1', (node) => node.value)).toBe('');
                expect(await page.$eval('.ons-js-address-line2', (node) => node.value)).toBe('');
                expect(await page.$eval('.ons-js-address-town', (node) => node.value)).toBe('');
                expect(await page.$eval('.ons-js-address-postcode', (node) => node.value)).toBe('');
                expect(await page.$eval('.ons-js-hidden-uprn', (node) => node.value)).toBe('');
            });
        });
    });

    describe('GIVEN: the component initialises a non-editable address lookup', () => {
        describe('WHEN: a query is sent and address selected', () => {
            beforeEach(async () => {
                await setTestPage('/test', renderComponent('address-input', EXAMPLE_ADDRESS_INPUT_WITH_API));

                await page.$eval('.ons-js-autosuggest-input', (node) => (node.value = 'CF14'));
                await page.type('.ons-js-autosuggest-input', '2', { delay: 20 });
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');

                await page.waitForTimeout(50);
            });

            test('THEN: the retrieveAddress function will be called', () => {
                expect(apiFaker.getRequestCount('/addresses/eq/uprn/100070332099?addresstype=paf')).toBe(1);
            });
        });

        describe('WHEN: the form is submitted', () => {
            describe('WHEN: the input is empty', () => {
                beforeEach(async () => {
                    await setTestPage(
                        '/test',
                        `
                            <div class="ons-question">
                                <form action="/test/fake/form-handler" method="post">
                                    ${renderComponent('address-input', { ...EXAMPLE_ADDRESS_INPUT_WITH_API, isEditable: false })}
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        `,
                    );

                    await page.click('button[type=submit]');
                });

                test('THEN: it sets aria status message', async () => {
                    const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', (node) => node.textContent);
                    expect(statusMessage).toBe('Enter 3 or more characters for suggestions.');
                });
            });
        });
    });
});
