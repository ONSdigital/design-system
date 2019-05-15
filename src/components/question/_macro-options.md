| Name          | Type    | Required | Description                                                                                      |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------ |
| title         | string  | true     | The question                                                                                     |
| description   | string  | false    | The question description                                                                         |
| id            | string  | false    | ID for the wrapping element                                                                      |
| classes       | string  | false    | Classes to add the wrapping element                                                              |
| attributes    | object  | false    | HTML attributes (for example data attributes) to add to the wrapping element                     |
| useFieldset   | boolean | false    | Whether or not the question should render as a fieldset with the question placed within a legend |
| legendClasses | string  | false    | Classes to add to the legend if `useFieldset` is set to true                                     |
