export default class BackToTop {
    constructor(component) {
        this.component = component;
        this.content = this.component.previousElementSibling;
        this.target = document.getElementById(this.component.firstElementChild.href.split('#')[1]);
        this.contentleft;
        this.updateContentDetails();

        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);

        window.addEventListener('resize', () => {
            this.setEnabled();
            this.updateContentDetails();
            this.handleScroll();
        });

        this.component.addEventListener('click', () => {
            this.component.firstElementChild.blur();
        });
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

    setSticky() {
        this.component.classList.remove('ons-back-to-top__enabled');
        this.component.classList.add('ons-back-to-top__sticky');
        this.component.firstElementChild.children[0].style.marginLeft = `${this.contentleft}px`;
    }

    setEnabled() {
        this.updateContentDetails();
        this.component.classList.remove('ons-back-to-top__sticky');
        this.component.classList.add('ons-back-to-top__enabled');
        this.component.firstElementChild.children[0].style.marginLeft = '';
    }

    updateContentDetails() {
        this.contentleft = this.component.getBoundingClientRect().left;
    }
}
