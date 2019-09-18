export const DEFAULT_COOKIE_CONSENT = {
  essential: true,
  settings: true,
  usage: true,
  campaigns: true,
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
  setDefaultConsentCookie();
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
  const domain = getDomain(document.domain);

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
          if (cookie(cookies)) {
            const cookieString = cookies + '=; expires=' + new Date() + '; domain=' + domain + '; path=/';
            document.cookie = cookieString;
            console.log('remove cookie:', cookieString);
          }
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
  const domain = getDomain(document.domain);
  const setDomain = !domain.indexOf('locahost') ? '; domain=' + domain : '';

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
    console.log('domain:', setDomain);
    cookieString = cookieString + setDomain;
    if (document.location.protocol === 'https:') {
      cookieString = cookieString + '; Secure';
    }
    console.log('set cookie:', cookieString);
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

export function getDomain(domain) {
  let i = 0,
    domainName = domain,
    p = domainName.split('.'),
    s = '_gd' + new Date().getTime();
  while (i < p.length - 1 && document.cookie.indexOf(s + '=' + s) == -1) {
    domainName = p.slice(-1 - ++i).join('.');
    document.cookie = s + '=' + s + ';domain=' + domainName + ';';
  }
  document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domainName + ';';
  return domainName;
}
