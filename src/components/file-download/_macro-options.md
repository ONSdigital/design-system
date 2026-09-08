| Name                  | Type    | Required | Description                                                                                                                  |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| fileFormat            | string  | true     | File format, for example, `PDF`, `CSV`, `XLS`. Determines the file icon and is displayed as metadata                         |
| fileName              | string  | true     | File name or descriptive title of the downloadable file                                                                      |
| supportingInformation | string  | true     | Supporting information describing the file content, such as coverage, level of detail, or intended use                       |
| url                   | string  | true     | URL `href` for the download link                                                                                             |
| id                    | string  | false    | The HTML `id` attribute for the file download element                                                                        |
| classes               | string  | false    | Classes to add to the file download element                                                                                  |
| attributes            | object  | false    | HTML attributes (for example, data attributes) to add to the file download element                                           |
| headingLevel          | int     | false    | Heading level for the file title. Use to maintain correct semantic order on the page. Defaults to `2`                        |
| linkText              | string  | false    | Override text for the download link. Defaults to `"Download"`                                                                |
| newWindow             | boolean | false    | Set to `true` to open the download in a new browser tab                                                                      |
