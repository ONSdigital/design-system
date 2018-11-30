import {subscribe} from "./_sdcModules";

describe('boot (API method)', () => {
  it('should run all module methods subscribed with a boot option', async function() {
    const method1 = chai.spy();
    const method2 = chai.spy();

    subscribe('test-module-boot1', [{
      method: method1,
      methodName: 'testMethodBoot1'
    }]);

    subscribe('test-module-boot2', [{
      method: method2,
      methodName: 'testMethodBoot2',
      boot: true
    }]);

    document.addEventListener('DOMContentLoaded', function () {
      window.sdcAPI.boot();

      expect(method1).to.not.have.been.called();
      expect(method2).to.have.been.called();
    });
  });
});
