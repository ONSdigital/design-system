| Name       | Type              | Required | Description                                                                        |
| ---------- | ----------------- | -------- | ---------------------------------------------------------------------------------- |
| id         | string            | false    | ID for the document list element                                                   |
| classes    | string            | false    | Classes for the document list element                                              |
| attributes | object            | false    | HTML attributes (for example, data attributes) to add to the document list element |
| documents  | `Array<Document>` | true     | An array of document list items to render in the documents list                    |

## Document

| Name        | Type                | Required | Description                                                                                                               |
| ----------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| classes     | string              | false    | Custom classes to add to each document list item                                                                          |
| attributes  | object              | false    | HTML attributes (for example, data attributes) to add to each document list item                                          |
| title       | string              | true     | The title for the document                                                                                                |
| url         | string              | true     | The URL for the document link (either a file or web page)                                                                 |
| description | string              | false    | A short HTML extract of text (for example, a short sentence to give some context of the document)                         |
| thumbnail   | `Object<Thumbnail>` | false    | An object containing path and filename attributes for the thumbnail image. Renders a placeholder instead if set to `true` |
| metadata    | `<Object>Metadata`  | false    | An object for a list of information about document, for example, date, type and size                                      |
| featured    | boolean             | false    | Will render a featured variant of the document if set to `true`                                                           |
| fullWidth   | boolean             | false    | If set to `true`, wraps the `featured` document in a `div` with class `ons-container` for a “full-bleed” layout           |
| wide        | boolean             | false    | If set to `true`, adds class `ons-container--wide` to the `div` set with `fullWidth`                                      |

### Thumbnail

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image |
| largeSrc | string | true     | Path to the retina version of the image     |

### Metadata

| Name | Type           | Required | Description                                                                                           |
| ---- | -------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| type | `<Object>Type` | false    | An object for a list item describing the type of document, for example, “Dataset” or “Press release”  |
| date | `<Object>Date` | false    | An object for the date the document was published or updated                                          |
| file | `<Object>File` | false    | An object to describe the details of the downloadable document file: format, size and number of pages |

#### Type

| Name | Type   | Required | Description                                                                                                                        |
| ---- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| text | string | true     | Label for the type of document, for example “User requested data”.                                                                 |
| url  | string | false    | URL `href` for the type. Can be used to filter a list of documents by category.                                                    |
| ref  | string | false    | Text for a sub-type or reference. Can be used to give extra detail about the type, for example, “User requested data: Ref 008052”. |

#### Date

| Name       | Type    | Required | Description                                                                                                                          |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| iso        | string  | true     | ISO format meachine-readable date, for example, `2020-05-20`                                                                         |
| short      | string  | true     | Displayed short format of the date, for example, “20 May 2020”                                                                       |
| prefix     | string  | false    | Label to prefix the date for context, for example, “Last updated” (Defaults to “Published”). Is automatically suffixed with a colon. |
| showPrefix | boolean | false    | Displays the `prefix` when set to `true`. Otherwise it will be hidden. Use when context is required.                                 |

#### File

| Name      | Type   | Required | Description                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------- |
| fileType  | string | true     | Format of the file, for example, PDF, DOC, XLS                   |
| fileSize  | string | true     | Size of the file in megabytes or kilobytes, for example, “850KB” |
| filePages | string | false    | Number of pages in the file, for example, “16 pages”             |
