import {
  subscribe,
  get,
  replace,
  reset,
  getAllToRun,
  moduleInventory
} from './_sdcModules';

function findMethod(moduleName, methodName) {
  return moduleInventory.find(item => item.name === moduleName).mod[methodName];
}

describe('sdc-modules (module)', () => {

  describe('subscribe (method)', () => {

    describe('when subscribing a module with new name', () => {

      describe('and no reference to the module has yet been created', () => {
        it('should subscribe a new module and method to the module invetory', () => {
          const modName = 'test-module1';
          subscribe(modName, [{ method: function () {}, methodName: 'testMethod1' }]);

          const found = moduleInventory.find(item => item.name === modName);

          expect(found).to.not.be.an('undefined');
          expect(found.notLoaded).to.equal(false);
        });
      });

      describe('and a reference to the module has already been created', () => {
        it('should create a module out of the existing reference', () => {
          const modName = 'test-module1a';

          get(modName);
          const found1 = moduleInventory.find(item => item.name === modName);
          expect(found1.notLoaded).to.equal(true);

          subscribe(modName, [{ method: function () {}, methodName: 'testMethod1a' }]);
          const found2 = moduleInventory.find(item => item.name === modName);
          expect(found2.notLoaded).to.equal(false);
        });
      });
    });

    describe('when subscribing a module with an existing name already subscribed', () => {
      it('should throw an error', () => {
        const err = 'Module test-module1b already exists';

        subscribe('test-module1b',[{
          method: function () {},
          methodName: 'testMethod1b'
        }]);

        expect(subscribe.bind(null, 'test-module1b', [{
            method: function () {},
            methodName: 'testMethod1b'
          }]))
        .to.throw(err);
      });
    });

    describe('when called', () => {

      describe('with invalid name parameter', () => {
        it('should throw an error', () => {
          const err = 'Invalid name parameter';

          expect(subscribe.bind(null)).to.throw(err);
          expect(subscribe.bind(null, {})).to.throw(err);
          expect(subscribe.bind(null, 123)).to.throw(err);
          expect(subscribe.bind(null, true)).to.throw(err);
          expect(subscribe.bind(null, function () {})).to.throw(err);
        });
      });

      describe('with invalid methodConfigs parameter', () => {
        it('should throw an error', () => {
          const err = 'Invalid methodConfigs parameter';

          expect(subscribe.bind(null, 'test-module1c')).to.throw(err);
          expect(subscribe.bind(null, 'test-module1c1', {})).to.throw(err);
          expect(subscribe.bind(null, 'test-module1c1', 'strVal')).to.throw(err);
          expect(subscribe.bind(null, 'test-module1c1', 123)).to.throw(err);
        });
      });
    });
  });

  describe('get (method)', () => {
    describe('when the module is loaded', () => {
      it('should retrieve the correct module', () => {
        const method = function () {};
        subscribe('test-module2', [{ method: method, methodName: 'testMethod2' }]);

        const result = get('test-module2');

        expect(result).to.not.be.an('undefined');
        expect(result['testMethod2']).to.equal(method);
      });
    });

    describe('when the module is not loaded', () => {
      it('should retrieve a reference to the module object to load', () => {
        const reference = get('test-module2a');

        expect(typeof reference).to.equal('object');
        expect(reference).to.be.empty;
      });
    });
  });

  describe('replace (method)', () => {

    describe('when the module to replace method is found', () => {
      it('should replace an existing module method', () => {
        const originalMethod = function () {};
        const newMethod = function () {};

        subscribe('test-module3', [{ method: originalMethod, methodName: 'testMethod3' }]);

        const methodFound1 = findMethod('test-module3', 'testMethod3');

        expect(methodFound1).to.equal(originalMethod);

        replace('test-module3', 'testMethod3', newMethod);

        const methodFound2 = findMethod('test-module3', 'testMethod3');

        expect(methodFound2).to.equal(newMethod);
      });
    });

    describe('when the module to replace method is not found', () => {
      it('should throw an error', () => {
        const err = 'Module test-module3a not found to replace method';

        const binding = replace.bind(null, 'test-module3a', 'testMethod3a', function () {});

        expect(binding).to.throw(err);
      });
    });

    describe('when the module method to replace is not found', () => {
      it('should throw an error', () => {
        const modName = 'test-module3b';
        const err = 'Method name methodShouldNotExist not found and cannot be replaced';

        subscribe(modName, [{ method: function () {}, methodName: 'testMethod3b' }]);

        const binding = replace.bind(null, modName, 'methodShouldNotExist', function () {});

        expect(binding).to.throw(err);
      });
    });
  });

  describe('reset (method)', () => {
    it('should reset all modules back to their initial subscriptions', () => {
      const originalMethod4 = function () {};
      const originalMethod5 = function () {};
      const newMethod4 = function () {};
      const newMethod5 = function () {};

      subscribe('test-module4', [{ method: originalMethod4, methodName: 'testMethod4' }]);
      subscribe('test-module5', [{ method: originalMethod5, methodName: 'testMethod5' }]);

      replace('test-module4', 'testMethod4', newMethod4);
      replace('test-module5', 'testMethod5', newMethod5);

      expect(findMethod('test-module4', 'testMethod4')).to.equal(newMethod4);
      expect(findMethod('test-module5', 'testMethod5')).to.equal(newMethod5);

      reset();

      expect(findMethod('test-module4', 'testMethod4')).to.equal(originalMethod4);
      expect(findMethod('test-module5', 'testMethod5')).to.equal(originalMethod5);
    });
  });

  describe('getAllToRun (method)', () => {
    it('should retrieve all modules that will run on page load', () => {
      const method1 = function () {};
      const method2 = function () {};

      subscribe('test-module7', [{
        method: method1,
        methodName: 'testMethod7'
      }]);

      subscribe('test-module8', [{
        method: method2,
        methodName: 'testMethod8',
        boot: true
      }]);

      const result = getAllToRun();

      expect(result.find(method => method === method1)).to.be.an('undefined');
      expect(result.find(method => method === method2)).to.not.be.an('undefined');
    });
  });
});

