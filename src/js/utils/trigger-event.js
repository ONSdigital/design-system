export default function triggerEvent(element, eventType) {
  let event;
  if (typeof Event === 'function') {
    event = new Event(eventType);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventType, true, true);
  }

  element.dispatchEvent(event);
}
