export default class TableOfContents {
    constructor(component) {
        this.component = component;
        this.sections = [...this.component.querySelectorAll('section[id]')].filter((section) => section.id);
        this.tocLinks = {};
        this.activeSection = null;

        this.sections.forEach((section) => {
            const link = this.component.querySelector(`.ons-list__link[href="#${section.id}"]`);
            if (link) {
                this.tocLinks[section.id] = link;
            }
        });

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            rootMargin: '0px 0px -100% 0px', // trigger when top of section is at the top of viewport
        });

        this.sections.forEach((section) => this.observer.observe(section));

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

    updateTocLinks() {
        for (const section of this.sections) {
            const link = this.tocLinks[section.id];

            // toggle active link class when link id matches current section id
            link?.classList.toggle('ons-table-of-contents__link-active', section === this.activeSection);
        }
    }
}
