export default class Video {
  constructor(component) {
    this.component = component;
    this.placeholder = component.querySelector('.ons-js-video-placeholder');
    this.iframe = component.querySelector('.ons-js-video-iframe');

    this.acceptCookiesButton = document.querySelector('.ons-js-accept-cookies');
    if (this.acceptCookiesButton) {
      this.acceptCookiesButton.addEventListener('click', this.showIframe.bind(this));
    }

    const allowsVideoEmbed = this.checkCookie();
    if (allowsVideoEmbed) {
      this.showIframe();
    }
  }

  checkCookie() {
    const campaignsCookieRegex = /^(.*)?\s*'campaigns':true\s*[^;]+(.*)?$/;
    const cookieMatch = document.cookie.match(campaignsCookieRegex);
    return !!cookieMatch;
  }

  showIframe() {
    const src = this.iframe.getAttribute('data-src');
    this.iframe.src = src;
    this.iframe.classList.remove('ons-u-d-no');
    this.component.classList.add('ons-video--hasIframe');
    this.placeholder.classList.add('ons-u-d-no');
  }
}
