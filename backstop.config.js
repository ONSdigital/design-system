module.exports = {
    id: 'ds-vr-test',
    viewports: [
        {
            label: 'desktop',
            width: 1920,
            height: 1080,
        },
        {
            label: 'tablet',
            width: 768,
            height: 1024,
        },
        {
            label: 'mobile',
            width: 375,
            height: 667,
        },
    ],
    scenarios: [],
    paths: {
        bitmaps_reference: 'backstop_data/bitmaps_reference',
        bitmaps_test: 'backstop_data/bitmaps_test',
        engine_scripts: 'backstop_data/engine_scripts',
        html_report: 'backstop_data/html_report',
        ci_report: 'backstop_data/ci_report',
    },
    engine: 'puppeteer',
    engineOptions: {
        args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--shm-size=512mb',
            '--disable-dev-shm-usage',
            '--cap-add=SYS_ADMIN',
        ],
        headless: true,
        gotoParameters: { waitUntil: 'networkidle0' },
    },
    report: process.env.RUNNING_IN_CI === 'true' ? [] : ['browser'],
    dockerCommandTemplate:
        'docker run --rm -it --add-host=host.docker.internal:host-gateway --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
};
