export const EXAMPLE_DOCUMENT_LIST_BASIC = {
    title: {
        text: 'Crime and justice',
        url: '#0',
    },
    description: 'Some description',
};

export const EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL = {
    ...EXAMPLE_DOCUMENT_LIST_BASIC,
    thumbnail: {
        smallSrc: '/example-small.png',
        largeSrc: '/example-large.png',
    },
};

export const EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE = {
    ...EXAMPLE_DOCUMENT_LIST_BASIC,
    metadata: {
        file: {
            fileType: 'PDF',
            fileSize: '499KB',
            filePages: '1 page',
        },
    },
};

export const EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT = {
    ...EXAMPLE_DOCUMENT_LIST_BASIC,
    metadata: {
        object: {
            text: 'Poster',
            url: '#0',
            ref: 'some ref',
        },
    },
};

export const EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE = {
    ...EXAMPLE_DOCUMENT_LIST_BASIC,
    metadata: {
        date: {
            iso: '2022-01-01',
            short: '1 January 2022',
        },
    },
};

export const EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE = {
    ...EXAMPLE_DOCUMENT_LIST_BASIC,
    id: 'some-id',
    thumbnail: {
        smallSrc: '/example-small.png',
        largeSrc: '/example-large.png',
    },
    metadata: {
        object: {
            text: 'Poster',
            url: '#0',
            ref: 'some ref',
        },
        file: {
            fileType: 'PDF',
            fileSize: '499KB',
            filePages: '1 page',
        },
        date: {
            iso: '2022-01-01',
            short: '1 January 2022',
            showPrefix: true,
            prefix: 'Released',
        },
    },
};
