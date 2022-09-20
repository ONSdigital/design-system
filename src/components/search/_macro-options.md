| Name         | Type                                 | Required | Description                                    |
| ------------ | ------------------------------------ | -------- | ---------------------------------------------- |
| input        | `Input` [_(ref)_](/components/input) | true     | Settings for the input.                        |
| searchButton | object`<searchButton>`               | true     | Settings for the [searchButton](#searchButton) |

## searchButton

| Name                   | Type    | Required | Description                                                                                                         |
| ---------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| id                     | string  | false    | Sets the HTML `id` of the button                                                                                    |
| text                   | string  | true     | Text label for the button                                                                                           |
| type                   | string  | false    | Sets the HTML `type` attribute for the `<button>`. Can be set to either: “button” or “reset”. Defaults to “submit”. |
| iconType               | string  | false    | Adds an icon to the button, before the label, by setting the [icon type](/foundations/icons#icon-type)              |
| classes                | string  | false    | Classes to add to the button component                                                                              |
| attributes             | object  | false    | HTML attributes (for example, data attributes) to add to the button component                                       |
| visuallyHideButtonText | boolean | false    | Will wrap the provided `text` value in a visually hidden span                                                       |
