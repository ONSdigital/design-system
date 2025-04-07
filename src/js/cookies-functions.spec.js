/** @jest-environment jsdom */

import { getDomain } from './cookies-functions';

// Mocking document.cookie before the tests
beforeAll(() => {
    let mockCookieStore = {};
    Object.defineProperty(document, 'cookie', {
        get: () =>
            Object.entries(mockCookieStore)
                .map(([key, value]) => `${key}=${value}`)
                .join('; '),
        set: (value) => {
            const domainMatch = value.match(/domain=([^;]+)/i);
            const domain = domainMatch?.[1]?.trim();
            if (domain === 'new-website.ons.gov.uk') return; // Prevent setting cookies at 'new-website.ons.gov.uk'
            let [key, val] = value.split('=');
            mockCookieStore[key] = val.split(';')[0];
        },
        configurable: true,
    });
});

describe('script: getDomain()', () => {
    test('should return service-manual.ons.gov.uk as the domain name when cookies can be set at the full subdomain', () => {
        const result = getDomain('service-manual.ons.gov.uk');
        expect(result).toBe('service-manual.ons.gov.uk');
    });

    test('should remove `www` from the domain name www.ons.gov.uk', () => {
        const result = getDomain('www.ons.gov.uk');
        expect(result).toBe('ons.gov.uk');
    });

    test('returns `ons.gov.uk` as the domain name when cookies can not be set at subdomain `new-website.ons.gov.uk`', () => {
        const result = getDomain('new-website.ons.gov.uk');
        expect(result).toBe('ons.gov.uk');
    });
});
