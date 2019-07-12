const matchMediaMobileMock = () => {
  const obj = function matchMediaMock() {
    return {
      matches: false,
      addListener() {},
    };
  };

  obj.testVersion = true;

  obj.hasMatchMedia = function() {
    return true;
  };

  return obj;
};

export { matchMediaMobileMock as default };
