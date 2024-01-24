export default class Btt {
  constructor(component) {
    this.component = component;
    this.content = this.component.parentElement;
    this.target = document.getElementById(this.component.firstElementChild.href.split('#')[1]);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('scroll', this.handleScroll);

    // Initialize Resize Observer
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.content);
    this.componentheight = this.component.getBoundingClientRect().height;

    // Initial setup
    this.updateMinHeight();
    this.handleScroll();
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

    if (scrollPosition > stickyThreshold && windowHeight < contentBottom) {
      this.setSticky();
    } else {
      this.setEnabled();
    }
  }

  handleResize(entries) {
    // Handle resize events, e.g., update min height
    this.updateMinHeight();
    this.handleScroll(); // Recheck scroll position after resize
  }

  updateMinHeight() {
    const newMinHeight = this.content.getBoundingClientRect().height;
    const minHeightChange = Math.abs(newMinHeight - this.contentminHeight);

    // Check if the change in min height is more than 10 pixels
    if (minHeightChange > this.componentheight) {
      // Update min height and perform additional actions if needed
      this.contentminHeight = newMinHeight;
      // Additional actions here...
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
