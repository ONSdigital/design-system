import onViewportChange from '../../js/utils/viewport-change';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';
const attrDisabled = 'aria-disabled';

export default class NavigationToggle {
    constructor(toggle, navigation, hideClass) {
        this.toggle = toggle;
        this.navigation = navigation;
        this.hideClass = hideClass;
        this.searchToggleBtn = document.querySelector('.ons-js-toggle-header-search');
        this.menuBtn = document.querySelector('.ons-js-toggle-nav-menu');
        this.menuEl = document.querySelector('.ons-js-nav-menu');
        this.searchBtn = document.querySelector('.ons-btn--search');
        this.searchEl = document.querySelector('.ons-js-header-search');

        this.toggle.classList.remove('ons-u-d-no');
        this.toggle.classList.remove('disabled');
        this.setAria();
        onViewportChange(this.setAria.bind(this));
    }

    registerEvents() {
        this.toggle.addEventListener('click', this.toggleNav.bind(this));
    }

    toggleNav() {
        if (this.navigation.getAttribute(attrHidden) === 'false') {
            this.closeNav();
        } else {
            this.openNav();
        }
    }

    openNav() {
        const input = [...this.navigation.getElementsByTagName('INPUT')][0];

        this.toggle.classList.add('active');
        this.navigation.setAttribute(attrHidden, 'false');
        this.navigation.classList.remove(this.hideClass);

        if (input) {
            input.focus();
        }

        if (this.toggle === this.searchToggleBtn) {
            this.updateSearchIcon(true, this.toggle);
        }

        this.toggle.setAttribute(attrExpanded, 'true');

        this.toggleMenuAndSearch();
    }

    closeNav() {
        this.toggle.classList.remove('active');
        this.navigation.setAttribute(attrHidden, 'true');
        this.navigation.classList.add(this.hideClass);

        if (this.toggle === this.searchToggleBtn) {
            this.updateSearchIcon(false, this.toggle);
        }

        this.toggle.setAttribute(attrExpanded, 'false');
    }

    updateSearchIcon(isOpen, toggle) {
        const icons = {
            open: `
                <span class="ons-btn__inner">
                    <svg class="ons-icon ons-icon--close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" fill="currentColor" role="img" title="ons-icon-close">
                        <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM17.3143 15.5143C17.6571 15.8571 17.6571 16.3714 17.3143 16.7143L16.7143 17.3143C16.3714 17.6571 15.8571 17.6571 15.5143 17.3143L12 13.8L8.48571 17.3143C8.14286 17.6571 7.62857 17.6571 7.28571 17.3143L6.68571 16.7143C6.34286 16.3714 6.34286 15.8571 6.68571 15.5143L10.2 12L6.68571 8.48571C6.34286 8.14286 6.34286 7.62857 6.68571 7.28571L7.28571 6.68571C7.62857 6.34286 8.14286 6.34286 8.48571 6.68571L12 10.2L15.5143 6.68571C15.8571 6.34286 16.3714 6.34286 16.7143 6.68571L17.3143 7.28571C17.6571 7.62857 17.6571 8.14286 17.3143 8.48571L13.8 12L17.3143 15.5143Z"/>
                    </svg>
                    <span class="ons-btn__text"></span>
                </span>`,
            close: `
                <span class="ons-btn__inner">
                    <svg class="ons-icon ons-icon--search ons-u-mr-2xs" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" role="img" title="ons-icon-search">
                        <path d="M11.86 10.23 8.62 6.99a4.63 4.63 0 1 0-6.34 1.64 4.55 4.55 0 0 0 2.36.64 4.65 4.65 0 0 0 2.33-.65l3.24 3.23a.46.46 0 0 0 .65 0l1-1a.48.48 0 0 0 0-.62Zm-5-3.32a3.28 3.28 0 0 1-2.31.93 3.22 3.22 0 1 1 2.35-.93Z"></path>
                    </svg>
                    <span class="ons-btn__text"></span>
                </span>`,
        };
        if (isOpen != null) {
            toggle.innerHTML = isOpen ? icons.open : icons.close;
            toggle.classList.toggle('ons-btn--close', isOpen);
            toggle.classList.toggle('ons-btn--search-icon', !isOpen);
        }
    }

    isHidden(el) {
        return el.offsetParent === null;
    }

    setAria() {
        const isToggleHidden = this.isHidden(this.toggle);
        this.toggle.setAttribute(attrDisabled, 'false');

        this.searchToggleBtn?.setAttribute(attrDisabled, 'false');

        if (!isToggleHidden) {
            // close nav by default if toggle button is visible
            this.closeNav();
        } else {
            // if toggle is hidden, set nav to open (for visible desktop nav)
            this.toggle.setAttribute(attrExpanded, 'false'); // set mobile menu expanded to false if hidden
            this.navigation.removeAttribute(attrHidden);
            this.navigation.classList.remove(this.hideClass);

            if (this.hideClass !== 'ons-u-d-no') {
                this.navigation.classList.remove(this.hideClass);
            } else {
                this.closeNav();
            }
        }
    }

    toggleMenuAndSearch() {
        if (this.menuBtn) {
            const isMenuOpen = this.menuBtn.getAttribute('aria-expanded') === 'true';

            if (isMenuOpen && this.toggle == this.menuBtn && this.searchBtn) {
                this.updateSearchIcon(false, this.searchToggleBtn && this.searchBtn);
                this.searchBtn.setAttribute('aria-expanded', 'false');
                this.searchEl.setAttribute('aria-hidden', 'true');
                this.searchEl.classList.add('ons-u-d-no');
                this.searchToggleBtn.classList.remove('active');
            }
        }

        if (this.searchBtn) {
            const isSearchOpen = this.searchBtn.getAttribute('aria-expanded') === 'true';

            if (isSearchOpen && this.toggle == this.searchToggleBtn && this.menuBtn) {
                this.menuBtn.setAttribute('aria-expanded', 'false');
                this.menuEl.setAttribute('aria-hidden', 'true');
                this.menuEl.classList.add('ons-u-d-no');
                this.menuBtn.classList.remove('active');
            }
        }
    }
}
