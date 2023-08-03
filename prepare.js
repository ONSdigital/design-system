// This file removes the instalation of husky hooks on CI. It was causing an issue on Netlify
// https://answers.netlify.com/t/error-when-building-a-react-app-that-has-husky-installed/54344
const isCi = process.env.CI !== undefined;
if (!isCi) {
  require('husky').install();
}
