import inPageLinks from '../../js/inpagelink';

const classAutosuggest = 'ons-js-address-autosuggest';
const classErrorPanel = 'ons-js-autosuggest-error-panel';
const classInputContainer = 'ons-autosuggest-input';
const classInput = 'ons-js-autosuggest-input';
const classSearch = 'ons-js-address-input__search';

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
      const page = document.querySelector('.ons-question');
      const errorElement = document.createElement('div');
      const errorElementHeader = document.createElement('div');
      const errorElementTitle = document.createElement('div');
      const errorBodyElement = document.createElement('div');

      const errorListElement = document.createElement('p');
      const errorLinkElement = document.createElement('a');

      errorElement.className = 'ons-panel ons-panel--error ons-u-mb-m ons-js-autosuggest-error-panel';
      errorElementHeader.className = 'ons-panel__header';
      errorElementTitle.className = 'ons-panel__title ons-u-fs-r--b';
      errorBodyElement.className = 'ons-panel__body';
      errorLinkElement.className = 'ons-list__link ons-js-inpagelink ons-js-error';
      errorLinkElement.href = '#autosuggest-input-error';

      errorElementTitle.innerHTML = this.errorTitle;

      errorElement.appendChild(errorElementHeader);
      errorElementHeader.appendChild(errorElementTitle);
      errorElement.appendChild(errorBodyElement);
      errorBodyElement.appendChild(errorListElement);
      errorListElement.appendChild(errorLinkElement);

      page.insertBefore(errorElement, page.firstChild);

      // fire the inpagelink function
      const links = [...document.getElementsByClassName('ons-js-inpagelink')];
      inPageLinks(links);

      //input error
      const inputErrorPanel = document.createElement('div');
      const inputErrorPanelBody = document.createElement('div');
      const inputErrorPanelP = document.createElement('p');
      const inputErrorPanelStrong = document.createElement('strong');

      inputErrorPanel.className = 'ons-panel ons-panel--error ons-panel--no-title';
      inputErrorPanel.id = 'autosuggest-input-error';
      inputErrorPanelBody.className = 'ons-panel__body';
      inputErrorPanelP.className = 'ons-panel__error';
      inputErrorPanelStrong.className = 'ons-panel__error-message';
      inputErrorPanel.appendChild(inputErrorPanelBody);
      inputErrorPanelBody.appendChild(inputErrorPanelP);
      inputErrorPanelP.appendChild(inputErrorPanelStrong);
      inputErrorPanelBody.appendChild(this.search);

      this.input.classList.add('ons-input--error');
      this.context.appendChild(inputErrorPanel);

      this.input.focus();
    }

    document.querySelector('.ons-js-error').innerHTML = this.input.value === '' ? this.errorMessageEnter : this.errorMessageSelect;
    document.querySelector('.ons-panel__error-message').innerHTML =
      this.input.value === '' ? this.errorMessageEnter : this.errorMessageSelect;
  }

  removeErrorPanel() {
    this.errorPanel.remove();

    this.autosuggest.appendChild(this.search);
    this.input.classList.remove('ons-input--error');

    const errorInput = document.getElementById('autosuggest-input-error');
    errorInput.remove();
  }
}
