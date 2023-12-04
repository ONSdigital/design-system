# ONS Design System

[![GitHub release](https://img.shields.io/github/release/ONSdigital/design-system.svg)](https://github.com/ONSdigital/design-system/releases)
[![Tests](https://github.com/ONSdigital/design-system/actions/workflows/tests.yml/badge.svg)](https://github.com/ONSdigital/design-system/actions/workflows/tests.yml)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/ONSdigital/design-system.svg)](https://github.com/ONSdigital/design-system/pulls)
[![Github last commit](https://img.shields.io/github/last-commit/ONSdigital/design-system.svg)](https://github.com/ONSdigital/design-system/commits)
[![Github contributors](https://img.shields.io/github/contributors/ONSdigital/design-system.svg)](https://github.com/ONSdigital/design-system/graphs/contributors)

## Installing as a dependency

Nunjucks macros for components and templates are available from npm. Built CSS and JS is also available if you need access to pre-release CSS/JS, otherwise CSS and JS should be loaded from the CDN.

```bash
yarn add @ons/design-system
```

## Run Locally

You'll need [Git](https://help.github.com/articles/set-up-git/), [Node.js](https://nodejs.org/en/), and [Yarn](https://yarnpkg.com/en/docs/getting-started) to run this project locally.

The version of node required is outlined in [.nvmrc](./.nvmrc).

### Using nvm (optional)

If you work across multiple Node.js projects there's a good chance they require different Node.js and npm versions.

To enable this we use [nvm (Node Version Manager)](https://github.com/creationix/nvm) to switch between versions easily.

1. [install nvm](https://github.com/creationix/nvm#installation)
2. Run nvm install in the project directory (this will use .nvmrc)

### Install dependencies

```bash
yarn install
husky install
```

### Start a local server

```bash
yarn start
```

Once the server has started, navigate to <http://localhost:3030>

## Testing - macros and scripts

This project uses [jest](https://jestjs.io/docs/cli) and supports its command line options.

```bash
yarn test [jest-args]
```

### Run macro, unit and in-browser interaction tests

Macros and units are tested in the Node execution environment whereas interaction tests are ran in the web browser using [puppeteer](https://developer.chrome.com/docs/puppeteer/).

```bash
yarn test
```

### Run specific tests

Tests can be filtered using the [`testNamePattern`](https://jestjs.io/docs/cli#--testnamepatternregex) jest argument.

To run all macro tests:

```bash
yarn test --testNamePattern="macro:"
```

To run tests associated with a specific macro:

```bash
yarn test --testNamePattern="macro: button"
```

To run all axe tests:

```bash
yarn test --testNamePattern="axe"
```

### Snapshot test for base page template

There is a snapshot test of the base page template that runs alongside the component tests. The snapshot will need to be updated if the base page template is changed.

To update the snapshot:

```bash
yarn test --testNamePattern="base page template" -u
```

### Run tests locally in watch mode

This will watch for changed files based on git uncommitted files.

```bash
yarn test --watch
```

_Note_: This command is of limited use since JavaScript and SCSS files will only be processed and bundled once each time the above command is ran. This command is only useful when working on JavaScript units that can be tested without bundling.

### Testing tips

It is sometimes useful to adjust the following settings when writing tests or diagnosing issues:

- `headless` in 'jest-puppeteer.config.js' - when set to `false` will show web browser whilst running tests. Many browser windows open since jest runs tests in parallel so it is useful to also adjust the `test` script inside 'package.json' such that it targets a specific test file. `await page.waitForTimeout(100000)` can be temporarily added to a test to allow yourself time to inspect the browser that appears.

- `testTimeout` in 'jest.config.js' - set to a high value such as `1000000` to prevent tests from timing out when doing the above.

## Testing - Visual regression tests

This project uses [Backstop JS](https://github.com/garris/BackstopJS) for visual regression testing. The tests run in Chrome headless using pupeteer inside docker and run in three viewports; 1920 (desktop), 768 (tablet) and 375 (mobile). Reference images are stored in Git LFS and any approved changes will automatically be stored in Git LFS when pushed to the repository.

The visual tests will run automatically on pull requests and the result will be available in the Github Action logs. If the tests fail, the process for viewing the failures and approving changes will need to be handled locally using the following workflow and commands.

The first time you run the tests locally you will need to install Git LFS on your machine. Follow the install instructions for [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage).

You will need to have Docker installed and started locally. We are using Docker as there are font rendering issues that caused failures across different os versions when we run the tests in CI. There is further information on this in the [Backstop JS docs](https://github.com/garris/BackstopJS#using-docker-for-testing-across-different-environments).

Checkout the branch locally and run:

`git lfs fetch` - This downloads the files into your `.git/lfs` if you have never run vr test locally.

`git lfs checkout` - This will pull the current reference images from the repository for you to test against.

`yarn test-visual` - This will run the same tests locally as were run in Github Actions. After they have completed the report will open in your default browser.

`yarn test-visual:approve` - This will approve the failures/diff caught by the tests.

`yarn test-visual:reference` - This will update the reference images locally on your machine. Run this command if you've approved your reference images but the local tests are still failing.

`git lfs push --all origin` - First commit the files in the normal way then run the command. This will push the new reference images to Git LFS.

If your local tests are failing but you have approved them, run `yarn test-visual:reference`. This will update the reference images locally on your machine.

You can then commit and push the updated references and your changes to your branch. The test images that would have been created when you ran `yarn test-visual` are gitignored and the new references images will be pushed to Git LFS.

## Build

Generate a build into `./build`.

```bash
yarn build
```

## Recommended Visual Studio Code plugins for this project

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [vscode-remark-lint](https://marketplace.visualstudio.com/items?itemName=drewbourne.vscode-remark-lint)
