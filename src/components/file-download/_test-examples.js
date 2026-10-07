export const EXAMPLE_FILE_DOWNLOAD_BASIC = {
    fileFormat: 'PDF',
    fileName: 'Annual population survey',
    supportingInformation: 'Estimates of the UK population broken down by age, sex and geography.',
    url: '/downloads/annual-population-survey.pdf',
};

export const EXAMPLE_FILE_DOWNLOAD_CSV = {
    fileFormat: 'CSV',
    fileName: 'Population estimates dataset',
    supportingInformation: 'Raw population estimates data suitable for analysis.',
    url: '/downloads/population-estimates.csv',
};

export const EXAMPLE_FILE_DOWNLOAD_XLS = {
    fileFormat: 'XLS',
    fileName: 'Household expenditure tables',
    supportingInformation: 'Detailed expenditure tables in spreadsheet format.',
    url: '/downloads/household-expenditure.xlsx',
};

export const EXAMPLE_FILE_DOWNLOAD_NO_FORMAT = {
    fileName: 'Methodology notes',
    supportingInformation: 'Supporting methodology documentation.',
    url: '/downloads/methodology-notes.zip',
};

export const EXAMPLE_FILE_DOWNLOAD_CUSTOM_LINK_TEXT = {
    ...EXAMPLE_FILE_DOWNLOAD_BASIC,
    linkText: 'Save',
};
