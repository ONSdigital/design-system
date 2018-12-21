import domready from 'js/domready';

const classToggleWrap = 'js-password-toggle-wrap';
const classToggle = 'js-password-toggle';
const classPassword = 'js-password';

export default function bindInputChangeHandlers() {
  const toggle = document.querySelector(`.${classToggle}`);

  if (toggle) {
    document.querySelector(`.${classToggleWrap}`).classList.remove('u-d-no');
    const password = document.querySelector(`.${classPassword}`);

    toggle.addEventListener('change', () => {
      password.type = toggle.checked ? 'text' : 'password';
    });
  }
}

domready(bindInputChangeHandlers);
