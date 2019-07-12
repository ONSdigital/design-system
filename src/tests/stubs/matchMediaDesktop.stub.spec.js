const matchMediaDesktopMock = () => {
  const obj = function matchMediaMock() {
    return {
      matches: true,
      addListener() {},
    };
  };
  obj.hasMatchMedia = function() {
    return true;
  };
  return obj;
};

export { matchMediaDesktopMock as default };
