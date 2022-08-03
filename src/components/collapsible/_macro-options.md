| Name              | Type    | Required | Description                                                                                                         |
| ----------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| id                | string  | true     | HTML `id` attribute for the collapsible                                                                             |
| classes           | string  | false    | Classes to add to the collapsible outer element                                                                     |
| title             | string  | true     | The title text for the collapsible heading                                                                          |
| titleTag          | string  | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2` |
| content           | string  | true     | HTML content for the collapsible                                                                                    |
| saveState         | boolean | false    | Saves the opened state of the collapsible to local storage so it remains open when the page reloads                 |
| open              | boolean | false    | Forces the collapsible to be open when the page loads                                                               |
| attributes        | object  | false    | HTML attributes (for example, data attributes) to add to the collapsible                                            |
| headingAttributes | object  | false    | HTML attributes (for example, data attributes) to add to the collapsible header element                             |
| contentAttributes | object  | false    | HTML attributes (for example, data attributes) to add to the collapsible content element                            |
