import domready from '../../js/domready';

async function tableOfContents() {
    const tableOfContents = [...document.querySelectorAll('.ons-js-table-of-contents-container')];

    if (tableOfContents.length) {
        const TableOfContents = (await import('./table-of-contents')).default;

        tableOfContents.forEach((component) => new TableOfContents(component));
    }
}

domready(tableOfContents);
