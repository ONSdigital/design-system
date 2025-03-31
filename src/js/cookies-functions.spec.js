/** @jest-environment jsdom */
import { getDomain } from './cookies-functions';

describe('script: cookies-function', () => {
    function mockURL(url) {
        Object.defineProperty(window, 'location', {
            value: new URL(url),
            writable: true,
        });
    }

    test('should service-manual.ons.gov.uk', () => {
        mockURL('http://service-manual.ons.gov.uk/path');
        expect(window.location.hostname).toBe('service-manual.ons.gov.uk');
        expect(getDomain(window.location.hostname)).toBe('service-manual.ons.gov.uk');
    });

    test('should nwp-prototype.ons.gov.uk ', () => {
        mockURL('http://nwp-prototype.ons.gov.uk/path');
        expect(window.location.hostname).toBe('nwp-prototype.ons.gov.uk');
        expect(getDomain(window.location.hostname)).toBe('nwp-prototype.ons.gov.uk');
    });

    test('should return ons.gov.uk for www.ons.gov.uk', () => {
        mockURL('https://www.ons.gov.uk');

        expect(window.location.hostname).toBe('www.ons.gov.uk');
        expect(getDomain(window.location.hostname)).toBe('ons.gov.uk');
    });
});
