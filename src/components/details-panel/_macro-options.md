| Name   | Type           | Required | Description                                             |
| ------ | -------------- | -------- | ------------------------------------------------------- |
| id     | string         | true     | HTML `id` attribute for the details panel               |
| groups | array`<group>` | true     | Settings for the array of [group items](#group)         |
| open   | boolean        | false    | Forces the details panel to be open when the page loads |

## group

| Name       | Type               | Required | Description                                                                                                                                                                                                                                        |
| ---------- | ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title      | string             | true     | Heading for the groupItem and also title of the the details panel when there is one item in groupItems. <br> Example: "Correction" (for one item),"Corrections"(for multiple items) "Corrections and Notices" (multiple items and multiple groups) |
| groupItems | `array<groupItem>` | true     | Settings for the array of [group items](#groupItem) within the group                                                                                                                                                                               |

## groupItem

| Name | Type           | Required                                       | Description                                             |
| ---- | -------------- | ---------------------------------------------- | ------------------------------------------------------- |
| date | `Object<Date>` | true                                           | An object for [Date](#date) set for the correction item |
| text | string         | true                                           | Description of the correction item                      |
| url  | string         | falue(unless singleTitle is set to Correction) | Link to view superseded version                         |

#### Date

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| iso   | string | true     | ISO format machine-readable date, for example, `2020-05-20`    |
| short | string | true     | Displayed short format of the date, for example, “20 May 2020” |
