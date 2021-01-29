| Name    | Type    | Required                         | Description                                                     |
| ------- | ------- | -------------------------------- | --------------------------------------------------------------- |
| url     | string  | true (false if `Image` provided) | The complete image path including filename and extension        |
| image   | `Image` | false (true if url not provided) | An object containing path and filename attributes for the image |
| alt     | string  | false                            | Alt tag to explain the appearance and function of the image     |
| caption | string  | false                            | A short caption describing the contents                         |

## Image

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image |
| largeSrc | string | true     | Path to the retina version of the image     |
