export default function fetchMock(promiseInstance) {
  function fetchFunction() {
    return promiseInstance;
  }

  return chai.spy(fetchFunction);
}
