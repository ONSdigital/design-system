import domready from '../../js/domready';

async function initialise() {
  const abbrInputs = [...document.querySelectorAll('.ons-js-input-abbr')];

  if (abbrInputs.length > 0) {
    abbrInputs.forEach(abbrInput => {
      const addTooltip = input => {
        const target = input.target;
        target.classList.add('ons-input__tooltip');
        const title = target.getAttribute('title');
        const previousTooltip = [...document.getElementsByClassName('ons-input__tooltip__text')];
        if (title && previousTooltip.length === 0) {
          // Create the tooltip span element
          const tooltip = document.createElement('span');
          tooltip.className = 'ons-input__tooltip__text ons-u-fs-s';
          tooltip.textContent = title;

          // Append the tooltip to the target element
          target.appendChild(tooltip);

          // Remove the tooltip after a delay
          setTimeout(function() {
            tooltip.remove();
          }, 2000);
        } else if (title && previousTooltip.length > 0) {
          // accessing first element in the array as only one tooltip would be in the dom an any one time
          previousTooltip[0].remove();
          addTooltip(input);
        }
      };
      abbrInput.addEventListener('click', input => {
        addTooltip(input);
      });
    });
  }
  const checkedInputs = [...document.querySelectorAll('.ons-js-char-check-input')];

  if (checkedInputs.length) {
    const CharCheck = (await import('../char-check-limit/character-check')).default;

    checkedInputs.forEach(input => new CharCheck(input));
  }
}

domready(initialise);
