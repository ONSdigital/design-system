export default function dialogMock() {
  return {
    show: chai.spy(),
    hide: chai.spy(),
    init: chai.spy()
  };
}
