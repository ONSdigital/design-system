export default class TableOfContents {
    constructor(component) {
        this.component = component;
        this.sections = [...this.component.querySelectorAll('section[id]')].filter((section) => section.id);
        this.tocLinks = {};
        this.activeSection = null;

        this.ticking = false;
        const tableOfContentsContainer = this.component.querySelector('.ons-table-of-contents-container');
        this.scrollEndThreshold = parseInt(tableOfContentsContainer.dataset.scrollEndThreshold, 10) || 50;

        this.sections.forEach((section) => {
            const link = this.component.querySelector(`.ons-list__link[href="#${section.id}"]`);
            if (link) {
                this.tocLinks[section.id] = link;
            }
        });

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            rootMargin: '0px 0px -100% 0px', // trigger when top of section is at the top of viewport
        });

        this.sections.forEach((section) => {
            this.observer.observe(section);
        });

        this.handleScrollBound = this.handleScroll.bind(this);

        window.addEventListener('scroll', this.handleScrollBound, { passive: true });

        this.setInitialActiveSection();
    }

    setInitialActiveSection() {
        const firstSection = this.sections[0];
        if (!firstSection) return;

        this.activeSection = firstSection;
        this.updateTocLinks();
    }

    handleIntersect(entries) {
        // Find the topmost visible section
        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

        if (visibleSections.length === 0) return;

        const newActive = visibleSections[0].target;

        if (newActive === this.activeSection) return;

        this.activeSection = newActive;
        this.updateTocLinks();
    }

    handleScroll() {
        if (this.ticking) return;

        this.ticking = true;

        requestAnimationFrame(() => {
            this.ticking = false;

            const distanceFromBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);

            const nearBottom = distanceFromBottom <= this.scrollEndThreshold;

            const currentSection = nearBottom ? this.getLastSection() : this.getSectionInView();

            if (currentSection && this.activeSection !== currentSection) {
                this.activeSection = currentSection;
                this.updateTocLinks();
            }
        });
    }

    getLastSection() {
        return this.sections[this.sections.length - 1];
    }

    getSectionInView() {
        return this.sections.reduce((best, section) => {
            return section.getBoundingClientRect().top <= 0 ? section : best;
        }, this.sections[0]);
    }

    updateTocLinks() {
        for (const section of this.sections) {
            const link = this.tocLinks[section.id];

            // toggle active link class when link id matches current section id
            link?.classList.toggle('ons-table-of-contents__link-active', section === this.activeSection);
        }
    }

    destroy() {
        this.observer.disconnect();
        window.removeEventListener('scroll', this.handleScrollBound);
    }
}
