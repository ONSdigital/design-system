export default class Relationships {
  constructor(context) {
    this.context = context;
    this.legend = document.getElementById('question-title')
      ? document.getElementById('question-title')
      : document.getElementById('fieldset-legend-title');
    this.radios = [...context.querySelectorAll('input[type=radio]')];
    this.playback = context.querySelector('.ons-js-relationships-playback');

    this.radios.forEach(radio => radio.addEventListener('change', this.setPlayback.bind(this)));

    this.setPlayback();

    this.playback.classList.remove('ons-u-d-no');
  }

  setPlayback() {
    const radio = this.radios.find(radio => radio.checked);

    if (radio) {
      const title = radio.getAttribute('data-title');

      this.legend.innerHTML = title;

      this.playback.innerHTML = radio.getAttribute('data-playback');
    }
  }
}
