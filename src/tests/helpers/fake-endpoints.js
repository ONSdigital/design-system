export function getFakeJsonEndpointUrl(jsonBody = {}, status = 200) {
  const uriEscapedJson = encodeURIComponent(JSON.stringify(jsonBody));
  return `/test/endpoint?status=${status}&body=${uriEscapedJson}`;
}
