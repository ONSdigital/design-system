export default function triggerChangeEvent(element) {
  if ('createEvent' in document) {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    element.dispatchEvent(evt);
  } else {
    element.fireEvent('onchange');
  }
}
