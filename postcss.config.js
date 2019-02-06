import postcssUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import mqoptimize from 'postcss-mq-optimize';
import cssnano from 'cssnano';

const BASE_HREF = '';
const DEPLOY_URL = '';

export default () => {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: {
      removeAll: true
    }
  };

  return [
    postcssUrl({
      url: ({ url }) => {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        if (!url.startsWith('/') || url.startsWith('//')) {
          console.log('URL', url.replace(/\/\/+/g, '/'));
          return url.replace(/\/\/+/g, '/');
        }
        if (DEPLOY_URL.match(/:\/\//)) {
          // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
          console.log('1', `${DEPLOY_URL.replace(/\/$/, '')}${url}`);
          return `${DEPLOY_URL.replace(/\/$/, '')}${url}`;
        } else if (BASE_HREF.match(/:\/\//)) {
          console.log('2', BASE_HREF.replace(/\/$/, '') + `/${DEPLOY_URL}/${url}`.replace(/\/\/+/g, '/'));
          // If baseHref contains a scheme, include it as is.
          return BASE_HREF.replace(/\/$/, '') + `/${DEPLOY_URL}/${url}`.replace(/\/\/+/g, '/');
        } else {
          // Join together base-href, deploy-url and the original URL.
          // Also dedupe multiple slashes into single ones.
          console.log('3', `/${BASE_HREF}/${DEPLOY_URL}/${url}`.replace(/\/\/+/g, '/'));
          return `/${BASE_HREF}/${DEPLOY_URL}/${url}`.replace(/\/\/+/g, '/');
        }
      }
    }),
    autoprefixer(),
    mqoptimize(),
    cssnano(minimizeOptions)
  ];
};
