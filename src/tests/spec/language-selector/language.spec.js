import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/language-selector/_template.njk';
import LanguageSelector from 'components/language-selector/language';
import eventMock from 'stubs/event.stub.spec';
import { throttle } from 'throttle-typescript';

const params = {
  allLanguagesUrl: '#',
  languages: [
    {
      url: '#',
      ISOCode: 'en-GB',
      text: 'English',
      buttonAriaLabel: 'Language selector. Current language: English',
      chooseLanguage: 'Choose language',
      allLanguages: 'All languages',
      current: true
    },
    {
      url: '#',
      ISOCode: 'cy',
      text: 'Cymraeg',
      buttonAriaLabel: 'Dewisydd iaith. Iaith gyfredol: Cymraeg',
      chooseLanguage: 'Dewiswch iaith',
      allLanguages: 'Pob iaith',
      current: false
    },
    {
      url: '#',
      ISOCode: 'ga',
      text: 'Gaeilge',
      buttonAriaLabel: 'Roghnóir teanga. Teanga reatha: Gaeilge',
      chooseLanguage: 'Roghnaigh teanga',
      allLanguages: 'Gach teanga',
      current: false
    },
    {
      url: '#',
      ISOCode: 'sco',
      text: 'Ulstèr-Scotch',
      buttonAriaLabel: 'Leid selectgor. Current leid: Ulstèr-Scotch',
      chooseLanguage: 'Wale leid',
      allLanguages: 'Ilka leid',
      current: false
    }
  ]
};

describe('Component: Language Selector', () => {
  before(() => awaitPolyfills);

  describe('When the component boots', () => {
    beforeEach(function() {
      const component = renderComponent();

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    it('the non-js link should be hidden', function() {
      expect(this.link.classList.contains('u-d-no')).to.be.true;
    });

    it('the selector button should be made visible', function() {
      expect(this.button.classList.contains('u-d-no')).to.be.false;
    });

    it('the item list should be made visible', function() {
      expect(this.itemsContainer.classList.contains('u-d-no')).to.be.false;
    });

    it('the aria-attributes should be added', function() {
      expect(this.button.hasAttribute('aria-label')).to.be.true;
      expect(this.button.getAttribute('aria-label')).to.equal(this.currentLanguage.buttonAriaLabel);
      expect(this.button.hasAttribute('aria-haspopup')).to.be.true;
      expect(this.button.getAttribute('aria-haspopup')).to.equal('true');
      expect(this.button.hasAttribute('aria-expanded')).to.be.true;
      expect(this.button.getAttribute('aria-expanded')).to.equal('false');
      expect(this.button.hasAttribute('aria-controls')).to.be.true;
      expect(this.button.getAttribute('aria-controls')).to.equal(this.itemsContainer.getAttribute('id'));
      expect(this.itemsContainer.hasAttribute('role')).to.be.true;
      expect(this.itemsContainer.getAttribute('role')).to.equal('menu');

      this.items.every(item => {
        expect(item.hasAttribute('role')).to.be.true;
        expect(item.getAttribute('role')).to.equal('menuitem');
        expect(item.hasAttribute('tabindex')).to.be.true;
        expect(item.getAttribute('tabindex')).to.equal('-1');
      });
    });

    describe('and toggle is called', function() {
      it('event propagation should be stopped', function() {
        const mockedEvent = eventMock();

        this.languageSelector.toggle(mockedEvent);

        expect(mockedEvent.stopPropagation).to.have.been.called();
      });
    });

    describe('and menu is not open', function() {
      describe('when button is clicked', function() {
        beforeEach(function() {
          this.languageSelector.setOpen = chai.spy(this.languageSelector.setOpen);
          this.languageSelector.throttledSetOpen = throttle(this.languageSelector.setOpen);

          this.languageSelector.toggle(eventMock());
          this.languageSelector.throttledSetOpen(true);
        });

        it('setOpen should be throttled and only called once', function() {
          expect(this.languageSelector.setOpen).to.be.spy;
          expect(this.languageSelector.setOpen).to.have.been.called.once;
        });

        it('aria attributes should be set to reflect open menu', function() {
          expect(this.button.getAttribute('aria-expanded')).to.equal('true');

          this.items.every(item => expect(item.getAttribute('tabindex')).to.equal('0'));
        });

        it('language-switcher--open class should be added', function() {
          expect(this.languageSelector.context.classList.contains('language-switcher--open')).to.be.true;
        });
      });
    });

    describe('and menu is open', function() {
      beforeEach(function() {
        this.languageSelector.setOpen(true);
      });

      describe('when the document body is clicked', function() {
        beforeEach(function() {
          this.languageSelector.setOpen = chai.spy(this.languageSelector.setOpen);
          this.languageSelector.throttledSetOpen = throttle(this.languageSelector.setOpen);

          document.body.click();
        });

        closeTests();
      });

      describe('when button is clicked', function() {
        beforeEach(function() {
          this.languageSelector.setOpen = chai.spy(this.languageSelector.setOpen);
          this.languageSelector.throttledSetOpen = throttle(this.languageSelector.setOpen);

          this.button.click();
        });

        closeTests();
      });
    });
  });
});

function renderComponent(currentLanguageCode) {
  if (currentLanguageCode) {
    params.languages.forEach(language => {
      language.current = language.ISOCode === currentLanguageCode;
    });
  }

  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const link = wrapper.querySelector('.js-language-switcher-link');
  const button = wrapper.querySelector('.js-language-switcher-button');
  const itemsContainer = wrapper.querySelector('.js-language-switcher-items');
  const items = [...itemsContainer.querySelectorAll('.js-language-switcher-item')];

  const languageSelector = LanguageSelector();

  return {
    wrapper,
    link,
    button,
    items,
    itemsContainer,
    currentLanguage: params.languages.find(language => language.current),
    languageSelector
  };
}

function closeTests() {
  it('setOpen should be throttled and only called once', function() {
    expect(this.languageSelector.setOpen).to.be.spy;
    expect(this.languageSelector.setOpen).to.have.been.called.once;
  });

  it('aria attributes should be set to reflect open menu', function() {
    expect(this.button.getAttribute('aria-expanded')).to.equal('false');

    this.items.every(item => expect(item.getAttribute('tabindex')).to.equal('-1'));
  });

  it('language-switcher--open class should be added', function() {
    expect(this.languageSelector.context.classList.contains('language-switcher--open')).to.be.false;
  });
}
