| Name              | Type    | Required | Description                                                                                                         |
| ----------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| id                | string  | true     | HTML `id` attribute for the details                                                                                 |
| classes           | string  | false    | Classes to add to the details outer element                                                                         |
| title             | string  | true     | The title text for the details heading                                                                              |
| titleTag          | string  | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2` |
| content           | string  | true     | HTML content for the details                                                                                        |
| saveState         | boolean | false    | Saves the opened state of the details to local storage so it remains open when the page reloads                     |
| open              | boolean | false    | Forces the details to be open when the page loads                                                                   |
| attributes        | object  | false    | HTML attributes (for example, data attributes) to add to the details                                                |
| headingAttributes | object  | false    | HTML attributes (for example, data attributes) to add to the details header element                                 |
| contentAttributes | object  | false    | HTML attributes (for example, data attributes) to add to the details content element                                |
