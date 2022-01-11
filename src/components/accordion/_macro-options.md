| Name      | Type                   | Required | Description                                                                                             |
| --------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| id        | string                 | true     | id of the accordion                                                                                     |
| classes   | string                 | false    | Classes to add to the accordion component                                                               |
| itemList  | `Array<AccordionItem>` | true     | Accordion items to render                                                                               |
| allButton | `AccordionButton`      | false    | Settings for the show all / hide all button. If not specified the button will not render                |
| variants  | array or string        | false    | An array of values or single value (string) to adjust the 'accordion' using available variants - simple |
| open      | boolean                | false    | Forces all accordion items to be open on page load                                                      |

## AccordionItem

| Name              | Type                  | Required | Description                                                                              |
| ----------------- | --------------------- | -------- | ---------------------------------------------------------------------------------------- |
| title             | string                | true     | The title of the accordion item                                                          |
| titleTag          | string                | false    | The HTML tag that is used the title, for example, `h2`. Defaults to `div`.               |
| content           | string                | true     | The content of the accordion item                                                        |
| button            | `AccordionItemButton` | false    | Settings for the button                                                                  |
| attributes        | object                | false    | HTML attributes (for example, data attributes) to add to the collapsible element         |
| headingAttributes | object                | false    | HTML attributes (for example, data attributes) to add to the collapsible header element  |
| contentAttributes | object                | false    | HTML attributes (for example, data attributes) to add to the collapsible content element |

## AccordionButton

| Name       | Type   | Required | Description                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------------- |
| open       | string | true     | Text to show when all of the items aren’t open                      |
| close      | string | true     | Text to show when all of the items are open                         |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button |

## AccordionItemButton

| Name       | Type   | Required | Description                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------------- |
| open       | string | true     | Text for the button when the item is closed                         |
| close      | string | true     | Text for the button when the item is open                           |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button |
