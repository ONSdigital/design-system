export const DEFAULT_COOKIE_CONSENT = {
  essential: true,
  settings: true,
  usage: true,
  campaigns: true,
};

export const COOKIE_CATEGORIES = {
  licensing_session: 'essential',
  ons_cookie_policy: 'essential',
  ons_cookie_message_displayed: 'essential',
  _ga: 'usage',
  _gid: 'usage',
  _gat: 'usage',
  _use_hitbox: 'campaigns',
  VISITOR_INFO1_LIVE: 'campaigns',
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
  setCookie('ons_cookie_policy', JSON.stringify(DEFAULT_COOKIE_CONSENT), { days: 365 });
}

export function approveAllCookieTypes() {
  setDefaultConsentCookie();
}

export function getConsentCookie() {
  const consentCookie = cookie('ons_cookie_policy');
  let consentCookieObj;

  if (consentCookie) {
    consentCookieObj = JSON.parse(consentCookie);

    if (typeof consentCookieObj !== 'object' && consentCookieObj !== null) {
      consentCookieObj = JSON.parse(consentCookieObj);
    }
  } else {
    return null;
  }
  return consentCookieObj;
}

export function setConsentCookie(options) {
  let cookieConsent = getConsentCookie();
  if (!cookieConsent) {
    cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT));
  }

  for (let cookieType in options) {
    cookieConsent[cookieType] = options[cookieType];

    if (!options[cookieType]) {
      for (let cookies in COOKIE_CATEGORIES) {
        if (COOKIE_CATEGORIES[cookies] === cookieType) {
          cookie(cookies, null);

          if (cookie(cookies)) {
            document.cookie = cookies + '=;expires=' + new Date() + ';domain=' + window.location.hostname + ';path=/';
          }
        }
      }
    }
  }
  setCookie('ons_cookie_policy', JSON.stringify(cookieConsent), { days: 365 });
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
  if (cookieName === 'ons_cookie_policy' || (cookieValue === null || cookieValue === false)) {
    return true;
  }

  if (COOKIE_CATEGORIES[cookieName]) {
    const cookieCategory = COOKIE_CATEGORIES[cookieName];

    return checkConsentCookieCategory(cookieName, cookieCategory);
  } else {
    return false;
  }
}

export function setCookie(name, value, options) {
  if (checkConsentCookie(name, value)) {
    if (typeof options === 'undefined') {
      options = {};
    }

    let cookieString = name + '=' + value + '; path=/';

    if (options.days) {
      const date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookieString = cookieString + '; expires=' + date.toGMTString();
    }
    if (document.location.protocol === 'https:') {
      cookieString = cookieString + '; Secure';
    }
    // const domain = window.location.hostname;
    // cookieString = cookieString + '; domain=' + domain;
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
