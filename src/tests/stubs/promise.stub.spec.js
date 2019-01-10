export default function promiseInstanceMock() {
  const obj = {
    then: () => {},
    catch: () => {}
  };

  chai.spy.on(obj, 'then', () => obj);
  chai.spy.on(obj, 'catch', () => obj);
  return obj;
}
