| Name  | Type               | Required | Description                     |
| ----- | ------------------ | -------- | ------------------------------- |
| items | Array<SummaryItem> | true     | An array of items to summarise  |
| title | string             | false    | The title for the summary block |

## SummaryItem
| Name | Type | Required | Description |
| --------- | ---------------------- | -------- | ------------------------------------------- |
| questions | Array<SummaryQuestion> | true | An array of questions for this summary item |
| title | string | false | The title for the summary item |
| error | boolean | false | Whether to render this item as an error |
| total | boolean | false | Whether to render this item as a total |

## SummaryQuestion

| Name     | Type          | Required | Description                                                                      |
| -------- | ------------- | -------- | -------------------------------------------------------------------------------- |
| question | string        | true     | The question                                                                     |
| answer   | string        | true     | The answer to the question                                                       |
| action   | SummaryAction | false    | Configuration for the answer edit button. If not specified no button will render |

## SummaryAction

| Name      | Type   | Required | Description                                                                               |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| text      | string | true     | Text for the action button                                                                |
| url       | string | true     | URL to edit the answer                                                                    |
| ariaLabel | string | false    | An aria-label to apply to the button if you need it to be more verbose for screen readers |
