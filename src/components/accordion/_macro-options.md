| Name      | Type                      | Required | Description                                                                                                                                            |
| --------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id        | string                    | true     | id of the accordion                                                                                                                                    |
| classes   | string                    | false    | Classes to add to the accordion component                                                                                                              |
| itemsList | `Array<AccordionItem>`    | true     | An array of [accordion items](#accordionitem)                                                                                                          |
| allButton | `Object<AccordionButton>` | false    | Settings for the [accordion button](#accordionbutton) to show or hide the contents of all the accordion items. If not set, the button will not render. |
| saveState | boolean                   | false    | Saves the state of any open accordion items to local storage so they remain open when the page reloads                                                 |
| open      | boolean                   | false    | Forces all accordion items to be open when the page loads                                                                                              |

## AccordionItem

| Name              | Type   | Required | Description                                                                                                                                |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| title             | string | true     | The title of the accordion item                                                                                                            |
| headingLevel      | int    | false    | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page. Defaults to `2` |
| content           | string | true     | The content of the accordion item                                                                                                          |
| attributes        | object | false    | HTML attributes (for example, data attributes) to add to the details element                                                               |
| headingAttributes | object | false    | HTML attributes (for example, data attributes) to add to the details header element                                                        |
| contentAttributes | object | false    | HTML attributes (for example, data attributes) to add to the details content element                                                       |

## AccordionButton

| Name       | Type   | Required | Description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| open       | string | true     | Button label text to show when one or more accordion items are closed |
| close      | string | true     | Button label text to show when all of the items are open              |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button   |
