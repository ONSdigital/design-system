export default class Relationships {
  constructor(context) {
    this.context = context;
    this.radios = [...context.querySelectorAll('input[type=radio]')];
    this.question = document.querySelector('.question__title');
    this.legend = context.querySelector('.js-relationships-legend');
    this.playback = context.querySelector('.js-relationships-playback');

    this.radios.forEach(radio => radio.addEventListener('change', this.handleChange.bind(this)));

    this.playback.classList.remove('u-d-no');
  }

  handleChange(event) {
    const radio = event.target;
    const title = radio.getAttribute('data-title');

    this.legend.innerHTML = title;

    if (this.question) {
      this.question.innerHTML = title;
    }

    this.playback.innerHTML = radio.getAttribute('data-playback');
  }
}
