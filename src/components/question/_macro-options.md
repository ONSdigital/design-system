| Name                  | Type                                           | Required | Description                                                                                                                        |
| --------------------- | ---------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| title                 | string                                         | true     | The question heading                                                                                                               |
| description           | string                                         | false    | The question description to be used to provide added context to the question. This can be a string of HTML.                        |
| instruction           | string                                         | false    | An interviewer instruction. This can be a string of HTML.                                                                          |
| definition            | `<Object>QuestionDefinition`                   | false    | An object for the question definition. To be used to define a word or acronym that is in the question.                             |
| guidance              | `<Object>QuestionGuidance`                     | false    | An object for the question guidance. To be used to state what should be included or excluded from the answer.                      |
| justification         | `<Object>QuestionJustification`                | false    | The question justification. To be used to explain why a question is being asked if there is evidence that users want to know this. |
| submitButton          | `<Object>Button` [_(ref)_](/components/button) | true     | Settings for the submit button.                                                                                                    |
| id                    | string                                         | false    | ID for the wrapping element                                                                                                        |
| classes               | string                                         | false    | Classes to add the wrapping element                                                                                                |
| attributes            | object                                         | false    | HTML attributes (for example, data attributes) to add to the wrapping element                                                      |
| readDescriptionFirst  | boolean                                        | false    | If set to `true` will screen readers will read out question description first                                                      |
| legendIsQuestionTitle | boolean                                        | false    | Creates a `h1` inside the legend [further information](/components/fieldset#legend-as-pagequestion-title)                          |

## QuestionDefinition

| Name    | Type   | Required | Description                                                                                                            |
| ------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| id      | string | false    | The `id` of the question definition collapsible.                                                                       |
| title   | string | false    | The title of the question definition collapsible. Should be written as statement, for example, “What we mean by “NVQ”” |
| content | string | false    | The content of the question definition collapsible. This can be a string of HTML.                                      |

## QuestionGuidance

| Name    | Type           | Required | Description                                                                                         |
| ------- | -------------- | -------- | --------------------------------------------------------------------------------------------------- |
| content | string         | false    | The contents of the question guidance panel. This can be a string of HTML.                          |
| lists   | `Array<Lists>` | false    | An array of lists an sub-headings used to list what should be included or excluded from the answer. |

## Lists

| Name            | Type               | Required | Description                             |
| --------------- | ------------------ | -------- | --------------------------------------- |
| listHeading     | string             | false    | A heading for each include/exclude list |
| listLeadingLine | string             | false    | A leading line for each list            |
| itemsList       | `Array<ItemsList>` | true     | An array of list items                  |

## ItemsList

| Name | Type   | Required | Description                       |
| ---- | ------ | -------- | --------------------------------- |
| text | string | true     | Text to display for the list item |

## QuestionJustification

| Name    | Type   | Required | Description                                                                                                                  |
| ------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| id      | string | false    | The `id` of the question justification collapsible.                                                                          |
| title   | string | false    | The title of the question justification collapsible. Should be written as statement, for example, “Why we ask this question” |
| content | string | false    | The content of the question definition collapsible. This can be a string of HTML.                                            |
