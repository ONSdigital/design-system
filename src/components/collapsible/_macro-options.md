| Name              | Type                | Required | Description                                                                              |
| ----------------- | ------------------- | -------- | ---------------------------------------------------------------------------------------- |
| id                | string              | true     | id for the collapsible                                                                   |
| title             | string              | true     | The title for the collapsible                                                            |
| titleTag          | string              | false    | The HTML tag to wrap the title text in. Will default to a `div`                          |
| content           | string              | true     | HTML content for the collapsible                                                         |
| button            | `CollapsibleButton` | true     | Settings for the close button. If not specified button will not render                   |
| classes           | string              | false    | Classes to add to the collapsible element                                                |
| saveState         | boolean             | false    | Allows saving of collapsible state (open or closed) locally                              |
| attributes        | object              | false    | HTML attributes (for example, data attributes) to add to the collapsible element         |
| headingAttributes | object              | false    | HTML attributes (for example, data attributes) to add to the collapsible header element  |
| contentAttributes | object              | false    | HTML attributes (for example, data attributes) to add to the collapsible content element |

## CollapsibleButton

| Name          | Type   | Required | Description                                                                                                                                                                                                                                                                     |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| close         | string | true     | Text for the button when the collapsible are open                                                                                                                                                                                                                               |
| context       | string | false    | First part of a visually hidden text string appended to the `close` button text to add context for screen readers. Defaults to value of `title` if empty, and is appended with value of `contextSuffix` (for example, "Hide this **'What is a photovoltaic system?'** content") |
| contextSuffix | string | true     | Second part of a visually hidden text string appended to the `context` text string to build a readable sentence for adding context to the close button for screen readers (for example, "Hide this 'What is a photovoltaic system?' **content**")                               |
| classes       | string | false    | Classes to add to the close button. If classes are provided the `btn--secondary` class will not be applied by default                                                                                                                                                           |
| attributes    | object | false    | HTML attributes (for example, data attributes) to add to the button                                                                                                                                                                                                             |
