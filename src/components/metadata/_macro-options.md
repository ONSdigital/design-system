| Name           | Type          | Required | Description                                                                       |
| -------------- | ------------- | -------- | --------------------------------------------------------------------------------- |
| metadataLabel  | string        | false    | Value for the 'title' and 'aria-label' attributes describing the description list |
| classes        | string        | false    | Classes to apply to metadata description list (`<dl>`)                            |
| termCol        | number        | false    | The number of grid columns used for the `<dt>` elements above medium breakpoint   |
| descriptionCol | number        | false    | The number of grid columns used for the `<dd>` elements above medium breakpoint   |
| itemsList      | `Array<Item>` | true     | An array of terms to render in the description list                               |

## Item

| Name         | Type                 | Required | Description                                                |
| ------------ | -------------------- | -------- | ---------------------------------------------------------- |
| term         | string               | true     | The value of the description term                          |
| descriptions | `Array<Description>` | true     | An array of descriptions to render in the description list |

## Description

| Name        | Type   | Required | Description                         |
| ----------- | ------ | -------- | ----------------------------------- |
| description | string | true     | The description of the related term |
