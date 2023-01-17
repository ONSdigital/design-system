| Name          | Type            | Required | Description                                                                                                                                                                                                    |
| ------------- | --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| videoEmbedUrl | string          | true     | The embed URL to the video hosted on YouTube or Vimeo, for example, `https://www.youtube.com/embed/{ video ID }` or `https://player.vimeo.com/video/{ video ID }`                                              |
| videoLinkUrl  | string          | true     | The URL to the video hosted on YouTube or Vimeo, for example, `https://www.youtube.com/watch?v={ video ID }` or `https://vimeo.com/video/{ video ID }`. Used to link to the video when cookies are not enabled |
| title         | string          | true     | Set a descriptive title for the video set by the HTML `title` attribute of the embedded video `<iframe>`                                                                                                       |
| linkText      | string          | true     | The text to be shown when cookies are not enabled e.g. "Watch the {title} on Youtube"                                                                                                                          |
| image         | `Object<Image>` | true     | An object containing path attributes for [the video cover image](#image) when cookies are not enabled                                                                                                          |

## Image

| Name     | Type   | Required | Description                                                                                                          |
| -------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image                                                                          |
| largeSrc | string | false    | Path to the retina version of the image                                                                              |
| alt      | string | false    | The HTML `alt` tag to explain the appearance and function of the image. Not required if the image is only decorative |
