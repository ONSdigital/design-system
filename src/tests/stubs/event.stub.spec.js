export default function eventMock(options = {}) {
  return {
    ...options,
    preventDefault: chai.spy(() => {}),
    stopImmediatePropagation: chai.spy(() => {}),
    stopPropagation: chai.spy(() => {}),
  };
}
