| Name         | Type    | Required | Description                                                                                                                                                                                          |
| ------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text         | string  | true     | If `html` is set, this is not required. Text for the button. If `html` is provided, the `text` argument will be ignored.                                                                             |
| html         | string  | true     | If `text` is set, this is not required. HTML for the button. If `html` is provided, the `text` argument will be ignored.                                                                             |
| type         | string  | true     | Type of `input` or `button` – `button`, `submit` or `reset`. Defaults to `submit`.                                                                                                                   |
| name         | string  | true     | Name for the `button`                                                                                                                                                                                |
| value        | string  | true     | Value for the `button`                                                                                                                                                                               |
| url          | string  | false    | If provided will create a link and adds the relevant classes                                                                                                                                         |
| id           | string  | false    | ID for the `button`                                                                                                                                                                                  |
| classes      | string  | false    | Classes to add to the button component                                                                                                                                                               |
| innerClasses | string  | false    | Classes to add to the inner button element                                                                                                                                                           |
| attributes   | object  | false    | HTML attributes (for example data attributes) to add to the button component                                                                                                                         |
| listeners    | object  | false    | Creates a `script` element that adds an event listener to the element by `id`. Takes `key { event }` and `value { function }`                                                                        |
| submitType   | string  | false    | If set to `timer` the button will only be disabled for a short time to stop double clicks from double submitting. If set to `loader` will create a loader button that includes the loading animation |
| Icon         | object  | false    | Object that contains the settings for adding icons to buttons                                                                                                                                        |
| newWindow    | boolean | false    | Opens the next page in a new tab. Used for links to external pages                                                                                                                                   |
| buttonStyle  | string  | false    | Can be set to `print`, `exit` or `mobile`. This will style the button with the relevant classes and icons                                                                                            |
| dsExample    | boolean | false    | If set to true will us an <a> tag instead of <button> to stop default submit behaviour of buttons in forms - _only for use in DS examples_                                                           |

## Icon

| Name         | Type   | Required | Description                                                                            |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------- |
| iconType     | string | true     | Name of the icon to be used                                                            |
| iconPosition | string | true     | Position of the icon in relation to the button text. Either set to `before` or `after` |
