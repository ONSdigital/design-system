| Name                        | Type    | Required | Description                                                                  |
| --------------------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| showModalTimeInSeconds      | integer | true     | Number of seconds the modal will be displayed                                |
| redirectUrl                 | string  | true     | URL to redirect to when session times out                                    |
| serverSessionExpiryEndpoint | string  | true     | Endpoint to send requests                                                    |
| title                       | string  | true     | Title text for the modal, used by `aria-labelledby`                          |
| textFirstLine               | string  | true     | Text content for modal e.g. 'You've been inactive for a while'               |
| countdownText               | string  | true     | Text content to accompany timer e.g. 'You will be signed out in'             |
| redirectingText             | string  | true     | Text displayed as redirecting e.g. 'You are being signed out'                |
| btnText                     | string  | true     | Text displayed in button to reset session expiry time e.g. 'Continue survey' |
| minutesTextSingular         | string  | true     | Text displayed in timer when minutes left is 1 e.g. 'minute'                 |
| minutesTextPlural           | string  | true     | Text displayed in timer when minutes left is more than 1 e.g. 'minutes'      |
| secondsTextSingular         | string  | true     | Text displayed in timer when seconds left is 1 e.g. 'second'                 |
| secondsTextPlural           | string  | true     | Text displayed in timer when seconds left is more than 1 e.g. 'seconds'      |
