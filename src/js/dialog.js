import A11yDialog from 'a11y-dialog';

class Dialog {
  constructor() {
    this.dialogEl = document.querySelector('.js-dialog');

    if (this.dialogEl) {
      this.allyDialog = new A11yDialog(this.dialogEl);

      this.allyDialog.on('show', dialogEl => {
        dialogEl.classList.remove('is-hidden');
      });

      this.allyDialog.on('hide', dialogEl => {
        dialogEl.classList.add('is-hidden');
      });
    }
  }

  show() {
    if (this.allyDialog) {
      this.allyDialog.show();
    }
  }

  hide() {
    if (this.allyDialog) {
      this.allyDialog.hide();
    }
  }
}

export default Dialog;
