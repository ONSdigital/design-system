const DEFAULT_COOKIE_CONSENT = {
  essential: true,
  settings: true,
  usage: true,
  campaigns: true,
};

const COOKIE_CATEGORIES = {
  cookie_policy: 'essential',
  seen_cookie_message: 'essential',
  _ga: 'usage',
  _gid: 'usage',
  _gat: 'usage',
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
  setCookie('cookie_policy', JSON.stringify(DEFAULT_COOKIE_CONSENT), { days: 365 });
}

export function approveAllCookieTypes() {
  setDefaultConsentCookie();
}

export function getConsentCookie() {
  const consentCookie = cookie('cookie_policy');
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
  if (cookieName === 'cookie_policy' || (cookieValue === null || cookieValue === false)) {
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
