export default class Details {
    constructor(detailsElement) {
        this.saveState = detailsElement.getAttribute('data-save-state') === 'true';
        this.open = detailsElement.getAttribute('data-open') === 'true';
        this.group = detailsElement.getAttribute('data-group');

        // Elements
        this.details = detailsElement;
        this.detailsHeader = this.details.querySelector('.ons-js-details-heading');
        this.bannerContent = document.querySelector('.ons-js-banner-details-content');
        this.correctionNotice = document.querySelector('.ons-correction-notice');
        if (this.bannerContent) {
            this.content = this.bannerContent;
            this.bannerTitle = this.details.querySelector('.ons-banner__details-title');
        } else {
            this.content = this.details.querySelector('.ons-js-details-content');
        }
        // Initialise
        const detailsId = detailsElement.getAttribute('id');

        this.details.setAttribute('role', 'group');
        this.detailsHeader.setAttribute('role', 'link');
        this.detailsHeader.setAttribute('aria-controls', detailsId);
        this.detailsHeader.setAttribute('tabindex', 0);

        if (localStorage.getItem(detailsId) || this.open) {
            this.setOpen(true);
        } else {
            this.setOpen(false);
        }

        this.detailsHeader.addEventListener('click', this.toggle.bind(this));
        this.detailsHeader.addEventListener('keydown', this.keyboardInteraction.bind(this));
        if (this.bannerContent) {
            this.correctionNotice.classList.add('ons-correction-notice--initialised');
            this.bannerTitle.textContent = 'Show detail';
        } else {
            this.details.classList.add('ons-details--initialised');
        }
    }

    toggle(event) {
        event.preventDefault();
        this.setOpen(!this.isOpen);
    }

    setOpen(open) {
        if (open !== this.isOpen) {
            const action = open ? 'Open' : 'Close';
            const cls = open ? 'add' : 'remove';
            const openAttribute = open ? 'set' : 'remove';
            const setText = open ? 'Close detail' : 'Show detail';

            this.isOpen = open;
            this.details[`${openAttribute}Attribute`]('open', '');
            if (this.bannerContent) {
                this.correctionNotice.classList[cls]('ons-correction-notice--open');
                this.bannerTitle.textContent = setText;
            } else {
                this.details.classList[cls]('ons-details--open');
            }
            this.detailsHeader.setAttribute('aria-expanded', open);
            this.content.setAttribute('aria-hidden', !open);
            this.detailsHeader.setAttribute('data-ga-action', `${action} panel`);

            if (this.onOpen && this.onClose) {
                if (open) {
                    this.onOpen();
                } else {
                    this.onClose();
                }
            }
        }

        if (this.saveState === true && open === true) {
            localStorage.setItem(this.details.getAttribute('id'), true);
        } else {
            localStorage.removeItem(this.details.getAttribute('id'));
        }
    }

    keyboardInteraction(event) {
        const keyCode = event.which;
        switch (keyCode) {
            // Enter/Space
            case 13:
            case 32:
                event.preventDefault();
                event.stopPropagation();

                this.toggle(event);
                break;
        }
    }
}
