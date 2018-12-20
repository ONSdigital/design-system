import domready from 'js/domready';
import updateAvailableChars from 'components/textarea/src/character-limit';

const exclusiveWrapperClass = 'field--exclusive';
const exclusiveGroupClass = 'js-exclusive-group';
const checkboxClass = 'js-exclusive-checkbox';
const voiceOverAlertClass = 'js-exclusive-alert';
const attrCharLimitRef = 'data-char-limit-ref';

export default function mutuallyExclusiveInputs() {
  const exclusiveWrapperElements = document.getElementsByClassName(exclusiveWrapperClass);
  for (let exclusiveWrapperElement of exclusiveWrapperElements) {
    const exclusiveGroupElements = exclusiveWrapperElement.getElementsByClassName(exclusiveGroupClass);
    const checkboxElement = exclusiveWrapperElement.getElementsByClassName(checkboxClass)[0];
    const voiceOverAlertElement = exclusiveWrapperElement.getElementsByClassName(voiceOverAlertClass)[0];
    for (let exclusiveGroupElement of exclusiveGroupElements) {
      const elementType = exclusiveGroupElement.type;
      const event = elementType === 'checkbox' ? 'change' : 'input';
      exclusiveGroupElement.addEventListener(event, function() {
        voiceOverAlertElement.innerHTML = '';
        inputToggle(checkboxElement, voiceOverAlertElement, 'checkbox');
      });
    }

    checkboxElement.addEventListener('click', function() {
      for (let exclusiveGroupElement of exclusiveGroupElements) {
        const elementType = exclusiveGroupElement.type;
        inputToggle(exclusiveGroupElement, voiceOverAlertElement, elementType);
      }
    });
  }
}

const inputToggle = function(inputEl, voiceOverAlertEl, elType) {
  let attr = inputEl.getAttribute('value');

  if (elType === 'checkbox' && inputEl.checked === true) {
    inputEl.checked = false;
  } else if (elType === 'select-one') {
    inputEl.selectedIndex = 0;
    attr = inputEl.getAttribute('data-value');
  } else {
    const charRef = document.querySelector(`#${inputEl.getAttribute(attrCharLimitRef)}`);
    attr = inputEl.getAttribute('data-value');

    if (elType !== 'checkbox') {
      inputEl.value = '';
    }

    if (charRef) {
      updateAvailableChars(inputEl, charRef);
    }
  }

  voiceOverAlertEl.append(attr + ' ' + voiceOverAlertEl.getAttribute('data-adjective') + '. ');
};

domready(mutuallyExclusiveInputs);
