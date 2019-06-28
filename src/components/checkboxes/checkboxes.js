export default class Checkboxes {
  constructor(inputCls) {
    this.inputs = [...document.querySelectorAll(`.${inputCls}`)];
    this.inputs.forEach(input => input.addEventListener('change', this.setExpandedAttributes.bind(this)));
    this.setExpandedAttributes();
  }

  setExpandedAttributes() {
    this.inputs.filter(input => input.hasAttribute('aria-haspopup')).forEach(input => input.setAttribute('aria-expanded', input.checked));
  }
}
