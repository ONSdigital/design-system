| Name           | Type        | Required | Description                                                                                                         |
| -------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| title          | string      | true     | The title for the download                                                                                          |
| titleTag       | string      | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2` |
| excerpt        | string      | true     | A short extract of text (for example, a short sentence to give some context of the download)                        |
| url            | string      | true     | The url for the document download (for example, a pdf file, zip file)                                               |
| type           | string      | true     | Type of file (for example, Poster, Booklet, Flyer)                                                                  |
| classes        | string      | false    | Custom classes to add to the downloads                                                                              |
| thumbnail      | `Thumbnail` | true     | An object containing path and filename attributes for the image                                                     |
| meta           | `Meta`      | true     | An object containing information about file type, size and number of pages                                          |
| placeholderURL | string      | false    | Optional base path for placeholder image                                                                            |

## Thumbnail

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image |
| largeSrc | string | true     | Path to the retina version of the image     |

## Meta

| Name      | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| fileType  | string | true     | File type (for example, PDF, DOC, XLS)   |
| fileSize  | string | true     | Size of file (for example, 850kb, 1.5mb) |
| filePages | string | false    | Quantity of pages                        |
