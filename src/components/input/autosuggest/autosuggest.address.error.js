import inPageLinks from '../../../js/inpagelink';

const classAutosuggest = 'js-address-autosuggest';
const classErrorPanel = 'js-autosuggest-error-panel';
const classInputContainer = 'autosuggest-input';
const classInput = 'js-autosuggest-input';
const classSearch = 'js-address-input__search';

export default class AddressError {
  constructor(context) {
    this.context = context;
    this.autosuggest = document.querySelector(`.${classAutosuggest}`);
    this.inputContainer = context.querySelector(`.${classInputContainer}`);
    this.input = this.inputContainer.querySelector(`.${classInput}`);
    this.search = context.querySelector(`.${classSearch}`);
    this.errorPanel = document.querySelector(`.${classErrorPanel}`);
    this.errorTitle = this.inputContainer.getAttribute('data-error-title');
    this.errorMessageEnter = this.inputContainer.getAttribute('data-error-enter');
    this.errorMessageSelect = this.inputContainer.getAttribute('data-error-select');
    this.errorMessage = this.inputContainer.getAttribute('data-error-message');
  }

  showErrorPanel() {
    if (!this.errorPanel) {
      //error panel
      const page = document.querySelector('.question');
      const errorElement = document.createElement('div');
      const errorElementHeader = document.createElement('div');
      const errorElementTitle = document.createElement('div');
      const errorBodyElement = document.createElement('div');

      const errorListElement = document.createElement('ol');
      const errorListItemElement = document.createElement('li');
      const errorLinkElement = document.createElement('a');
      const errorLinkElementPre = document.createElement('span');

      errorElement.className = 'panel panel--error u-mb-m js-autosuggest-error-panel';
      errorElementHeader.className = 'panel__header';
      errorElementTitle.className = 'panel__title u-fs-r--b';
      errorBodyElement.className = 'panel__body';
      errorListElement.className = 'list list--bare';
      errorListItemElement.className = 'list__item';
      errorLinkElement.className = 'list__link js-inpagelink js-error';
      errorLinkElement.href = '#autosuggest-input-error';

      errorElementTitle.innerHTML = this.errorTitle;
      errorLinkElementPre.innerHTML = '1. ';

      errorElement.appendChild(errorElementHeader);
      errorElementHeader.appendChild(errorElementTitle);
      errorElement.appendChild(errorBodyElement);
      errorBodyElement.appendChild(errorListElement);
      errorListElement.appendChild(errorListItemElement);
      errorListItemElement.appendChild(errorLinkElement);

      errorListItemElement.insertBefore(errorLinkElementPre, errorListItemElement.firstChild);
      page.insertBefore(errorElement, page.firstChild);

      // fire the inpagelink function
      const links = [...document.getElementsByClassName('js-inpagelink')];
      inPageLinks(links);

      //input error
      const inputErrorPanel = document.createElement('div');
      const inputErrorPanelBody = document.createElement('div');
      const inputErrorPanelP = document.createElement('p');
      const inputErrorPanelStrong = document.createElement('strong');

      inputErrorPanel.className = 'panel panel--error panel--simple';
      inputErrorPanel.id = 'autosuggest-input-error';
      inputErrorPanelBody.className = 'panel__body';
      inputErrorPanelP.className = 'panel__error';
      inputErrorPanelStrong.className = 'panel__error-message';
      inputErrorPanel.appendChild(inputErrorPanelBody);
      inputErrorPanelBody.appendChild(inputErrorPanelP);
      inputErrorPanelP.appendChild(inputErrorPanelStrong);
      inputErrorPanelBody.appendChild(this.search);

      this.input.classList.add('input--error');
      this.context.appendChild(inputErrorPanel);

      this.input.focus();
    }

    document.querySelector('.js-error').innerHTML = this.input.value === '' ? this.errorMessageEnter : this.errorMessageSelect;
    document.querySelector('.panel__error-message').innerHTML = this.input.value === '' ? this.errorMessageEnter : this.errorMessageSelect;
  }

  removeErrorPanel() {
    this.errorPanel.remove();

    this.autosuggest.appendChild(this.search);
    this.input.classList.remove('input--error');

    const errorInput = document.getElementById('autosuggest-input-error');
    errorInput.remove();
  }
}
