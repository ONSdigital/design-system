export const DEFAULT_COOKIE_CONSENT = {
    essential: true,
    settings: false,
    usage: false,
    campaigns: false,
};

export const COOKIE_CATEGORIES = {
    RH_SESSION: 'essential',
    session: 'essential',
    ons_cookie_policy: 'essential',
    ons_cookie_message_displayed: 'essential',
    _ga: 'usage',
    _gid: 'usage',
    _gat: 'usage',
    _use_hitbox: 'campaigns',
    VISITOR_INFO1_LIVE: 'campaigns',
    _fbp: 'campaigns',
    COOKIE_SUPPORT: 'essential',
    GUEST_LANGUAGE_ID: 'essential',
    JSESSIONID: 'essential',
    ID: 'essential',
    COMPANY_ID: 'essential',
    USER_UUID: 'essential',
    LFR_SESSION_STATE_: 'essential',
    csfcfc: 'essential',
};

export function cookie(name, value, options) {
    if (typeof value !== 'undefined') {
        if (value === false || value === null) {
            return setCookie(name, '', { days: -1 });
        } else {
            if (typeof options === 'undefined') {
                options = { days: 30 };
            }
            return setCookie(name, value, options);
        }
    } else {
        return getCookie(name);
    }
}

export function setDefaultConsentCookie() {
    const defaultConsentCookie = JSON.stringify(DEFAULT_COOKIE_CONSENT).replace(/"/g, "'");
    setCookie('ons_cookie_policy', defaultConsentCookie, { days: 365 });
}

export function approveAllCookieTypes() {
    let approvedConsent = {
        essential: true,
        settings: true,
        usage: true,
        campaigns: true,
    };

    setCookie('ons_cookie_policy', JSON.stringify(approvedConsent).replace(/"/g, "'"), { days: 365 });
}

export function getConsentCookie() {
    const consentCookie = cookie('ons_cookie_policy');
    let consentCookieObj;

    if (consentCookie) {
        consentCookieObj = JSON.parse(consentCookie.replace(/'/g, '"'));

        if (typeof consentCookieObj !== 'object' && consentCookieObj !== null) {
            consentCookieObj = JSON.parse(consentCookieObj.replace(/'/g, '"'));
        }
    } else {
        return null;
    }
    return consentCookieObj;
}

export function setConsentCookie(options) {
    let cookieConsent = getConsentCookie();
    if (!cookieConsent) {
        cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT).replace(/'/g, '"'));
    }
    for (let cookieType in options) {
        cookieConsent[cookieType] = options[cookieType];
        if (!options[cookieType]) {
            for (let cookies in COOKIE_CATEGORIES) {
                if (COOKIE_CATEGORIES[cookies] === cookieType) {
                    cookie(cookies, null);
                }
            }
        }
    }
    setCookie('ons_cookie_policy', JSON.stringify(cookieConsent).replace(/"/g, "'"), { days: 365 });
}

export function checkConsentCookieCategory(cookieName, cookieCategory) {
    let currentConsentCookie = getConsentCookie();
    if (!currentConsentCookie && COOKIE_CATEGORIES[cookieName]) {
        return true;
    }

    currentConsentCookie = getConsentCookie();
    try {
        return currentConsentCookie[cookieCategory];
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function checkConsentCookie(cookieName, cookieValue) {
    // If we're setting the consent, session or RH_SESSION cookie OR deleting a cookie, allow by default
    if (cookieName === 'ons_cookie_policy' || cookieValue === null || cookieValue === false) {
        return true;
    }

    if (COOKIE_CATEGORIES[cookieName]) {
        const cookieCategory = COOKIE_CATEGORIES[cookieName];
        return checkConsentCookieCategory(cookieName, cookieCategory);
    } else {
        // Deny the cookie if it is not known to us
        return false;
    }
}

export function setCookie(name, value, options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    if (options.days && options.days < 0) {
        deleteCookie(name);
        return;
    }

    if (checkConsentCookie(name, value)) {
        let cookieString = name + '=' + value + getCookieDomainAttribute() + '; path=/';
        if (options.days) {
            const date = new Date();
            date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
            cookieString = cookieString + '; expires=' + date.toGMTString();
        }
        if (document.location.protocol === 'https:') {
            cookieString = cookieString + '; Secure';
        }
        document.cookie = cookieString;
    }
}

export function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0, len = cookies.length; i < len; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function getCookieDomainPolicy() {
    const banner = document.querySelector('.ons-cookies-banner');
    const policy = banner ? banner.getAttribute('data-ons-cookie-domain-policy') : null;

    switch (policy) {
        case 'domain':
        case 'exact-host':
            return policy;
        default:
            return 'exact-host';
    }
}

function getCookieDomainAttribute() {
    const domain = getCurrentDomain();

    if (getCookieDomainPolicy() !== 'domain' || !canSetCookieDomain(domain)) {
        return '';
    }

    return '; domain=' + domain;
}

function deleteCookie(name) {
    const expires = new Date(0).toGMTString();
    const secure = document.location.protocol === 'https:' ? '; Secure' : '';

    document.cookie = name + '=; path=/; expires=' + expires + secure;

    getLegacyCookieDomainsToExpire().forEach((domain) => {
        document.cookie = name + '=; domain=' + domain + '; path=/; expires=' + expires + secure;
    });
}

function getLegacyCookieDomainsToExpire() {
    const domain = getCurrentDomain();
    const domains = [];

    if (canSetCookieDomain(domain)) {
        domains.push(domain);
    }

    if (domain && domain.startsWith('www.')) {
        domains.push(domain.substring(4));
    }

    return [...new Set(domains)];
}

function getCurrentDomain() {
    return document.domain || document.location.hostname;
}

function canSetCookieDomain(domain) {
    return domain && domain.indexOf('localhost') === -1;
}
