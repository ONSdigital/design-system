| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| id   | string | true     | The base id for the inputs. `-day`, `-month`, and `-year` will be added to this id and applied to each input |
| legend | string | true   | The legend for the date fieldset |
| description | string | true | The hint text for the date field |
| day | DateField | false | Config for the day field. If this isn't provided then a day field will not render |
| month | DateField | false | Config for the month field. If this isn't provided then a month field will not render |
| year | DateField | false | Config for the year field. If this isn't provided then a year field will not render |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false | Configuration object if this is a mutually exclusive list |

## DateField
| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| label | string | true    | Label for the field |
| name | string | true     | Name of the field |
| value | number | false   | Preset value for the field |
