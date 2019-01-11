export default function getTimeNowMock(timeToReturn) {
  function getTimeNow() {
    return timeToReturn;
  }

  return chai.spy(getTimeNow);
}
