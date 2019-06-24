export default class Relationships {
  constructor(context) {
    this.context = context;
    this.radios = [...context.querySelectorAll('input[type=radio]')];
    this.question = document.querySelector('.question__title');
    this.legend = context.querySelector('.js-relationships-legend');
    this.playback = context.querySelector('.js-relationships-playback');

    this.titleRelated = context.getAttribute('data-title-related');
    this.titleUnrelated = context.getAttribute('data-title-unrelated');
    this.playbackRelated = context.getAttribute('data-playback-related');
    this.playbackUnrelated = context.getAttribute('data-playback-unrelated');

    this.radios.forEach(radio => radio.addEventListener('change', this.handleChange.bind(this)));

    this.playback.classList.remove('u-d-no');
  }

  handleChange(event) {
    const id = event.target.id;
    const relationship = this.context
      .querySelector(`[for=${id}`)
      .childNodes[0].textContent.trim()
      .toLowerCase();

    if (event.target.value === 'unrelated') {
      this.setText(this.titleUnrelated, this.playbackUnrelated, relationship);
    } else {
      this.setText(this.titleRelated, this.playbackRelated, relationship);
    }
  }

  setText(title, playback, relationship) {
    title = title.replace('{x}', relationship);

    this.legend.innerHTML = title;

    if (this.question) {
      this.question.innerHTML = title;
    }

    this.playback.innerHTML = playback.replace('{x}', relationship);
  }
}
