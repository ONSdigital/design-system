| Name         | Type                 | Required | Description                                             |
| ------------ | -------------------- | -------- | ------------------------------------------------------- |
| title        | string               | true     | Title for the details panel                             |
| DetailsItems | array`<DetailsItem>` | true     | Settings for the array of [Details Items](#DetailsItem) |
| open         | boolean              | false    | Forces the details panel to be open when the page loads |

## DetailsItem

| Name        | Type           | Required                                 | Description                                  |
| ----------- | -------------- | ---------------------------------------- | -------------------------------------------- |
| text        | string         | true                                     | Name of the item                             |
| date        | `Object<Date>` | true                                     | An object for [Date](#date) set for the item |
| description | string         | true                                     | Description for the item                     |
| url         | string         | false (unless text is set to Correction) | Link to view superseded version              |

## Date

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| iso   | string | true     | ISO format machine-readable date, for example, `2020-05-20`    |
| short | string | true     | Displayed short format of the date, for example, “20 May 2020” |
