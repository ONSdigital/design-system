| Name         | Type    | Required                    | Description                                                                                           |
| ------------ | ------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| html         | string  | true (unless `text` is set) | The text content for the phase banner. This can contain HTML.                                         |
| text         | string  | true (unless `html` is set) | Plain text content for the phase banner.                                                              |
| feedbackLink | string  | false                       | Optional feedback link HTML that appears after the banner text.                                       |
| badge        | string  | false                       | The text for the phase banner badge. Defaults to “Beta”.                                              |
| hideBadge    | boolean | false                       | Set to “true” to hide the phase banner badge                                                          |
| wide         | boolean | false                       | Set to “true” to increase the maximum width of the layout container to 1280px                         |
| fullWidth    | boolean | false                       | Set to “true” to increase the maximum width of the layout container to the full width of the viewport |
