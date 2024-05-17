export default function matchMedia(query) {
    return window.matchMedia(query);
}

matchMedia.hasMatchMedia = function () {
    return typeof window.matchMedia === 'function';
};
