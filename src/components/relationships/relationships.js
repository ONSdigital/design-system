export default class Relationships {
  constructor(context) {
    this.context = context;
    this.legend = document.querySelector('.js-relationships-legend');
    this.radios = [...context.querySelectorAll('input[type=radio]')];
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

      this.playback.innerHTML = radio.getAttribute('data-playback');
    }
  }
}
