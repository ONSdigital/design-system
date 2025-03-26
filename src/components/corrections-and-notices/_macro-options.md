| Name        | Type                | Required                             | Description                                     |
| ----------- | ------------------- | ------------------------------------ | ----------------------------------------------- |
| Corrections | array`<correction>` | false(if Notices is set to true)     | Settings for the [Correction item](#correction) |
| Notices     | array`<notice>`     | false(if Corrections is set to true) | Settings for the [Notice item](#notice)         |

## Correction

| Name | Type           | Required | Description                                             |
| ---- | -------------- | -------- | ------------------------------------------------------- |
| date | `Object<Date>` | true     | An object for [Date](#date) set for the correction item |
| text | string         | true     | Description of the correction item                      |
| url  | string         | true     | Link to view superseded version                         |

## Notice

| Name | Type           | Required | Description                    |
| ---- | -------------- | -------- | ------------------------------ |
| date | `Object<Date>` | true     | Date set for the notice item   |
| text | string         | true     | Description of the notice item |

#### Date

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| iso   | string | true     | ISO format machine-readable date, for example, `2020-05-20`    |
| short | string | true     | Displayed short format of the date, for example, “20 May 2020” |
