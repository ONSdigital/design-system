export default class TableOfContents {
    constructor(component) {
        this.component = component;
        //this.content = this.component.previousElementSibling;
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

        // const gridCol = document.querySelector('.ons-grid__col');
        // if (!gridCol) return;
        // // Get the number of TOC items
        // const tocItems = this.component.querySelectorAll('.ons-list__link');
        // const tocItemCount = tocItems.length;

        // // Get the height of the TOC container
        // const tocRect = this.component.getBoundingClientRect();
        // const tocHeight = tocRect.height;
        // const windowHeight = window.innerHeight;

        // // Set sticky only if less than 20 items and TOC fits in viewport
        // if (tocItemCount < 6 && tocHeight > windowHeight) {
        //     console.log('TOC item count is:', tocItemCount);
        //     console.log('Setting TOC as sticky');
        //     gridCol.classList.add('ons-grid__col--sticky@m');
        // } else {
        //     console.log('TOC item count is:', tocItemCount);
        //     console.log('Removing sticky from TOC');
        //     gridCol.classList.remove('ons-grid__col--sticky@m');
        // }
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
