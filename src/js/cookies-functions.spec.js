/** @jest-environment jsdom */

import { getDomain } from './cookies-functions';
let mockCookieStore = {};

// Mocking document.cookie which is used for setting domain name in `getDomain()`
export const setMockcookie = {
    get cookie() {
        return Object.entries(mockCookieStore)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ');
    },
    set cookie(value) {
        const domainMatch = value.match(/domain=([^;]+)/i);
        const domain = domainMatch?.[1]?.trim();

        // Simulate failure to set cookie on this domain
        if (domain === 'new-website.ons.gov.uk') return;

        const [key, val] = value.split('=');
        mockCookieStore[key] = val.split(';')[0];
    },
};

describe('script: getDomain()', () => {
    beforeEach(() => {
        mockCookieStore = {}; // clear the cookie between tests
    });

    test('should return service-manual.ons.gov.uk as the domain name when cookies can be set at the full subdomain', () => {
        const result = getDomain('service-manual.ons.gov.uk', setMockcookie);
        expect(result).toBe('service-manual.ons.gov.uk');
    });

    test('should remove `www` from the domain name www.ons.gov.uk', () => {
        const result = getDomain('www.ons.gov.uk', setMockcookie);
        expect(result).toBe('ons.gov.uk');
    });

    test('returns `ons.gov.uk` as the domain name when cookies can not be set at subdomain `new-website.ons.gov.uk`', () => {
        const result = getDomain('new-website.ons.gov.uk', setMockcookie);
        expect(result).toBe('ons.gov.uk');
    });
});
