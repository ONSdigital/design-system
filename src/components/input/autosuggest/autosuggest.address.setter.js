import triggerEvent from 'js/utils/trigger-event';
import AddressError from './autosuggest.address.error';

const classAutosuggestInput = 'js-autosuggest-input';
const classLine1 = 'js-address-line-1';
const classLine2 = 'js-address-line-2';
const classTown = 'js-address-town';
const classPostcode = 'js-address-postcode';
const classSearch = 'js-address-input__search';
const classManual = 'js-address-input__manual';
const classSearchButton = 'js-address-search-btn';
const classManualButton = 'js-address-manual-btn';
const classErrorPanel = 'panel--error';
const classJsErrorPanel = 'js-error-panel';

export default class AddressSetter {
  constructor(context) {
    this.context = context;
    this.input = context.querySelector(`.${classAutosuggestInput}`);
    this.line1 = context.querySelector(`.${classLine1}`);
    this.line2 = context.querySelector(`.${classLine2}`);
    this.town = context.querySelector(`.${classTown}`);
    this.postcode = context.querySelector(`.${classPostcode}`);
    this.manualInputs = [this.line1, this.line2, this.town, this.postcode];
    this.search = context.querySelector(`.${classSearch}`);
    this.manual = context.querySelector(`.${classManual}`);
    this.searchButton = context.querySelector(`.${classSearchButton}`);
    this.manualButton = context.querySelector(`.${classManualButton}`);
    this.errorPanel = document.querySelector(`.${classErrorPanel}`);

    // State
    this.manualMode = true;

    // Bind Event Listeners
    if (this.searchButton) {
      this.searchButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (this.manualButton) {
      this.manualButton.addEventListener('click', this.toggleMode.bind(this));
    }

    // Set mode
    if (!(this.line1.value || this.line2.value || this.town.value || this.postcode.value)) {
      this.toggleMode();
    }

    if (this.errorPanel) {
      this.setManualMode(true, true);
    }
  }

  toggleMode(clearInputs = true) {
    this.setManualMode(!this.manualMode, clearInputs);
  }

  setManualMode(manual, clearInputs) {
    this.manual.classList[manual ? 'remove' : 'add']('u-db-no-js_enabled');
    this.search.classList[manual ? 'add' : 'remove']('u-d-no');

    if (clearInputs) {
      this.onUnsetAddress();
    }

    if (manual) {
      this.input.value = '';

      this.JsErrorPanel = document.querySelector(`.${classJsErrorPanel}`);
      if (this.JsErrorPanel) {
        const removeError = new AddressError(this.context);
        removeError.removeErrorPanel();
      }
    }

    this.manualMode = manual;
  }

  setAddress(addressLines) {
    this.clearManualInputs(false);
    if (addressLines.addressLine3) {
      this.line1.value = addressLines.addressLine1 + ', ' + addressLines.addressLine2;
      this.line2.value = addressLines.addressLine3;
    } else {
      this.line1.value = addressLines.addressLine1;
      this.line2.value = addressLines.addressLine2;
    }

    this.town.value = addressLines.townName;
    this.postcode.value = addressLines.postcode;

    this.triggerManualInputsChanges();

    this.setManualMode(true, false);
  }

  onUnsetAddress() {
    this.clearManualInputs();
  }

  clearManualInputs(triggerEvent = true) {
    this.manualInputs.forEach(input => {
      input.value = '';
    });

    if (triggerEvent) {
      this.triggerManualInputsChanges();
    }
  }

  triggerManualInputsChanges() {
    this.manualInputs.forEach(triggerEvent);
  }
}
