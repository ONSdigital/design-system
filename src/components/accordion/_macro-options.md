| Name      | Type                      | Required | Description                                                                                                                                            |
| --------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id        | string                    | true     | id of the accordion                                                                                                                                    |
| classes   | string                    | false    | Classes to add to the accordion component                                                                                                              |
| itemsList | `Array<AccordionItem>`    | true     | An array of [accordion items](#accordionitem)                                                                                                          |
| allButton | `Object<AccordionButton>` | false    | Settings for the [accordion button](#accordionbutton) to show or hide the contents of all the accordion items. If not set, the button will not render. |
| variants  | array or string           | false    | An array of values or single value (string) to adjust the component using available variant, “simple”                                                  |
| saveState | boolean                   | false    | Saves the state of any open accordion items to local storage so they remain open when the page reloads                                                 |
| open      | boolean                   | false    | Forces all accordion items to be open when the page loads                                                                                              |

## AccordionItem

| Name              | Type                          | Required | Description                                                                                                                   |
| ----------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| title             | string                        | true     | The title of the accordion item                                                                                               |
| titleTag          | string                        | false    | The HTML heading tag for the title. Use to ensure the title has a correct semantic order on the page. Will default to an `h2` |
| content           | string                        | true     | The content of the accordion item                                                                                             |
| button            | `Object<AccordionItemButton>` | true     | Settings for the [accordion item button](#accordionitembutton) to show or hide the contents of the accordion item.            |
| attributes        | object                        | false    | HTML attributes (for example, data attributes) to add to the collapsible element                                              |
| headingAttributes | object                        | false    | HTML attributes (for example, data attributes) to add to the collapsible header element                                       |
| contentAttributes | object                        | false    | HTML attributes (for example, data attributes) to add to the collapsible content element                                      |

## AccordionButton

| Name       | Type   | Required | Description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| open       | string | true     | Button label text to show when one or more accordion items are closed |
| close      | string | true     | Button label text to show when all of the items are open              |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button   |

## AccordionItemButton

| Name       | Type   | Required | Description                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------------- |
| open       | string | true     | Button label text to show when the item is closed                   |
| close      | string | true     | Button label text to show when the item is open                     |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button |
