import domready from 'js/domready';

export const classToggleWrap = 'js-password-toggle-wrap';
export const classToggle = 'js-password-toggle';
export const classPassword = 'js-password';

export default function () {
  return bindInputChangeHandlers();
}

export function bindInputChangeHandlers() {
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
