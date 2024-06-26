import domready from '../../js/domready';

export const classTableSortable = 'ons-table--sortable';

async function tableSorter() {
    const tables = [...document.querySelectorAll(`.${classTableSortable}`)];

    if (tables.length) {
        const TableSort = (await import('./sortable-table')).default;

        tables.forEach((table, index) => new TableSort(table, index));
    }
}

domready(tableSorter);
