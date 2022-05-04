| Name      | Type            | Required | Description                                                                     |
| --------- | --------------- | -------- | ------------------------------------------------------------------------------- |
| darkTheme | boolean         | false    | Sets the banner content colour to white                                         |
| image     | `Object<Image>` | false    | An object containing path attributes for the [promotional banner image](#image) |
| content   | string          | true     | The contents of the promotional banner. This can contain HTML.                  |

## Image

| Name     | Type   | Required | Description                                                                                                          |
| -------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image                                                                          |
| largeSrc | string | false    | Path to the retina version of the image                                                                              |
| alt      | string | false    | The HTML `alt` tag to explain the appearance and function of the image. Not required if the image is only decorative |
