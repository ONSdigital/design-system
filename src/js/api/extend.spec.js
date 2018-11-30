import {subscribe, get} from "./_sdcModules";

describe('extend (API method)', () => {
  it('should inject a subscribed method into a new method for extension', () => {
    const originalMethod = function () {};
    const newMethod = chai.spy();

    subscribe('test-module-extend1', [{
      method: originalMethod,
      methodName: 'testMethodExtend1'
    }]);

    window.sdcAPI.extend(
      'test-module-extend1',
      'testMethodExtend1',
      newMethod
    );

    expect(newMethod).to.have.been.called();
    expect(newMethod).to.have.been.called.with(originalMethod);
  });

  it('should replace the existing method in the module system when the' +
    ' replace option is specified', () => {
    const originalMethod = function () {};
    const newMethod = chai.spy();

    subscribe('test-module-extend2', [{
      method: originalMethod,
      methodName: 'testMethodExtend2'
    }]);

    window.sdcAPI.extend(
      'test-module-extend2',
      'testMethodExtend2',
      newMethod,
      {replace:true}
    );

    expect(get('test-module-extend2')['testMethodExtend2']).to.equal(newMethod);
  });
});
