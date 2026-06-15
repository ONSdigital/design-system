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

        this.initKeyboardNavigation();
        this.setInitialActiveSection();
    }

    getLinkList() {
        // Returns ordered array of links matching section order
        return this.sections.map((section) => this.tocLinks[section.id]).filter(Boolean);
    }

    initKeyboardNavigation() {
        if (!this.isOverflowing) return;
        const links = this.getLinkList();

        links.forEach((link, index) => {
            // All links removed from natural tab order; active link re-added in updateTocLinks
            link.setAttribute('tabindex', '-1');

            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = links[index + 1];
                    if (next) next.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = links[index - 1];
                    if (prev) prev.focus();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    links[0].focus();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    links[links.length - 1].focus();
                }
            });
        });
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

        this.scrollActiveLinkIntoView();
    }

    scrollActiveLinkIntoView() {
        if (!this.isOverflowing) return;
        if (!this.activeSection) return;

        const activeLink = this.tocLinks[this.activeSection.id];

        if (!activeLink || !this.stickyTocContainer) return;

        const containerRect = this.stickyTocContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const topBuffer = containerRect.height * 0.25;
        const bottomBuffer = containerRect.height * 0.75;

        const relativeTop = linkRect.top - containerRect.top;

        if (relativeTop > topBuffer && relativeTop < bottomBuffer) {
            return;
        }

        const targetScrollTop =
            this.stickyTocContainer.scrollTop +
            (linkRect.top - containerRect.top) -
            this.stickyTocContainer.clientHeight / 2 +
            activeLink.offsetHeight / 2;

        this.stickyTocContainer.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
        });
    }

    updateOverflowClass() {
        this.stickyTocContainer.classList.toggle('has-scrollbar', this.isOverflowing);
    }
}
