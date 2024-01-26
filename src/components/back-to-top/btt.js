export default class Btt {
  constructor(component) {
    this.component = component;
    this.content = this.component.previousElementSibling;
    this.target = document.getElementById(this.component.firstElementChild.href.split('#')[1]);

    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let scrollPosition = window.scrollY + window.innerHeight;

    if (this.target) {
      scrollPosition = -this.target.getBoundingClientRect().top + window.innerHeight;
    }

    const contentRect = this.content.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const contentBottom = contentRect.bottom;
    const stickyThreshold = windowHeight * 2;

    console.log(scrollPosition, stickyThreshold, windowHeight, contentBottom);

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
