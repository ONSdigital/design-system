| Name                 | Type   | Required | Description                                                             |
| -------------------- | ------ | -------- | ----------------------------------------------------------------------- |
| id                   | string | false    | Custom id to add to the panel                                           |
| sessionExpiresAt     | string | true     | Initial expiry time set by server on page load in ISO format            |
| minutesTextSingular  | string | true     | Text displayed in timer when minutes left is 1 e.g. 'minute'            |
| minutesTextPlural    | string | true     | Text displayed in timer when minutes left is more than 1 e.g. 'minutes' |
| secondsTextSingular  | string | true     | Text displayed in timer when seconds left is 1 e.g. 'second'            |
| secondsTextPlural    | string | true     | Text displayed in timer when seconds left is more than 1 e.g. 'seconds' |
| countdownText        | string | true     | The text to be displayed alongside the countdown                        |
| nojsText             | string | true     | The text to be displayed when js is turned off in the browser           |
| countdownExpiredText | string | false    | The text to be displayed when countdown expires                         |
| redirectUrl          | string | false    | The URL to automatically go to when countdown expires                   |
