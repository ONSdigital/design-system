export default class Btt {
  constructor(component) {
    this.component = component;
    this.footerElement = document.querySelector('.ons-footer');

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const stickyThreshold = windowHeight * 0.4;
    let isfooterVisible = true;

    if (this.footerElement) {
      this.footerRect = this.footerElement.getBoundingClientRect();
      isfooterVisible = this.footerRect.top - windowHeight < 0;
    }

    if (scrollPosition < stickyThreshold) {
      this.setHidden();
    } else if (scrollPosition >= stickyThreshold && !isfooterVisible) {
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
