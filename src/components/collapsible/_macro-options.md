| Name              | Type                        | Required | Description                                                                                                         |
| ----------------- | --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| id                | string                      | true     | HTML `id` attribute for the collapsible                                                                             |
| classes           | string                      | false    | Classes to add to the collapsible outer element                                                                     |
| title             | string                      | true     | The title text for the collapsible heading                                                                          |
| titleTag          | string                      | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2` |
| content           | string                      | true     | HTML content for the collapsible                                                                                    |
| button            | object`<CollapsibleButton>` | false    | Settings for the [collapsible close button](#collapsiblebutton)                                                     |
| saveState         | boolean                     | false    | Saves the opened state of the collapsible to local storage so it remains open when the page reloads                 |
| open              | boolean                     | false    | Forces the collapsible to be open when the page loads                                                               |
| attributes        | object                      | false    | HTML attributes (for example, data attributes) to add to the collapsible                                            |
| headingAttributes | object                      | false    | HTML attributes (for example, data attributes) to add to the collapsible header element                             |
| contentAttributes | object                      | false    | HTML attributes (for example, data attributes) to add to the collapsible content element                            |

## CollapsibleButton

| Name          | Type   | Required | Description                                                                                                                                                                                                                                                                     |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| close         | string | false    | Text for the button when the collapsible is open. Defaults to “Hide this”                                                                                                                                                                                                       |
| context       | string | false    | First part of a visually hidden text string appended to the `close` button text to add context for screen readers. Defaults to value of `title` if empty, and is appended with value of `contextSuffix` (for example, “Hide this **‘What is a photovoltaic system?’** content”) |
| contextSuffix | string | false    | Second part of a visually hidden text string appended to the `context` text string to build a readable sentence for adding context to the close button for screen readers (for example, ”Hide this ‘What is a photovoltaic system?’ **content**”)                               |
| classes       | string | false    | Classes to add to the close button. If classes are provided the `btn--secondary` class will not be applied by default                                                                                                                                                           |
| attributes    | object | false    | HTML attributes (for example, data attributes) to add to the button                                                                                                                                                                                                             |
