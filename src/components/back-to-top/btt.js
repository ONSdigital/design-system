export default class Btt {
  constructor(component) {
    this.component = component;
    this.maincontent = document.querySelector('main');

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    // When the viewport is below the scroll threshold and above the location on the page where the BTT appears in main content, it shoudld be sticky
    // otherwise it should be enabled

    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = window.innerHeight;
    const maincontentRect = this.maincontent.getBoundingClientRect();
    const maincontentBottom = maincontentRect.bottom;

    // console.log(scrollPosition, ' scrollposition bottom: ' + scrollPositionBottom + ' maincontenttop: ' + maincontenttop);
    // console.log(window.innerHeight, maincontentRect.bottom);

    const stickyThreshold = document.body.scrollTop + windowHeight * 2;

    console.log(scrollPosition, stickyThreshold, scrollPosition > stickyThreshold);
    console.log(windowHeight, maincontentBottom, windowHeight < maincontentBottom);

    if (scrollPosition > stickyThreshold && windowHeight < maincontentBottom) {
      this.setSticky();
    } else {
      this.setEnabled();
    }
  }

  setSticky() {
    this.component.classList.remove('ons-back-to-top__enabled');
    this.component.classList.add('ons-back-to-top__sticky');
  }

  setEnabled() {
    this.component.classList.remove('ons-back-to-top__sticky');
    this.component.classList.add('ons-back-to-top__enabled');
  }
}
