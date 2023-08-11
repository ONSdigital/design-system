| Name          | Type               | Required | Description                                                                       |
| ------------- | ------------------ | -------- | --------------------------------------------------------------------------------- |
| textarea      | `Object<Textarea>` | true     | Settings for the [textarea](#textarea) used to write messages                     |
| button        | `Object<Button>`   | true     | Settings for the [button](#button) used to send messages                          |
| closeLinkText | string             | true     | Text for the link used to close the conversation                                  |
| closeLinkUrl  | string             | true     | The URL for the HTML `href` attribute for the link used to close the conversation |

## Textarea

| Name           | Type                     | Required | Description                                                                                                          |
| -------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| id             | string                   | true     | The HTML `id` of the textarea. This used for the label’s `for` attribute.                                            |
| name           | string                   | false    | The HTML `name` attribute for the textarea                                                                           |
| label          | `Object<Label>`          | true     | Settings for the input [label](#label). The HTML `for` attribute will automatically be set to match the textarea id. |
| rows           | integer                  | false    | Sets the height of the textarea by number of rows. Defaults to “8”.                                                  |
| charCheckLimit | Object`<CharCheckLimit>` | false    | Settings for the textarea [character limit counter](#charchecklimit)                                                 |

## Label

| Name        | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| text        | string | true     | The text content of the label             |
| description | string | false    | Hint text to help users fill in the input |

## Button

| Name    | Type   | Required | Description                                                                                                                   |
| ------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| text    | string | true     | If `html` is set, this is not required. Text for the button. If `html` is provided, the `text` argument will be ignored.      |
| type    | string | false    | Sets the HTML `type` attribute for the `<button>`. Can be set to either: “button”, “submit” or “reset”. Defaults to “submit”. |
| id      | string | false    | Sets the HTML `id` attribute for the button                                                                                   |
| classes | string | false    | Classes to add to the button component                                                                                        |

## CharCheckLimit

| Name              | Type    | Required | Description                                                                                                                                                                                        |
| ----------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                | string  | true     | The HTML `id` of the component                                                                                                                                                                     |
| limit             | integer | true     | The maximum number of characters allowed in the input                                                                                                                                              |
| charCountPlural   | string  | true     | The string displayed when multiple characters can be entered before the limit is reached. Set `{x}` in the string to be replaced with the number, for example “You have {x} characters remaining”. |
| charCountSingular | string  | true     | The string displayed when one more character can be entered before the limit is reached. Set `{x}` in the string to be replaced with the number, for example “You have {x} character remaining”.   |
