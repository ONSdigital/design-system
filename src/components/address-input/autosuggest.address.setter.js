import AddressError from './autosuggest.address.error';

export const classAutosuggestInput = 'ons-js-autosuggest-input';
export const classOrganisation = 'ons-js-address-organisation';
export const classLine1 = 'ons-js-address-line1';
export const classLine2 = 'ons-js-address-line2';
export const classTown = 'ons-js-address-town';
export const classPostcode = 'ons-js-address-postcode';
export const classInputUPRN = 'ons-js-hidden-uprn';
export const classSearch = 'ons-js-address-input__search';
export const classManual = 'ons-js-address-input__manual';
export const classSearchButton = 'ons-js-address-search-btn';
export const classmanualLink = 'ons-js-address-manual-btn';
export const classErrorPanel = 'ons-panel--error';
export const classJsErrorPanel = 'ons-js-autosuggest-error-panel';

export default class AddressSetter {
  constructor(context) {
    this.context = context;
    this.input = context.querySelector(`.${classAutosuggestInput}`);
    this.organisation = context.querySelector(`.${classOrganisation}`);
    this.line1 = context.querySelector(`.${classLine1}`);
    this.line2 = context.querySelector(`.${classLine2}`);
    this.town = context.querySelector(`.${classTown}`);
    this.postcode = context.querySelector(`.${classPostcode}`);
    this.uprn = context.querySelector(`.${classInputUPRN}`);
    this.manualInputs = [this.organisation, this.line1, this.line2, this.town, this.postcode, this.uprn];
    this.search = context.querySelector(`.${classSearch}`);
    this.manual = context.querySelector(`.${classManual}`);
    this.searchButton = context.querySelector(`.${classSearchButton}`);
    this.manualLink = context.querySelector(`.${classmanualLink}`);
    this.errorPanel = document.querySelector(`.${classErrorPanel}`);

    // State
    this.manualMode = true;
    this.originalValues = [];

    // Bind Event Listeners
    if (this.searchButton) {
      this.searchButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (this.manualLink) {
      this.manualLink.addEventListener('click', this.toggleMode.bind(this));
    }

    // Set mode
    if (this.line1.value || this.line2.value || this.town.value || this.postcode.value || this.errorPanel) {
      this.setManualMode(true, false);
    } else {
      this.toggleMode();
    }
  }

  toggleMode(clearInputs = true) {
    this.setManualMode(!this.manualMode, clearInputs);
  }

  setManualMode(manual, clearInputs) {
    this.manual.classList[manual ? 'remove' : 'add']('ons-u-db-no-js_enabled');
    this.search.classList[manual ? 'add' : 'remove']('ons-u-d-no');
    if (this.errorPanel) {
      this.errorPanel.classList[manual ? 'remove' : 'add']('ons-u-d-no');
    }

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
      this.checkManualInputsValues(true);
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
    this.uprn.value = addressLines.uprn;

    this.setManualMode(true, false);
  }

  onUnsetAddress() {
    this.clearManualInputs();
  }

  clearManualInputs() {
    this.manualInputs.forEach(input => {
      if (input) {
        input.value = '';
      }
    });
  }

  checkManualInputsValues(onLoad) {
    if (onLoad) {
      this.originalValues = this.manualInputs.map(input => {
        if (input) {
          return input.value;
        }
      });
    } else if (this.uprn.value !== '' && this.originalValues.length) {
      this.newValues = this.manualInputs.map(input => {
        return input.value;
      });
      if (this.originalValues.toString() !== this.newValues.toString()) {
        this.uprn.value = '';
      }
    }
  }
}
