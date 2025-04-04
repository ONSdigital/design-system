/** @jest-environment jsdom */

import { getDomain } from './cookies-functions';

describe('script: getDomain()', () => {
    let mockCookieStore = {};

    Object.defineProperty(document, 'cookie', {
        get: () =>
            Object.entries(mockCookieStore)
                .map(([key, value]) => `${key}=${value}`)
                .join('; '),
        set: (value) => {
            const url = new URL(value);
            const allowedHosts = ['service-manual.example.com'];
            if (allowedHosts.includes(url.host)) return;
            let [key, val] = value.split('=');
            mockCookieStore[key] = val.split(';')[0];
        },
        configurable: true,
    });

    test('should return domain name if cookie is set at is subdomain', () => {
        const result = getDomain('service-manual.ons.gov.uk');
        expect(result).toBe('service-manual.ons.gov.uk');
    });

    test('should remove `www` from the domain name', () => {
        const result = getDomain('www.ons.gov.uk');
        expect(result).toBe('ons.gov.uk');
    });

    test('should return a wider domain name if the cookie is not set at subdomain', () => {
        const result = getDomain('service-manual.example.com');
        expect(result).toBe('example.com');
    });
});
