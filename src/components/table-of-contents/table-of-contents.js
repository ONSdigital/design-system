export default class TableOfContents {
    constructor(component) {
        this.component = component;
        this.sections = [...this.component.querySelectorAll('section[id]')];
        this.refreshIntervalId = setInterval(() => this.setCurrent(), 100);
        this.setCurrent();
    }

    setCurrent() {
        let activeSection = this.sections[0];
        for (let section of this.sections) {
            const top = section.getBoundingClientRect().top;
            if (top > 100) {
                break;
            }

            activeSection = section;

            if (top >= 0 && top <= 100) {
                break;
            }
        }

        if (activeSection === this.activeSection) {
            return;
        }

        this.activeSection = activeSection;

        for (let section of this.sections) {
            const tocItem = document.querySelector(`.ons-table-of-contents .ons-list__link[href="#${section.id}"]`);
            if (section === activeSection) {
                tocItem.classList.add('ons-table-of-contents__link-active');
            } else {
                tocItem.classList.remove('ons-table-of-contents__link-active');
            }
        }
    }
}
