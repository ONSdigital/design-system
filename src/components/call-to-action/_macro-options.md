| Name          | Type                | Required | Description                                       |
| ------------- | ------------------- | -------- | ------------------------------------------------- |
| headingText   | string              | true     | The heading for the component                     |
| paragraphText | string              | false    | The descriptive text for the component            |
| button        | `Object<CTAButton>` | true     | Settings for the [call to action button](#button) |

## CTAButton

| Name | Type   | Required | Description                                         |
| ---- | ------ | -------- | --------------------------------------------------- |
| text | string | true     | The text label for the button                       |
| url  | string | true     | The URL for the `href` attribute of the button link |
