# ONS Design System

## Dev environment

- Use Yarn Classic, not npm
- Ensure Node version with `nvm use`

## Repo layout

    - src/components  # individual Design System components
    - src/js          # share scripts

    <!-- todo more on the repo layout -->

## Testing

- `yarn test` is the main validation command, and builds assets and runs all macro, unit, and Puppeteer browser tests
- For a faster targeted browser test, build assets first, then run Jest:

      yarn gulp build-assets && TEST_PORT=3020 TEST_WITH_PUPPETEER=1 yarn jest path/to/test.spec.js --runInBand

- For a macro or unit-only spec, run Jest directly; asset building and Puppeteer environment variables are not needed:

      yarn jest path/to/test.spec.js --runInBand

- Browser specs rely on compiled `build/scripts/main.js`; running them without yarn gulp build-assets after a cleanup/build can produce misleading failures or main.js 404s
- Visual regression tests require Docker and Git LFS
- CI runs Backstop in shards. You can run one representative shard locally before the full suite
- Do not update visual-reference images without reviewing the Backstop diff report

## CI

- Github and Github Actions

## Dependencies

- Use `yarn audit --json` for a machine-readable vulnerability report
- Review `resolutions` carefully: they override transitive dependency versions
- Babel must remain on 7.x while the project uses `babelify@10`
- ESLint must remain on 9.x while the project uses `@babel/eslint-parser@7`
