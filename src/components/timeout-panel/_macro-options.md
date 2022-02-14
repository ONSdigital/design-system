| Name      | Type        | Required | Description                                                   |
| --------- | ----------- | -------- | ------------------------------------------------------------- |
| id        | string      | false    | Custom id to add to the panel                                 |
| countdown | `countdown` | true     | The object that contains the settings for the panel countdown |

## Countdown

| Name                 | Type   | Required | Description                                                             |
| -------------------- | ------ | -------- | ----------------------------------------------------------------------- |
| countdownInSeconds   | string | true     | Duration of countdown in seconds                                        |
| minutesTextSingular  | string | true     | Text displayed in timer when minutes left is 1 e.g. 'minute'            |
| minutesTextPlural    | string | true     | Text displayed in timer when minutes left is more than 1 e.g. 'minutes' |
| secondsTextSingular  | string | true     | Text displayed in timer when seconds left is 1 e.g. 'second'            |
| secondsTextPlural    | string | true     | Text displayed in timer when seconds left is more than 1 e.g. 'seconds' |
| countdownText        | string | true     | The text to be displayed alongside the countdown                        |
| staticText           | string | true     | The text to be displayed when js is turned off in the browser           |
| countdownExpiredText | string | true     | The text to be displayed when countdown expires                         |
