| Name       | Type    | Required | Description                                                                                 |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------- |
| body       | string  | true     | The contents of the panel. This can be a string of HTML                                     |
| title      | string  | false    | The title for the panel. If this is not provided the inline/simple version will be rendered |
| titleTag   | string  | false    | The html tag to wrap the title text in. Will default to a `div`                             |
| type       | string  | false    | The type of panel to render. Available options are `success`, `warn`, and `error`           |
| spacious   | boolean | false    | Will render a more spacious version of the panel if set to `true`                           |
| classes    | string  | false    | Custom classes to add to the panel                                                          |
| attributes | object  | false    | HTML attributes to apply to the panel (e.g. data attributes)                                |
