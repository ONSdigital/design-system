| Name              | Type            | Required | Description                                                                 |
| ----------------- | --------------- | -------- | --------------------------------------------------------------------------- |
| id                | string          | true     | id for the details                                                          |
| title             | string          | true     | The title for the details                                                   |
| content           | string          | true     | HTML content for the details                                                |
| button            | `DetailsButton` | false    | Settings for the close button. If not specified button will not render      |
| classes           | string          | false    | Classes to add to the details element                                       |
| saveState         | boolean         | false    | Allows saving of details state (open or closed) locally                     |
| attributes        | object          | false    | HTML attributes (for example data attributes) to add to the details element |
| summaryAttributes | object          | false    | HTML attributes (for example data attributes) to add to the summary element |

## DetailsButton

| Name          | Type   | Required | Description                                                                                                                                                                                                                                                             |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| close         | string | true     | Text for the button when the details are open                                                                                                                                                                                                                           |
| context       | string | false    | First part of a visually hidden text string appended to the `close` button text to add context for screen readers. Defaults to value of `title` if empty, and is appended with value of `contextSuffix` (e.g. "Hide this **'What is a photovoltaic system?'** content") |
| contextSuffix | string | true     | Second part of a visually hidden text string appended to the `context` text string to build a readable sentence for adding context to the close button for screen readers (e.g. "Hide this 'What is a photovoltaic system?' **content**")                               |
| classes       | string | false    | Classes to add to the close button. If classes are provided the `btn--secondary` class will not be applied by default                                                                                                                                                   |
| attributes    | object | false    | HTML attributes (for example data attributes) to add to the button                                                                                                                                                                                                      |
