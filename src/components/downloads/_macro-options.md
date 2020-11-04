| Name           | Type        | Required | Description                                                                          |
| -------------- | ----------- | -------- | ------------------------------------------------------------------------------------ |
| title          | string      | true     | The title for the download                                                           |
| excerpt        | string      | true     | A short extract of text (e.g. a short sentence to give some context of the download) |
| url            | string      | true     | The url for the document download (e.g. a pdf file, zip file)                        |
| type           | string      | true     | Type of file (e.g. Poster, Booklet, Flyer)                                           |
| classes        | string      | false    | Custom classes to add to the downloads                                               |
| thumbnail      | `Thumbnail` | true     | An object containing path and filename attributes for the image                      |
| meta           | `Meta`      | true     | An object containing information about file type, size and number of pages           |
| placeholderURL | string      | false    | Optional base path for placeholder image                                             |

## Thumbnail

| Name     | Type   | Required | Description                                                 |
| -------- | ------ | -------- | ----------------------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image                 |
| largeSrc | string | true     | Path to the retina version of the image                     |
| filename | string | true     | Filename including type extension (e.g. placeholder.png)    |
| alt      | string | true     | Alt tag to explain the appearance and function of the image |

## Meta

| Name      | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| fileType  | string | true     | File type (e.g. PDF, DOC, XLS)   |
| fileSize  | string | true     | Size of file (e.g. 850kb, 1.5mb) |
| filePages | string | false    | Quantity of pages                |
