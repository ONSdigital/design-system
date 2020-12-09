| Name       | Type    | Required | Description                                                                                                                                                 |
| ---------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body       | string  | true     | The contents of the panel. This can be a string of HTML                                                                                                     |
| title      | string  | false    | The title for the panel. If this is not provided the inline/no title version will be rendered                                                               |
| titleTag   | string  | false    | The html tag to wrap the title text in. Will default to a `div` (for error summaries we recommend this is set to `h1`)                                      |
| type       | string  | false    | The type of panel to render. Available options are `success`, `warn`, `error`, `branded` and `warn-branded`                                                 |
| spacious   | boolean | false    | Will render a more spacious version of the panel if set to `true`                                                                                           |
| classes    | string  | false    | Custom classes to add to the panel                                                                                                                          |
| id         | string  | false    | Custom id to add to the panel                                                                                                                               |
| attributes | object  | false    | HTML attributes to apply to the panel (e.g. data attributes)                                                                                                |
| icon       | string  | false    | Set this to the name of the icon you want to be included before the contents of the panel                                                                   |
| iconSize   | string  | false    | Set this to the size of the icon you want can be set to "m", "l" "xl" to match heading size. Defaults to the size of regualar text                          |
| iconsPath  | string  | false    | Set this to the path to the icon you want to be included before the contents of the panel                                                                   |
| DSExample  | boolean | false    | Set this to `true` when using error panels in Design System examples. This will stop the page focusing on the panel on load - _only for use in DS examples_ |
