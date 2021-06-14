import domready from 'js/domready';

async function initialise() {
  const replyInputs = [...document.querySelectorAll('.js-reply')];
  console.log(replyInputs);

  function stateHandle(input, button) {
    console.log('jimmy');
    if (input.value === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

  if (replyInputs.length) {
    console.log('greg');
    replyInputs.forEach(replyInput => {
      console.log(replyInput);
      let replyTextarea = replyInput.querySelector('.input');
      let replyButton = replyInput.querySelector('.btn');

      replyTextarea.addEventListener('change', stateHandle(replyTextarea, replyButton));
    });
  }
}

domready(initialise);
