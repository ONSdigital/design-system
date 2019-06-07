import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/uac/_test-template.njk';
import UAC from 'components/uac/uac';

const params = {
  id: 'uac',
  name: 'uac',
  label: {
    text: 'Enter the 16 character code printed on the letter',
    description: 'Keep this code safe and only share it with others in your household'
  },
  securityMessage: 'Your personal information is protected by law and will be kept confidential.'
};

describe('Component: UAC Input', () => {
  let wrapper, input, instance;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    input = document.getElementById(params.id);

    instance = new UAC(input);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given that the input is empty, when the user inputs characters', () => {
    beforeEach(() => {
      input.value = '0000000000000000';
      instance.handleInput();
    });

    it('they should be spaced out in groups of 4', () => {
      expect(input.value).to.equal('0000  0000  0000  0000');
    });
  });
});
