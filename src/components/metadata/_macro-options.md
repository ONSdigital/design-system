| Name           | Type          | Required | Description                                                                                                    |
| -------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| id             | string        | false    | The HTML `id` for the metadata description list (`<dl>`)                                                       |
| classes        | string        | false    | Classes to apply to metadata description list (`<dl>`)                                                         |
| metadataLabel  | string        | false    | Sets the HTML `title` and `aria-label` attributes to provide additional information about the description list |
| termCol        | number        | true     | The number of grid columns used for the `<dt>` elements above medium breakpoint                                |
| descriptionCol | number        | true     | The number of grid columns used for the `<dd>` elements above medium breakpoint                                |
| itemsList      | array`<Item>` | true     | Settings for the terms and descriptions of the [description list items](#item)                                 |

## Item

| Name         | Type                 | Required | Description                                        |
| ------------ | -------------------- | -------- | -------------------------------------------------- |
| term         | string               | true     | The value of the description term                  |
| descriptions | array`<Description>` | true     | Settings for each [description item](#description) |

## Description

| Name        | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| id          | string | false    | The HTML `id` for the description of the related term |
| description | string | true     | The value of the description of the related term      |
