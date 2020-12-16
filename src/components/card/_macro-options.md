| Name         | Type    | Required | Description                                        |
| ------------ | ------- | -------- | -------------------------------------------------- |
| url          | string  | false    | Will wrap the text in a link                       |
| title        | string  | true     | The title for the card element                     |
| titleSize    | string  | false    | Number used to determine heading level             |
| text         | string  | true     | The text for the card element                      |
| titleClasses | string  | false    | Font size class for the card title                 |
| image        | `Image` | false    | An object containing path attributes for the image |

## Image

| Name     | Type   | Required | Description                                                 |
| -------- | ------ | -------- | ----------------------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image                 |
| largeSrc | string | true     | Path to the retina version of the image                     |
| alt      | string | true     | Alt tag to explain the appearance and function of the image |
