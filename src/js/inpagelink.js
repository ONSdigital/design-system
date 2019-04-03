import domready from 'js/domready';

export const classTrigger = 'js-inpagelink';

export default function() {
  return inPageLink();
}

export function inPageLink() {
  const nodeList = [...document.getElementsByClassName(classTrigger)];

  nodeList.forEach(applyInPageLink);
  return nodeList;
}

export function applyInPageLink(elTrigger) {
  const elId = elTrigger.getAttribute('href').replace('#', '');

  elTrigger.addEventListener('click', e => {
    e.preventDefault();
    focusOnInput(elId);
  });

  return { elTrigger, elId };
}

function focusOnInput(elId) {
  const elIdInput = document.getElementById(elId).querySelectorAll('.input')[0];

  elIdInput.focus();
  return elId;
}

domready(inPageLink);
