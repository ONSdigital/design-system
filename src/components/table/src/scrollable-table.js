import domready from 'js/domready';

export const classTableScrollable = 'table-scrollable';
export const classTableScrollableContent = 'table-scrollable__content';
export const classTable = 'table';

class TableScroll {
  constructor(table) {
    this.table = table;
    this.tableScroll = this.table.getElementsByClassName(classTableScrollableContent);
    this.tableEl = this.tableScroll[0].getElementsByClassName(classTable);

    this.activeTable = false;

    this.tableSizeCheck();
    this.viewportCheck();
  }

  tableSizeCheck() {
    this.tableWidth = this.tableEl[0].offsetWidth;
    this.tableContainerWidth = this.tableScroll[0].offsetWidth;
    if (this.tableWidth > this.tableContainerWidth && this.activeTable === false) {
      (this.activeTable = true), this.insertShadows(), this.registerScroll();
    } else if (this.tableWidth <= this.tableContainerWidth && this.activeTable === true) {
      this.removeShadows(), (this.activeTable = false);
    }
  }

  viewportCheck() {
    window.addEventListener('resize', () => this.tableSizeCheck(), true);
  }

  registerScroll() {
    this.tableScroll[0].addEventListener('scroll', this.toggleShadows.bind(this));
  }

  insertShadows() {
    const rightShadowEl = document.createElement('div');
    const leftShadowEl = document.createElement('div');

    rightShadowEl.className = 'right-shadow visible';
    leftShadowEl.className = 'left-shadow';
    this.tableScroll[0].appendChild(rightShadowEl), this.tableScroll[0].insertBefore(leftShadowEl, this.tableScroll[0].firstChild);
  }

  removeShadows() {
    const rightShadow = this.tableScroll[0].querySelector('.right-shadow');
    const leftShadow = this.tableScroll[0].querySelector('.left-shadow');
    this.tableScroll[0].removeChild(rightShadow), this.tableScroll[0].removeChild(leftShadow);
  }

  toggleShadows() {
    const rightShadow = this.tableScroll[0].querySelector('.right-shadow');
    const leftShadow = this.tableScroll[0].querySelector('.left-shadow');
    const tableScrollPos = this.getOffset(this.tableScroll[0]).left;
    const tablePos = this.getOffset(this.tableEl[0]).left;

    this.tableWidth = this.tableEl[0].offsetWidth;
    this.tableContainerWidth = this.tableScroll[0].offsetWidth;
    tablePos === tableScrollPos ? leftShadow.classList.remove('visible') : leftShadow.classList.add('visible');

    -tableScrollPos === this.tableContainerWidth - this.tableWidth - tablePos
      ? rightShadow.classList.remove('visible')
      : rightShadow.classList.add('visible');

    setTimeout(function() {
      return leftShadow.classList.add('with-transition'), rightShadow.classList.add('with-transition');
    }, 200);
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX
    };
  }
}

export default function tableScroller() {
  const tableComponent = [...document.getElementsByClassName(classTableScrollable)];
  tableComponent.forEach(table => new TableScroll(table));
}
domready(tableScroller);
