export function objHasInterface(obj, interfaceObj) {
  let isIt = true;

  for (let i in interfaceObj) {
    !obj[i] && (isIt = false);
  }

  return isIt;
}

export function getTimeNow() {
  return parseInt(new Date().getTime() / 1000);
}

export function matchMedia(query) {
  return window.matchMedia(query);
}

matchMedia.hasMatchMedia = function() {
  return typeof window.matchMedia === 'function';
};
