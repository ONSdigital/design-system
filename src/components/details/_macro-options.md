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

| Name       | Type   | Required | Description                                                                                                                                                                                                                             |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| close      | string | true     | Text for the button when the details are open                                                                                                                                                                                           |
| context    | string | false    | Visually hidden text appended to `close` text string to add context to close button for screen readers. String is appended with "content" and defaults to `title` if empty. (e.g. "Hide this 'What is a photovoltaic system?' content") |
| classes    | string | false    | Classes to add to the close button. If classes are provided the `btn--secondary` class will not be applied by default                                                                                                                   |
| attributes | object | false    | HTML attributes (for example data attributes) to add to the button                                                                                                                                                                      |
