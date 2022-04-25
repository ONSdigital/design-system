| Name           | Type          | Required | Description                                                                                                    |
| -------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| metadataLabel  | string        | false    | Sets the HTML `title` and `aria-label` attributes to provide additional information about the description list |
| classes        | string        | false    | Classes to apply to metadata description list (`<dl>`)                                                         |
| id             | string        | false    | The HTML `id` for the metadata description list (`<dl>`)                                                       |
| termCol        | number        | true     | The number of grid columns used for the `<dt>` elements above medium breakpoint                                |
| descriptionCol | number        | true     | The number of grid columns used for the `<dd>` elements above medium breakpoint                                |
| itemsList      | `Array<Item>` | true     | Settings for the terms and descriptions of the [description list items](#item)                                 |

## Item

| Name         | Type                 | Required | Description                                        |
| ------------ | -------------------- | -------- | -------------------------------------------------- |
| term         | string               | true     | The value of the description term                  |
| descriptions | `Array<Description>` | true     | Settings for each [description item](#description) |

## Description

| Name        | Type   | Required | Description                                      |
| ----------- | ------ | -------- | ------------------------------------------------ |
| description | string | true     | The value of the description of the related term |
