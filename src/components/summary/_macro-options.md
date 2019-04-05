| Name      | Type                   | Required | Description                             |
| --------- | ---------------------- | -------- | --------------------------------------- |
| questions | Array<SummaryQuestion> | true     | An array of questions to summarise      |
| title     | string                 | false    | The title for the summary block         |
| classes   | string                 | false    | Classes to add to the summary component |

## SummaryItem
| Name | Type | Required | Description |
| ------------ | -------------------- | -------- | --------------------------------------- |
| answers | Array<SummaryAnswer> | true | An array of answers for this question |
| title | string | false | The title for the question |
| error | boolean | false | Whether to render this item as an error |
| errorMessage | string | false | Error message for the question |
| total | boolean | false | Whether to render this item as a total |

## SummaryAnswer

| Name   | Type          | Required | Description                                                                      |
| ------ | ------------- | -------- | -------------------------------------------------------------------------------- |
| title  | string        | false    | Label for the question                                                           |
| answer | string        | true     | The answer to the question                                                       |
| action | SummaryAction | false    | Configuration for the answer edit button. If not specified no button will render |

## SummaryAction

| Name       | Type   | Required | Description                                                                               |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| text       | string | true     | Text for the action button                                                                |
| url        | string | true     | URL to edit the answer                                                                    |
| ariaLabel  | string | false    | An aria-label to apply to the button if you need it to be more verbose for screen readers |
| attributes | object | false    | HTML attributes (for example data attributes) to add to the action link                   |
