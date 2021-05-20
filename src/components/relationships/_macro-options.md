| Name              | Type           | Required | Description                                                                                                 |
| ----------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| legend            | string         | true     | The legend for the radios. This is visually hidden by default so should be set to match the question title  |
| legendClasses     | string         | false    | Classes to apply to the legend element                                                                      |
| legendIsPageTitle | boolean        | false    | Creates a `h1` inside the legend ([further information](/components/fieldset#legend-as-pagequestion-title)) |
| playback          | string         | true     | Default text for the playback below the component                                                           |
| radios            | `Array<Radio>` | true     | An array of radio options. Each option must have `data-title` and `data-playback` attributes                |
| id                | string         | false    | ID to add to the component                                                                                  |
| classes           | string         | false    | Classes to apply to the relationships component                                                             |
