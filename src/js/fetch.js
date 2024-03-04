export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default function (url, options) {
  return window
    .fetch(url, {
      method: 'GET',
      credentials: 'include',
      ...options,
    })
    .then(checkStatus);
}
