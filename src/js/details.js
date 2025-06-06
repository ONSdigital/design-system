import domready from './domready';

export default function toggleDetails() {
    const allDetails = document.querySelectorAll('details');

    // Collapse all <details> elements by default, unless they have 'data-open' attribute
    allDetails.forEach((detail) => {
        if (!detail.hasAttribute('data-open')) {
            detail.removeAttribute('open');
        }
    });

    // Expand all <details> before printing
    window.addEventListener('beforeprint', () => {
        allDetails.forEach((detail) => {
            // Set as visible if already open
            if (detail.hasAttribute('open')) {
                detail.dataset.open = 'true';
            } else {
                detail.setAttribute('open', '');
            }
        });
    });

    // Collapse all <details> after printing
    window.addEventListener('afterprint', () => {
        allDetails.forEach((detail) => {
            // Re-open all <details> which were previously visible
            if (detail.dataset.open === 'true') {
                detail.setAttribute('open', '');
                delete detail.dataset.open;
            } else {
                detail.removeAttribute('open');
            }
        });
    });
}

domready(toggleDetails);
