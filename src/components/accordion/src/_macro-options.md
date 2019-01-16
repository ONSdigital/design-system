| Name        | Type                 | Required | Description                                                                |
| ----------- | -------------------- | -------- | -------------------------------------------------------------------------- |
| id          | string               | true     | id of the accordion                                                        |
| buttonClose | string               | true     | The close button text for each accordion item                              |
| buttonOpen  | string               | true     | The open button text for each accordion item                               |
| items       | Array<AccordionItem> | true     | Accordion items to render                                                  |
| openAll     | string               | false    | Text for the open all button. If not specified the button will not render  |
| closeAll    | string               | false    | Text for the close all button. If not specified the button will not render |

## AccordionItem
| Name | Type | Required | Description |
| ------- | ------ | -------- | --------------------------------- |
| title | string | true | The title of the accordion item |
| content | string | true | The content of the accordion item |
