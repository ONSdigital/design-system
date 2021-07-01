describe('DomReady function', function() {
  beforeEach(function() {
    this.spy = chai.spy(() => {});
  });

  describe('When the dom is ready', function() {
    beforeEach(function() {
      domReady(this.spy, true);
    });

    it('callbacks should be run', function() {
      expect(this.spy).to.have.been.called();
    });
  });
});
