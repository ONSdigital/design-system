export default class Btt {
  constructor(component) {
    this.component = component;
    this.content = document.querySelector('main') ?? this.component.closest('.ons-container');

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = window.innerHeight;
    const contentRect = this.content.getBoundingClientRect();
    const contentBottom = contentRect.bottom;
    const stickyThreshold = document.body.scrollTop + windowHeight * 2;

    if (scrollPosition > stickyThreshold && windowHeight < contentBottom) {
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
