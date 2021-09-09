const exclusiveGroupItemClass = 'ons-js-exclusive-group-item';
const checkboxClass = 'ons-js-exclusive-checkbox';
const voiceOverAlertClass = 'ons-js-exclusive-alert';
const groupAttrAdjective = 'data-group-adjective';
const checkboxAttrAdjective = 'data-checkbox-adjective';
const inputAbbrClass = 'ons-js-input-abbr';
const inputLegendClass = 'ons-js-input-legend';

export default class MutuallyExclusive {
  constructor(context) {
    this.context = context;

    const groupInputs = [...context.getElementsByClassName(exclusiveGroupItemClass)];
    this.numberOfGroupInputs = groupInputs.length;
    this.groupInputs = groupInputs.map(element => ({
      element,
      labelText: this.getElementLabelText(element),
      hasValue: this.inputHasValue(element),
      exclusive: false,
    }));

    const checkboxElement = context.querySelector(`.${checkboxClass}`);
    this.checkbox = {
      element: checkboxElement,
      label: context.querySelector(`label[for=${checkboxElement.id}]`),
      labelText: this.getElementLabelText(checkboxElement),
      hasValue: this.inputHasValue(checkboxElement),
      exclusive: true,
    };

    this.allInputs = [...this.groupInputs, this.checkbox];
    this.voiceOverAlertElement = context.querySelector(`.${voiceOverAlertClass}`);
    this.groupAdjective = this.voiceOverAlertElement.getAttribute(groupAttrAdjective);
    this.checkboxAdjective = this.voiceOverAlertElement.getAttribute(checkboxAttrAdjective);
    this.deselectMessage = this.checkbox.element.getAttribute('data-deselect-message');

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.allInputs.forEach(input => {
      const event = input.element.type === 'checkbox' ? 'click' : 'input';

      input.element.addEventListener(event, () => this.handleValueChange(input));
    });
  }

  handleValueChange(input) {
    const previousSelectedValues = this.allInputs.filter(input => input.hasValue).map(input => input.labelText);
    let adjective;

    input.hasValue = this.inputHasValue(input.element);

    if (input.hasValue) {
      // if not self deselect
      if (input.exclusive) {
        adjective = this.groupAdjective;

        this.allInputs
          .filter(input => !input.exclusive)
          .forEach(input => {
            input.hasValue = false;

            if (input.element.type === 'checkbox') {
              input.element.checked = false;
              this.triggerEvent(input.element, 'change');
            } else {
              input.element.value = '';
              this.triggerEvent(input.element, 'input');
            }
          });
      } else if (!input.exclusive) {
        const input = this.allInputs.find(input => input.exclusive);
        adjective = this.checkboxAdjective;

        input.hasValue = false;
        input.element.checked = false;

        this.triggerEvent(input.element, 'change');
      }

      const updatedSelectedValues = this.allInputs.filter(input => input.hasValue).map(input => input.labelText);
      const deselectedValues = previousSelectedValues.filter(labelText => !updatedSelectedValues.includes(labelText));

      this.setDeselectMessage();

      // Must wait 300ms for screen reader to finish describing ticked item before trigging aria-alert
      setTimeout(() => this.setAriaLive(deselectedValues, adjective), 300);
    }
  }

  getElementLabelText(element) {
    let label = this.context.querySelector(`label[for=${element.id}]`);

    if (!label && this.numberOfGroupInputs > 1) {
      label = element.parentNode.querySelector(`.${inputAbbrClass}`);
    }

    if (!label) {
      label = this.context.querySelector(`.${inputLegendClass}`);
    }

    // This filter is used to strip out any text that is in 'u-vh' elements for accessibility
    let labelText;

    if (label.classList.contains(inputAbbrClass)) {
      labelText = label.getAttribute('title');
    } else if (label.classList.contains(inputLegendClass) && label.querySelector('h1')) {
      labelText = label.querySelector('h1').innerText;
    } else {
      labelText = [...label.childNodes].filter(node => node.nodeType === 3 && node.textContent.trim())[0].textContent.trim();
    }

    return labelText;
  }

  inputHasValue(input) {
    if (input.type === 'checkbox') {
      return !!input.checked;
    } else {
      return !!input.value.trim().length;
    }
  }

  setAriaLive(deselectedValues, adjective) {
    const deselectionMessage = deselectedValues.map(label => `${label} ${adjective}.`).join(' ');

    // Only update aria-live if value changes to prevent typing from clearing the message before it's read
    if (deselectionMessage) {
      this.voiceOverAlertElement.innerHTML = deselectionMessage;
    }
  }

  setDeselectMessage() {
    const groupElementSelected = this.groupInputs.find(input => input.hasValue);

    if (!this.deselectMessageElement && groupElementSelected) {
      const deselectMessageElement = document.createElement('span');
      deselectMessageElement.classList.add('ons-u-vh');
      deselectMessageElement.innerHTML = `. ${this.deselectMessage}`;

      this.deselectMessageElement = deselectMessageElement;
      this.checkbox.label.appendChild(deselectMessageElement);
    } else if (this.deselectMessageElement && !groupElementSelected) {
      this.deselectMessageElement.remove();
      this.deselectMessageElement = null;
    }
  }

  triggerEvent(input, eventType) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventType, false, true);
    input.dispatchEvent(event);
  }
}
