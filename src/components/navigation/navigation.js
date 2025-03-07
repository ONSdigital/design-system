import onViewportChange from '../../js/utils/viewport-change';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';

export default class NavigationToggle {
    constructor(toggle, navigation, hideClass, openIcon, closeIcon) {
        this.toggle = toggle;
        this.navigation = navigation;
        this.hideClass = hideClass;
        this.closeIcon = closeIcon;
        this.openIcon = openIcon;

        this.toggle.classList.remove('ons-u-d-no');
        this.setAria();
        onViewportChange(this.setAria.bind(this));
    }

    registerEvents() {
        this.toggle.addEventListener('click', this.toggleNav.bind(this));
    }

    toggleNav() {
        const isHidden = this.navigation.getAttribute(attrHidden);
        isHidden === 'false' ? this.closeNav() : this.openNav();
    }

    openNav() {
        const input = [...this.navigation.getElementsByTagName('INPUT')][0];

        this.toggle.classList.add('active');
        this.navigation.setAttribute(attrHidden, 'false');
        this.navigation.classList.remove(this.hideClass);

        if (input) {
            input.focus();
        }

        if (this.openIcon) {
            this.openIcon.setAttribute('tabindex', '-1');
            this.openIcon.classList.add('ons-u-vh');
        }
        if (this.closeIcon) {
            this.closeIcon.classList.remove('ons-u-vh');
            this.closeIcon.setAttribute(attrExpanded, 'true');
            document.querySelector('.ons-js-search-btn-close').focus();
        } else {
            this.toggle.setAttribute(attrExpanded, 'true');
        }
        this.toggleMenuAndSearch();
    }

    closeNav() {
        this.toggle.classList.remove('active');
        this.navigation.setAttribute(attrHidden, 'true');
        this.navigation.classList.add(this.hideClass);

        if (this.openIcon) {
            this.openIcon.removeAttribute('tabindex');
            document.activeElement.previousElementSibling.focus();
            //document.querySelector('.ons-js-search-btn-open').focus();
            this.openIcon.classList.remove('ons-u-vh');
        }
        if (this.closeIcon) {
            this.closeIcon.classList.add('ons-u-vh');
            this.closeIcon.setAttribute(attrExpanded, 'false');
        } else {
            this.toggle.setAttribute(attrExpanded, 'false');
        }
    }

    isHidden(el) {
        return el.offsetParent === null;
    }

    setAria() {
        const isToggleHidden = this.isHidden(this.toggle);
        const hasAria = this.navigation.hasAttribute(attrHidden);

        if (!isToggleHidden) {
            if (!hasAria) {
                this.closeNav();
            }
        } else if (hasAria) {
            this.toggle.removeAttribute(attrExpanded);
            this.navigation.removeAttribute(attrHidden);
            if (this.hideClass !== 'ons-u-d-no') {
                this.navigation.classList.remove(this.hideClass);
            } else {
                this.closeNav();
            }
        }
    }

    toggleMenuAndSearch() {
        console.log('toggleMenuAndSearch');
        const menuBtn = document.querySelector('.ons-js-toggle-nav-menu');
        const menuEl = document.querySelector('.ons-js-nav-menu');
        const searchToggle = document.querySelector('.ons-js-toggle-header-search');
        const searchBtn = document.querySelector('.ons-js-search-btn-close');
        const searchBtnOpen = document.querySelector('.ons-js-search-btn-open');
        const searchEl = document.querySelector('.ons-js-header-search');

        const isMenuOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        const isSearchOpen = searchBtn.getAttribute('aria-expanded') === 'true';

        if (isMenuOpen && this.toggle == menuBtn) {
            searchBtn.setAttribute('aria-expanded', 'false');
            searchBtn.classList.add('ons-u-vh');
            searchBtnOpen.classList.remove('ons-u-vh');
            searchEl.setAttribute('aria-hidden', 'true');
            searchEl.classList.add('ons-u-d-no');
            searchToggle.classList.remove('active');
        }

        if (isSearchOpen && this.toggle == searchToggle) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuEl.setAttribute('aria-hidden', 'true');
            menuEl.classList.add('ons-u-d-no');
            menuBtn.classList.remove('active');
        }
    }
}
