| Name    | Type            | Required                     | Description                                                                                                                |
| ------- | --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| url     | string          | true (unless `image` is set) | The complete source path of the image including filename and extension                                                     |
| image   | `Object<Image>` | true (unless `url` is set)   | Settings for the path and filename attributes for the [image](#image)                                                      |
| alt     | string          | false                        | The HTML `alt` tag used to explain the appearance and function of the image. Not required if the image is only decorative. |
| caption | string          | false                        | A short visible caption describing the contents of the image                                                               |

## Image

| Name     | Type   | Required | Description                                   |
| -------- | ------ | -------- | --------------------------------------------- |
| smallSrc | string | true     | Path to the small version of the image        |
| largeSrc | string | false    | Path to the large retina version of the image |
