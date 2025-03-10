| Name         | Type              | Required | Description                                                                                                                                          |
| ------------ | ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | string            | false    | The HTML `id` attribute for the document list element                                                                                                |
| classes      | string            | false    | Classes for the document list element                                                                                                                |
| attributes   | object            | false    | HTML attributes (for example, data attributes) to add to the document list element                                                                   |
| documents    | `Array<Document>` | true     | An array of [document items](#document) in the documents list                                                                                        |
| headingLevel | int               | false    | Number used to determine the heading level of the list item title. Use to ensure the title has a correct semantic order on the page. Defaults to `2` |

## Document

| Name              | Type                | Required | Description                                                                                                                                                    |
| ----------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| classes           | string              | false    | Custom classes to add to each document list item                                                                                                               |
| attributes        | object              | false    | HTML attributes (for example, data attributes) to add to each document list item                                                                               |
| title             | `Object<Title>`     | true     | An object containing text and url of the [title](#title)                                                                                                       |
| description       | string              | false    | A short HTML extract of text (for example, a short sentence to give some context of the document)                                                              |
| thumbnail         | `Object<Thumbnail>` | false    | An object containing path and filename attributes for the [thumbnail image](#thumbnail). Renders a placeholder instead if set to `true`                        |
| metadata          | `Object<Metadata>`  | false    | An object for a [list of information about document](#metadata), for example, date, type and size                                                              |
| featured          | boolean             | false    | Will render a featured variant of the document if set to `true`                                                                                                |
| fullWidth         | boolean             | false    | If set to `true`, wraps the `featured` document in a `div` with class `ons-container` for a “full-bleed” layout. Can only be set when featured is set to true. |
| wide              | boolean             | false    | Set to `true` to increase the maximum width of the layout container to 1280px.                                                                                 |
| showMetadataFirst | boolean             | false    | If set to `true`, metadata is displayed above the header.                                                                                                      |

### Thumbnail

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image |
| largeSrc | string | true     | Path to the retina version of the image     |

### Metadata

| Name   | Type             | Required | Description                                                                                                     |
| ------ | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| object | `Object<Object>` | false    | An object for a list item describing the [type of document](#object), for example, “Dataset” or “Press release” |
| date   | `Object<Date>`   | false    | An object for the [date](#date) the document was published or updated                                           |
| file   | `Object<File>`   | false    | An object to describe the [details of the downloadable file](#file) such as format and size                     |

#### Object

| Name | Type   | Required | Description                                                                                                                        |
| ---- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| text | string | true     | Label for the type of document, for example “User requested data”.                                                                 |
| url  | string | false    | URL `href` for the type. Can be used to filter a list of documents by category.                                                    |
| ref  | string | false    | Text for a sub-type or reference. Can be used to give extra detail about the type, for example, “User requested data: Ref 008052”. |

#### Date

| Name       | Type    | Required | Description                                                                                                                          |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| iso        | string  | true     | ISO format machine-readable date, for example, `2020-05-20`                                                                          |
| short      | string  | true     | Displayed short format of the date, for example, “20 May 2020”                                                                       |
| prefix     | string  | false    | Label to prefix the date for context, for example, “Last updated” (Defaults to “Published”). Is automatically suffixed with a colon. |
| showPrefix | boolean | false    | Displays the `prefix` when set to `true`. Otherwise it will be hidden. Use when context is required.                                 |

#### File

| Name      | Type   | Required | Description                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------- |
| fileType  | string | true     | Format of the file, for example, PDF, DOC, XLS                   |
| fileSize  | string | true     | Size of the file in megabytes or kilobytes, for example, “850KB” |
| filePages | string | false    | Number of pages in the file, for example, “16 pages”             |

#### Title

| Name | Type   | Required | Description                                               |
| ---- | ------ | -------- | --------------------------------------------------------- |
| text | string | true     | The title for the document                                |
| url  | string | true     | The URL for the document link (either a file or web page) |
