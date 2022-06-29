import { configureAxe } from 'jest-axe';
import 'jest-axe/extend-expect';

// As we're testing incomplete HTML fragments, we don't expect there to be a
// skip link, or for them to be contained within landmarks.
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false },
  },
});

export default axe;
