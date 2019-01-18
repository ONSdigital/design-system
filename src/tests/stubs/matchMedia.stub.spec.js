export function matchMediaMobileMock() {
  const obj = function matchMediaMock() {
    return {
      matches: false,
      addListener() {}
    };
  };

  obj.testVersion = true;

  obj.hasMatchMedia = function() {
    return true;
  };

  return obj;
}

export function matchMediaDesktopMock() {
  const obj = function matchMediaMock() {
    return {
      matches: true,
      addListener() {}
    };
  };
  obj.hasMatchMedia = function() {
    return true;
  };

  return obj;
}
