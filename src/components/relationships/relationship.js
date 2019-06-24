class Relationship {
  constructor(context) {
    this.context = context;
    this.radios = [...context.querySelectorAll('input[type=radio]')];
    this.question = document.querySelector('legend h1');
    this.display = document.querySelector('.js-relationship-display');

    this.titleRelated = context.getAttribute('data-title-related');
    this.titleUnrelated = context.getAttribute('data-title-unrelated');
    this.displayRelated = context.getAttribute('data-display-related');
    this.displayUnrelated = context.getAttribute('data-display-unrelated');

    this.radios.forEach(radio => radio.addEventListener('change', this.handleChange.bind(this)));
  }

  handleChange(event) {
    const id = event.target.id;
    const relationship = this.context
      .querySelector(`[for=${id}`)
      .childNodes[0].textContent.trim()
      .toLowerCase();

    if (event.target.value === 'unrelated') {
      this.question.innerHTML = this.titleUnrelated.replace('{x}', relationship);
      this.display.innerHTML = this.displayUnrelated.replace('{x}', relationship);
    } else {
      this.question.innerHTML = this.titleRelated.replace('{x}', relationship);
      this.display.innerHTML = this.displayRelated.replace('{x}', relationship);
    }
  }
}

export default function relationship() {
  const context = document.querySelector('.js-relationship');

  if (context) {
    new Relationship(context);
  }
}
