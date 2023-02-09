export const jsSortableHeadings = '[aria-sort]';
export const classTableBody = 'ons-table__body';
export let status;

export default class TableSort {
  constructor(table) {
    this.table = table;
    this.options = {};
    this.options.statusMessage = table.getAttribute('data-aria-sort');
    this.options.ascendingText = table.getAttribute('data-aria-asc');
    this.options.descendingText = table.getAttribute('data-aria-desc');
    this.init();
  }

  init() {
    this.registerHeadings();
    this.createStatusBox();
  }

  registerHeadings() {
    this.sortableHeadings = this.table.querySelectorAll(jsSortableHeadings);
    const sortableHeadings = [...this.sortableHeadings];
    sortableHeadings.forEach((heading, i) => {
      this.createHeadingButtons(heading, i);
    });
  }

  createHeadingButtons(heading, i) {
    const text = heading.textContent.trim();
    heading.querySelector('.ons-table__header-text').remove();
    heading.querySelector('.ons-svg-icon').classList.remove('ons-u-d-no');
    const button = document.createElement('button');
    button.setAttribute('aria-label', this.table.getAttribute('data-aria-sort') + ' ' + text);
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', i);
    button.setAttribute('class', 'ons-table__sort-button');
    button.textContent = text;
    button.addEventListener('click', this.sortButtonClicked.bind(this));
    let sortSprite = document.getElementById('sort-sprite-' + text.toLowerCase());
    const sortSpriteParent = sortSprite.parentNode;
    sortSpriteParent.replaceChild(button, sortSprite);
    button.appendChild(sortSprite);
  }

  sortButtonClicked(event) {
    const columnNumber = event.target.getAttribute('data-index');
    const sortDirection = event.target.parentElement.getAttribute('aria-sort');
    let newSortDirection;

    if (sortDirection === 'none' || sortDirection === 'ascending') {
      newSortDirection = this.options.descendingText;
    } else {
      newSortDirection = this.options.ascendingText;
    }

    this.tableBody = this.table.getElementsByClassName(classTableBody);
    const tableBody = [...this.tableBody];

    tableBody.forEach(tbody => {
      const rows = this.getTableRowsArray(tbody);
      const sortedRows = this.sort(rows, columnNumber, newSortDirection);
      this.addRows(tbody, sortedRows);
    });

    this.removeButtonStates();
    this.updateButtonState(event.target, newSortDirection);
  }

  getTableRowsArray(tbody) {
    let rows = [];
    this.trs = tbody.querySelectorAll('tr');
    const trs = [...this.trs];

    trs.forEach(tr => {
      rows.push(tr);
    });

    return rows;
  }

  sort(rows, columnNumber, sortDirection) {
    const newRows = rows.sort((rowA, rowB) => {
      const tdA = rowA.querySelectorAll('td, th')[columnNumber];
      const tdB = rowB.querySelectorAll('td, th')[columnNumber];

      const valueA = this.getCellValue(tdA);
      const valueB = this.getCellValue(tdB);

      if (sortDirection === 'ascending') {
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      } else {
        if (valueB < valueA) {
          return -1;
        }
        if (valueB > valueA) {
          return 1;
        }
        return 0;
      }
    });

    return newRows;
  }

  getCellValue(cell) {
    let cellValue = cell.getAttribute('data-sort-value') || cell.textContent;
    cellValue = parseFloat(cellValue) || cellValue;

    return cellValue;
  }

  addRows(body, rows) {
    rows.forEach(row => {
      body.append(row);
    });
  }

  removeButtonStates() {
    this.sortableHeadings = this.table.querySelectorAll(jsSortableHeadings);
    const sortableHeadings = [...this.sortableHeadings];
    sortableHeadings.forEach(heading => {
      heading.setAttribute('aria-sort', 'none');
    });
  }

  updateButtonState(button, direction) {
    button.parentElement.setAttribute('aria-sort', direction);
    let message = this.options.statusMessage;
    message = message + ' ' + button.textContent.replace(/^\s+|\s+$/g, '');
    message = message + ' (' + direction + ')';
    status.textContent = message;
  }

  createStatusBox() {
    status = document.createElement('div');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-atomic', 'true');
    status.setAttribute('class', 'ons-sortable-table-status ons-u-vh');

    this.table.parentElement.insertBefore(status, this.table.nextSibling);
  }
}
