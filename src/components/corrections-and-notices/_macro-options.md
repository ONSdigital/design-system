| Name        | Type                | Required | Description                                     |
| ----------- | ------------------- | -------- | ----------------------------------------------- |
| Corrections | array`<correction>` | false    | Settings for the [Correction item](#correction) |
| Notices     | array`<notice>`     | false    | Settings for the [Notice item](#notice)         |

## Correction

| Name | Type   | Required | Description                        |
| ---- | ------ | -------- | ---------------------------------- |
| date | string | true     | Date set for the correction item   |
| text | string | true     | Description of the correction item |
| url  | string | true     | Link to view superseded version    |

## Notice

| Name | Type   | Required | Description                    |
| ---- | ------ | -------- | ------------------------------ |
| date | string | true     | Date set for the notice item   |
| text | string | true     | Description of the notice item |
