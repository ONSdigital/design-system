| Name  | Type                 | Required | Description                                                         |
| ----- | -------------------- | -------- | ------------------------------------------------------------------- |
| title | string               | false    | The section title for the group of questions                        |
| items | `Array<SummaryItem>` | true     | An array of items for each `summmary__item` in the `summary__block` |

## SummaryItem
| Name | Type | Required | Description |
|----------|---------|----------|-----------------------------------------|
| question | string | true | The previously answered survey question |
| answer | string | true | The respondent's answer to the question |
| textArea | string | false | Set to `true` if the answer is from a `textArea`[(ref)](/components/textarea) |
| link | boolean | false | If true, a 'change' link will render for the summary item |
| href | string | true | The url for the link |
