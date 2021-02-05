# ONS Design System

[![GitHub release](https://img.shields.io/github/release/ONSdigital/design-system.svg)](https://github.com/ONSdigital/design-system/releases)
[![Travis tests](https://img.shields.io/travis/ONSdigital/design-system.svg)](https://travis-ci.org/ONSdigital/design-system)
[![codecov](https://codecov.io/gh/ONSdigital/design-system/branch/master/graph/badge.svg)](https://codecov.io/gh/ONSdigital/design-system)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e8f9a091991d4d5a85d0b0b85e26dde6)](https://www.codacy.com/app/bameyrick/design-system)
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
```

### Start a local server

```bash
yarn start
```

Once the server has started, navigate to <http://localhost:3030>

## Testing

To test locally ensure you've followed all the steps above to install dependencies. You can have three options:

### Run tests locally in watch mode

This will watch your test files and JavaScript for changes and rerun the test suite each time a change is detected.

_Note_: This will only run tests on the ES6 bundle.

```bash
yarn test:local
```

### Run ES6 and ES5 bundle tests

Running this will run the test suite twice, once against the ES6 bundle and again against the ES5 bundle. However, as local tests only run on evergreen browsers it will be unlikely that you see the ES5 testing fail if the ES6 testing passes.

```bash
yarn test
```

### Run tests in BrowserStack

All unit tests are automatically cross browser tested in [BrowserStack](https://www.browserstack.com) by [TravisCI](https://travis-ci.org/ONSdigital/design-system) when a pull request is created or if a change is pushed to an existing pull request.

You can also run cross browser testing in BrowserStack manually against your local branch by running this command:

_Note_: You will need to set your `BROWSER_STACK_USERNAME` and `BROWSER_STACK_ACCESS_KEY` environment variables to allow authentication with BrowserStack. Username and access keys can be found under _Automate_ on the [BrowserStack settings page](https://www.browserstack.com/accounts/settings).

```bash
yarn test:browserstack
```

## Run visual regression tests

To run visual regression (VR) tests on pull requests using our VR testing tool [percy.io](https://percy.io) you must include `[test-visual]` in your commit message e.g. `git commit -m "Update button border width [test-visual]"`. This prevents unnecessary builds and saves the limited quota we have available.

## Build

Generate a build into `./build`. Will also create [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) reports for both the ES6 and ES5 bundle and open them in your default browser.

```bash
yarn build
```

## Recommended Visual Studio Code plugins for this project

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
- [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)
- [vscode-remark-lint](https://marketplace.visualstudio.com/items?itemName=drewbourne.vscode-remark-lint)
