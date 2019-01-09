export default function loaderBtnMock() {
  return function() {
    this.onClick = chai.spy();
    this.reset = chai.spy();
    this.disable = chai.spy();
    this.enable = chai.spy();
    this.addEventListener = chai.spy();
    this.removeEventListener = chai.spy();
  };
}
