/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://www.ons.gov.uk/"}
 */

import { extractDomainFromUrl, setConsentCookie, setCookie } from './cookies-functions';

let cookieAssignments = [];
let mockCookieStore = {};

function setCookieDomain(domain) {
    const banner = document.createElement('div');
    banner.className = 'ons-cookies-banner';
    banner.setAttribute('data-ons-cookie-domain', domain);
    document.body.appendChild(banner);
}

function getLastCookieAssignment() {
    return cookieAssignments[cookieAssignments.length - 1];
}

describe('script: cookies-functions', () => {
    beforeEach(() => {
        cookieAssignments = [];
        mockCookieStore = {};
        document.body.innerHTML = '';

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

    test('uses the Go port domain rule for known hosts', () => {
        expect(extractDomainFromUrl('www.ons.gov.uk')).toBe('www.ons.gov.uk');
        expect(extractDomainFromUrl('eq.census.gov.uk')).toBe('eq.census.gov.uk');
        expect(extractDomainFromUrl('service.onsdigital.uk')).toBe('service.onsdigital.uk');
        expect(extractDomainFromUrl('service.co.uk')).toBe('service.co.uk');
    });

    test('does not set a domain for local or unrecognised hosts', () => {
        expect(extractDomainFromUrl('localhost')).toBe('');
        expect(extractDomainFromUrl('127.0.0.1')).toBe('');
        expect(extractDomainFromUrl('service.example.com')).toBe('');
    });

    test('sets a domain cookie by default on a known hostname', () => {
        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(cookieAssignments).toHaveLength(1);
        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; domain=www.ons.gov.uk; path=/');
    });

    test('does not expire other scopes before setting banner state', () => {
        setCookie('ons_cookie_message_displayed', 'true', { days: 365 });

        expect(cookieAssignments).toHaveLength(1);
        expect(getLastCookieAssignment()).toContain('ons_cookie_message_displayed=true; domain=www.ons.gov.uk; path=/');
    });

    test('does not expire other scopes before setting other cookie categories', () => {
        setCookie('_ga', 'test-value', { days: 365 });

        expect(cookieAssignments).toHaveLength(1);
        expect(getLastCookieAssignment()).toContain('_ga=test-value; domain=www.ons.gov.uk; path=/');
    });

    test('sets domain cookies when `domain` is provided', () => {
        setCookieDomain('census.gov.uk');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; domain=census.gov.uk; path=/');
    });

    test('sets host-only cookies when `domain` is explicitly false', () => {
        setCookieDomain('');

        setCookie('ons_cookie_policy', 'test-value', { days: 365 });

        expect(cookieAssignments).toHaveLength(1);
        expect(getLastCookieAssignment()).toContain('ons_cookie_policy=test-value; path=/');
        expect(getLastCookieAssignment()).not.toMatch(/; domain=/i);
    });

    test('deletes only the default domain scope', () => {
        setCookie('_ga', null, { days: -1 });

        expect(cookieAssignments).toEqual(['_ga=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure']);
    });

    test('deletes only the configured domain scope', () => {
        setCookieDomain('census.gov.uk');

        setCookie('_ga', null, { days: -1 });

        expect(cookieAssignments).toEqual(['_ga=; domain=census.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure']);
    });

    test('deletes category cookies when consent is rejected', () => {
        mockCookieStore.ons_cookie_policy = "{'essential':true,'settings':true,'usage':true,'campaigns':true}";
        mockCookieStore._ga = 'test-value';

        setConsentCookie({ usage: false });

        expect(cookieAssignments).toContain('_ga=; domain=www.ons.gov.uk; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure');
    });
});
