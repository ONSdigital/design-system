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

        this.stickyTocContainer = this.component.querySelector('.ons-grid__col--sticky\\@m');
        this.isOverflowing =
            this.stickyTocContainer.scrollHeight > window.innerHeight - this.stickyTocContainer.getBoundingClientRect().top;

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            rootMargin: '0px 0px -100% 0px', // trigger when top of section is at the top of viewport
        });

        this.sections.forEach((section) => this.observer.observe(section));

        this.updateOverflowClass();

        const resizeObserver = new ResizeObserver(() => {
            this.isOverflowing = this.stickyTocContainer.scrollHeight > this.stickyTocContainer.clientHeight;
            this.updateOverflowClass();
        });
        resizeObserver.observe(this.stickyTocContainer);

        this.setInitialActiveSection();
    }

    getLinkList() {
        // Returns ordered array of links matching section order
        return this.sections.map((section) => this.tocLinks[section.id]).filter(Boolean);
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
            if (!link) continue;

            const isActive = section === this.activeSection;
            link.classList.toggle('ons-table-of-contents__link-active', isActive);

            // Roving tabindex: only the active link is reachable via Tab
            link.setAttribute('tabindex', isActive ? '0' : '-1');
        }
    }

    updateOverflowClass() {
        this.stickyTocContainer.classList.toggle('has-scrollbar', this.isOverflowing);
    }
}
