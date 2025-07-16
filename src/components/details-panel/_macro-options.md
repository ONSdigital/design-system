| Name         | Type                 | Required | Description                                                                                                                                     |
| ------------ | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | string               | true     | Title for the details panel                                                                                                                     |
| headingLevel | int                  | false    | Number used to determine the heading level of the title text. Use to ensure the title has a correct semantic order on the page. Defaults to `2` |
| DetailsItems | array`<DetailsItem>` | true     | Settings for the array of [Details Items](#DetailsItem)                                                                                         |
| openText     | string               | false    | Optional alternative for the 'Show detail' toggle text                                                                                          |
| closeText    | string               | false    | Optional alternative for the 'Hide detail' toggle text                                                                                          |
| open         | boolean              | false    | Forces the details panel to be open when the page loads                                                                                         |

## DetailsItem

| Name         | Type           | Required                                 | Description                                  |
| ------------ | -------------- | ---------------------------------------- | -------------------------------------------- |
| text         | string         | true                                     | Name of the item                             |
| date         | `Object<Date>` | true                                     | An object for [Date](#date) set for the item |
| description  | string         | true                                     | Description for the item                     |
| url          | string         | false (unless text is set to Correction) | Link URL to view superseded version          |
| urlText      | string         | false                                    | Optional alternative link text               |
| urlAriaLabel | string         | false                                    | Optional aria label for item link            |

## Date

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| iso   | string | true     | ISO format machine-readable date, for example, `2020-05-20`    |
| short | string | true     | Displayed short format of the date, for example, “20 May 2020” |
