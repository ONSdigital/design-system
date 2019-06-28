export default class Relationships {
  constructor(context) {
    this.context = context;
    this.radios = [...context.querySelectorAll('input[type=radio]')];
    this.question = document.querySelector('.question__title');
    this.legend = context.querySelector('.js-relationships-legend');
    this.playback = context.querySelector('.js-relationships-playback');

    this.radios.forEach(radio => radio.addEventListener('change', this.setPlayback.bind(this)));

    this.setPlayback();

    this.playback.classList.remove('u-d-no');
  }

  setPlayback() {
    const radio = this.radios.find(radio => radio.checked);

    if (radio) {
      const title = radio.getAttribute('data-title');

      this.legend.innerHTML = title;

      if (this.question) {
        this.question.innerHTML = title;
      }

      this.playback.innerHTML = radio.getAttribute('data-playback');
    }
  }
}
