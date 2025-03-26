import domready from './domready';

export default function toggleDetails() {
    // get all <details> elements
    const allDetails = document.querySelectorAll('details');

    // collapse all <details> by default
    allDetails.forEach((detail) => {
        detail.removeAttribute('open');
    });

    // expand all <details> before printing
    window.addEventListener('beforeprint', () => {
        allDetails.forEach((detail) => {
            detail.setAttribute('open', '');
        });
    });

    // collapse all <details> again after printing
    window.addEventListener('afterprint', () => {
        allDetails.forEach((detail) => {
            detail.removeAttribute('open');
        });
    });
}

domready(toggleDetails);
