| Name                  | Type                            | Required                      | Description                                                                                                                                                                                                              |
| --------------------- | ------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                 | string                          | true                          | The question heading                                                                                                                                                                                                     |
| description           | string                          | false                         | The question description to be used to provide added context to the question. This can contain HTML.                                                                                                                     |
| instruction           | string                          | false                         | An interviewer instruction. This can contain HTML.                                                                                                                                                                       |
| definition            | `<Object>QuestionDefinition`    | false                         | Settings for the [question definition](#questiondefinition) to be used to define a word or acronym that is in the question                                                                                               |
| guidance              | `<Object>QuestionGuidance`      | false                         | Settings for the [question guidance](#questionguidance) to be used to state what should be included or excluded from the answer                                                                                          |
| justification         | `<Object>QuestionJustification` | false                         | Settings for the [question justification](#questionjustification) to be used to explain why a question is being asked                                                                                                    |
| submitButton          | `<Object>SubmitButton`          | false                         | Settings for the [submit button](#submitbutton)                                                                                                                                                                          |
| id                    | string                          | false                         | The HTML `id` for the component                                                                                                                                                                                          |
| classes               | string                          | false                         | Classes to add the component                                                                                                                                                                                             |
| attributes            | object                          | false                         | HTML attributes (for example, data attributes) to add to the component                                                                                                                                                   |
| readDescriptionFirst  | boolean                         | false                         | Set to “true” to make screen readers read out question description first. Used in the [relationships pattern](/patterns/relationships) where the description instructs the user to complete the sentence in the heading. |
| legendIsQuestionTitle | boolean                         | true (unless `legend` is set) | Creates an `h1` inside the `legend`. Use when there is only a single fieldset on the page                                                                                                                                |
| legendClasses         | string                          | false                         | Classes to apply to the HTML `legend` element when using `legendIsQuestionTitle`                                                                                                                                         |
| legendTitleClasses    | string                          | false                         | Classes to apply to the `h1` heading element when using `legendIsQuestionTitle`                                                                                                                                          |

## QuestionDefinition

| Name    | Type   | Required | Description                                                                |
| ------- | ------ | -------- | -------------------------------------------------------------------------- |
| id      | string | true     | The HTML `id` of the question definition collapsible                       |
| title   | string | true     | The title of the question definition collapsible                           |
| content | string | true     | The content of the question definition collapsible. This can contain HTML. |

## QuestionGuidance

| Name    | Type                   | Required | Description                                                                                                             |
| ------- | ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| content | string                 | false    | The contents of the question guidance panel. This can contain HTML.                                                     |
| lists   | `Array<GuidanceLists>` | false    | An array of [lists with sub-headings](#guidancelists) used to state what should be included or excluded from the answer |

## GuidanceLists

| Name            | Type                                | Required | Description                             |
| --------------- | ----------------------------------- | -------- | --------------------------------------- |
| listHeading     | string                              | false    | A heading for each include/exclude list |
| listLeadingLine | string                              | false    | A leading line for each list            |
| itemsList       | `List` [_(ref)_](/components/lists) | true     | An array of list items for each list    |

## QuestionJustification

| Name    | Type   | Required | Description                                                                                  |
| ------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| id      | string | true     | The HTML `id` of the question justification collapsible                                      |
| title   | string | false    | The title of the question justification collapsible. Defaults to “Why we ask this question”. |
| content | string | true     | The content of the question definition collapsible. This can contain HTML.                   |

## SubmitButton

| Name       | Type   | Required | Description                                                                                                                                                                                          |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | string | false    | The HTML `id` of the button                                                                                                                                                                          |
| submitType | string | false    | If set to `timer` the button will only be disabled for a short time to stop double clicks from double submitting. If set to `loader` will create a loader button that includes the loading animation |
| text       | string | false    | Text for the button label. Defaults to “Save and continue”.                                                                                                                                          |
| classes    | string | false    | Classes to add the button element                                                                                                                                                                    |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button                                                                                                                                  |
