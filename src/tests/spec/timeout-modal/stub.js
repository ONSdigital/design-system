(() => {
  const date = Date.now() + 7 * 1000;
  const response = { expires_at: date };
  return JSON.stringify(response);
})();
