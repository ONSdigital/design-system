export default class GetViewportDetailsMock {
  constructor() {
    this.params = {};
  }

  setParams(params) {
    this.params = params;
  }

  getMock() {
    return function() {
      return this.params;
    }.bind(this);
  }
}
