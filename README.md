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
```

### Start a local server

```bash
yarn start
```

Once the server has started, navigate to <http://localhost:3030>

## Mixed Markdown/Nunjucks syntax in .njk pages

The design system documentation is authored with files that contain a mix of Markdown and Nunjucks syntax. These files begin with frontmatter and then contain Markdown syntax; for example:

```markdown
---
title: Foo
---

## Some section

A simple paragraph of _markdown_.
```

Simple Nunjucks placeholders/variables can be added into these files without any special syntax; for example:

```markdown
A paragraph of _markdown_ with some template value {{ foo.bar }}.

{{
    patternlibExample({"path": "components/foo/examples/foo/index.njk"})
}}
```

For the most part no special syntax is needed when mixing Nunjucks templating into the markdown syntax. If syntax contains nested character sequence `}}` then it must be wrapped within `+++` fences. The `{% ... %}` syntax must also be wrapped within `+++` fences. This applies for things like imports, calling macros, defining blocks, etc:

```markdown
+++
{% from "views/partials/example/_macro.njk" import patternlibExample %}
{% from "components/external-link/_macro.njk" import onsExternalLink %}
+++
```

As a rule of thumb; code highlight blocks should always be wrapped with `+++` fences:

```markdown
+++
{% from "components/code-highlight/_macro.njk" import onsCodeHighlight %}
{{ onsCodeHighlight({
"code": '[
  {
    "en": "England"
  },
  {
    "en": "Wales"
  },
  {
    "en": "Scotland"
  },
  {
    "en": "Northern Ireland"
  },
]'
}) }}
+++
```

Mixed markdown files are easier to maintain when each section that is fenced with `+++` is a standalone unit. For example, each code example should have it's own `+++` fence even if they immediately follow one another. This is because content can be edited around these fenced units.

## Testing

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

## Run visual regression tests

To run visual regression (VR) tests on pull requests using our VR testing tool [percy.io](https://percy.io) you must include `[test-visual]` in your commit message e.g. `git commit -m "Update button border width [test-visual]"`. This prevents unnecessary builds and saves the limited quota we have available.

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
