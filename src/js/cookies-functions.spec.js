/** @jest-environment jsdom */

import { setConsentCookie, setCookie } from './cookies-functions';

let cookieAssignments = [];
let mockCookieStore = {};

function setCookieDomainPolicy(policy) {
    const banner = document.createElement('div');
    banner.className = 'ons-cookies-banner';
    banner.setAttribute('data-ons-cookie-domain-policy', policy);
    document.body.appendChild(banner);
}

function getLastCookieAssignment() {
    return cookieAssignments[cookieAssignments.length - 1];
}

function setMockDomain(domain) {
    Object.defineProperty(document, 'domain', {
        value: domain,
        configurable: true,
    });
}

describe('script: cookies-functions', () => {
    beforeEach(() => {
        cookieAssignments = [];
        mockCookieStore = {};
        document.body.innerHTML = '';
        setMockDomain('www.ons.gov.uk');

        Object.defineProperty(document, 'cookie', {
            get() {
                return Object.entries(mockCookieStore)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('; ');
            },
            set(value) {
                cookieAssignments.push(value);

                const [key, val] = value.split('=');
                if (value.includes('expires=Thu, 01 Jan 1970')) {
                    delete mockCookieStore[key];
                } else {
                    mockCookieStore[key] = val.split(';')[0];
                }
            },
            configurable: true,
        });
    });

    test('sets host-only cookies by default', () => {
        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('expires legacy domain-scoped preference cookies before setting the host-only preference cookie', () => {
        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(cookieAssignments[0]).toBe('ons_cookie_policy=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        expect(cookieAssignments[1]).toBe('ons_cookie_policy=; domain=ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        expect(cookieAssignments[2]).toContain('ons_cookie_policy=test-value; path=/');
        expect(cookieAssignments[2]).not.toMatch(/; domain=/i);
    });

    test('expires legacy domain-scoped banner state cookies before setting the host-only banner state cookie', () => {
        setCookie('ons_cookie_message_displayed', 'true', { days: 365 });

        expect(cookieAssignments[0]).toBe(
            'ons_cookie_message_displayed=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        );
        expect(cookieAssignments[1]).toBe(
            'ons_cookie_message_displayed=; domain=ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        );
        expect(cookieAssignments[2]).toContain('ons_cookie_message_displayed=true; path=/');
        expect(cookieAssignments[2]).not.toMatch(/; domain=/i);
    });

    test('does not expire legacy domain-scoped cookies before setting other cookie categories', () => {
        setCookie('_ga', 'test-value', { days: 365 });

        expect(cookieAssignments).toHaveLength(1);
        expect(getLastCookieAssignment()).toContain('_ga=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('sets host-only cookies when cookieDomainPolicy is `exact-host`', () => {
        setCookieDomainPolicy('exact-host');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('sets host-only cookies when cookieDomainPolicy is unknown', () => {
        setCookieDomainPolicy('legacy');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('sets domain cookies when cookieDomainPolicy is `domain`', () => {
        setCookieDomainPolicy('domain');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; domain=www.ons.gov.uk; path=/');
        expect(getLastCookieAssignment()).not.toContain('domain=ons.gov.uk');
    });

    test('does not set domain cookies on localhost', () => {
        setMockDomain('localhost');
        setCookieDomainPolicy('domain');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('deletes host-only and previous domain-scoped cookies', () => {
        setCookie('_ga', null, { days: -1 });

        expect(cookieAssignments).toEqual([
            '_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
            '_ga=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
            '_ga=; domain=ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        ]);
    });

    test('does not delete a parent domain for non-www hosts', () => {
        setMockDomain('service.ons.gov.uk');

        setCookie('_ga', null, { days: -1 });

        expect(cookieAssignments).toEqual([
            '_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
            '_ga=; domain=service.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        ]);
    });

    test('does not delete domain-scoped cookies on localhost', () => {
        setMockDomain('localhost');

        setCookie('_ga', null, { days: -1 });

        expect(cookieAssignments).toEqual(['_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT']);
    });

    test('deletes category cookies when consent is rejected', () => {
        mockCookieStore.ons_cookie_policy = "{'essential':true,'settings':true,'usage':true,'campaigns':true}";
        mockCookieStore._ga = 'test-value';

        setConsentCookie({ usage: false });

        expect(cookieAssignments).toContain('_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        expect(cookieAssignments).toContain('_ga=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        expect(cookieAssignments).toContain('_ga=; domain=ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    });
});
