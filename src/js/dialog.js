import A11yDialog from 'a11y-dialog';

let a11ydialog;

const dialog = {
  show: () => a11ydialog.show(),
  hide: () => a11ydialog.hide(),
  init: () => {
    const dialogEl = document.querySelector('.js-dialog');

    if (!dialogEl) return;

    a11ydialog = new A11yDialog(dialogEl);

    a11ydialog.on('show', (dialogEl) => {
      dialogEl.classList.remove('is-hidden');
    });

    a11ydialog.on('hide', (dialogEl) => {
      dialogEl.classList.add('is-hidden');
    });
  }
};

export default dialog;
