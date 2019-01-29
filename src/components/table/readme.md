## Table

We use the table element to present tabular data in two dimensions.

### Usage

The 'basic table' is the default style for a table. There are variations available, added via `class` modifiers which can improve the usability
of the `table` element.

#### Data heavy table

- **Class** - `table--dense`
- **Output** - This reduces the `font-size` to compact the table for basic tables which have many rows but only a few columns.

---

#### Numeric table

- **Class** - `table__header--numeric` + `table__cell--numeric`
- **Output** - This aligns the content to the right for tables with all numeric values for best practice.

---

#### Responsive table

- **Class** - `table--responsive`
- **Output** - Stacks the rows on viewports that are `500px` and lower. Displays the corresponding header value with each cell.

---

#### Scrollable table

- **Class** - `table--scrollable` `table-scrollable--on`
- **Output** - Creates a scrollable full width table on viewports that are `740px` and lower. Optionally allows for the table to be set at 100% on all viewports.

---

#### Sortable table

- **Class** - `table--sortable`
- **Output** - Applies JS enhancement to allow each column to be sorted. By default it will sort alphabetically, an optional `data-sort-value=foo` can be added to each `td` to control it's position for sorting.

---

### Accessibility

A `table` marked up correctly shouldn't require any specific `aria` labelling. Responsive tables can cause issues for screen readers depending on how they are implemented.

To assist screen readers we have implemented the following `aria` labels.

- `table` element - `role="table"`
- `tr` element - `role="row"`
- `th` element - `role="columnheader"`
- `td` element - `role="cell"`
