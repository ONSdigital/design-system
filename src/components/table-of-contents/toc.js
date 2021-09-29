export default class Toc {
  constructor(component) {
    this.component = component;
    this.page = this.component.closest('html');
    this.headings = this.component.querySelectorAll('section[id]');
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -70% 0px',
      threshold: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    this.observe = new IntersectionObserver(this.setCurrent, this.observerOptions);
    this.addIntersectionObserver();
  }

  addIntersectionObserver() {
    this.headings.forEach(heading => {
      this.observe.observe(heading);
    });
  }

  setCurrent(event) {
    event.map(element => {
      const position = element.boundingClientRect;
      document
        .querySelector(`.ons-toc li a[href="#${element.target.id}"]`)
        .classList[element.isIntersecting === true && position.top < 70 && position.top > -100 ? 'add' : 'remove']('ons-toc__link-active');
    });
  }
}
