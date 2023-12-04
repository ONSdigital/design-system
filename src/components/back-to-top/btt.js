export default class Btt {
  constructor(component) {
    this.component = component;
    console.log(this.component);
    console.log('return this');
    this.footerElement = document.querySelector('.ons-footer');

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const stickyThreshold = windowHeight * 0.25;

    if (scrollPosition < stickyThreshold) {
      this.setHidden();
    } else if (scrollPosition >= stickyThreshold) {
      this.setSticky();
    } else {
      this.setEnabled();
    }
  }

  setSticky() {
    this.component.classList.remove('ons-back-to-top__enabled', 'ons-back-to-top__hidden');
    this.component.classList.add('ons-back-to-top__sticky');
  }

  setEnabled() {
    this.component.classList.remove('ons-back-to-top__sticky', 'ons-back-to-top__hidden');
    this.component.classList.add('ons-back-to-top__enabled');
  }

  setHidden() {
    this.component.classList.remove('ons-back-to-top__enabled', 'ons-back-to-top__sticky');
    this.component.classList.add('ons-back-to-top__hidden');
  }
}
