import triggerEvent from 'js/utils/trigger-event';

const classTypeaheadInput = 'js-typeahead-input';
const classOrganisation = 'js-address-organisation';
const classLine1 = 'js-address-line-1';
const classLine2 = 'js-address-line-2';
const classTown = 'js-address-town';
const classCounty = 'js-address-county';
const classPostcode = 'js-address-postcode';
const classSearchButtonContainer = 'js-address-search-btn-container';
const classSearchButton = 'js-address-search-btn';
const classManualButton = 'js-address-manual-btn';

export default class AddressSetter {
  constructor(context) {
    this.context = context;
    this.input = context.querySelector(`.${classTypeaheadInput}`);
    this.organisation = context.querySelector(`.${classOrganisation}`);
    this.line1 = context.querySelector(`.${classLine1}`);
    this.line2 = context.querySelector(`.${classLine2}`);
    this.town = context.querySelector(`.${classTown}`);
    this.county = context.querySelector(`.${classCounty}`);
    this.postcode = context.querySelector(`.${classPostcode}`);
    this.manualInputs = [this.line1, this.line2, this.town, this.county, this.postcode];
    this.searchButtonContainer = context.querySelector(`.${classSearchButtonContainer}`);
    this.searchButton = context.querySelector(`.${classSearchButton}`);
    this.manualButton = context.querySelector(`.${classManualButton}`);

    // State
    this.manualMode = true;
    this.addressSelected = false;

    // Bind Event Listeners
    if (this.searchButton) {
      this.searchButtonContainer.classList.remove('u-d-no');
      this.searchButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (this.manualButton) {
      this.manualButton.addEventListener('click', this.toggleMode.bind(this));
    }

    if (!(this.line1.value || this.line2.value || this.town.value || this.county.value || this.county.value)) {
      this.toggleMode();
    }
  }

  toggleMode(clearInputs = true) {
    this.setManualMode(!this.manualMode, clearInputs);
  }

  setManualMode(manual, clearInputs) {
    this.context.classList[manual ? 'remove' : 'add']('address-input--search');

    if (clearInputs) {
      this.onUnsetAddress();
    }

    if (manual) {
      this.input.value = '';
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

    this.addressSelected = true;

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

    this.addressSelected = false;
  }

  triggerManualInputsChanges() {
    this.manualInputs.forEach(triggerEvent);
  }
}
