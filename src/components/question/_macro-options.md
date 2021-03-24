| Name                 | Type    | Required | Description                                                                  |
| -------------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| title                | string  | true     | The question                                                                 |
| description          | string  | false    | The question description                                                     |
| instruction          | string  | false    | An interviewer instrcution                                                   |
| id                   | string  | false    | ID for the wrapping element                                                  |
| classes              | string  | false    | Classes to add the wrapping element                                          |
| attributes           | object  | false    | HTML attributes (for example data attributes) to add to the wrapping element |
| readDescriptionFirst | boolean | false    | If set to `true` will screenreaders will read out question description first |
| legendIsPageTitle    | boolean | false    | Creates a `h1` inside the legend                                             |
