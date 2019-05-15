| Name     | Type              | Required | Description          |
| -------- | ----------------- | -------- | -------------------- |
| sections | Array<HubSection> | true     | An array of sections |

## HubSection

| Name      | Type    | Required | Description                                                               |
| --------- | ------- | -------- | ------------------------------------------------------------------------- |
| completed | boolean | true     | Whether or not the section has been completed                             |
| title     | string  | true     | The name of the section (e.g. Your accommodation)                         |
| ariaLabel | string  | true     | Aria label for the title link (e.g. Continue section: Your accommodation) |
| url       | string  | true     | URL for the title link                                                    |
| status    | string  | true     | Status text for the section (e.g. Partially complete)                     |
