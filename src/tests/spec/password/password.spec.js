import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/password/src/_template.njk';
import password from 'components/password/src/password';

const params = {
  id: 'password',
  label: {
    text: 'Password'
  },
  showPasswordText: 'Show password'
};

describe('Component: Password', () => {
  let wrapper, checkboxWrap, checkbox, input;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    checkboxWrap = wrapper.querySelector('.js-password-toggle-wrap');
    checkbox = document.getElementById(`${params.id}-toggle`);
    input = document.getElementById(params.id);

    password();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the component has loaded', () => {
    it('checkbox should be visible', () => {
      expect([...checkboxWrap.classList].includes('u-d-no')).to.equal(false);
    });
  });

  describe('Given the user has not toggled to "Show password"', () => {
    describe('when the user toggles to show password', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('the input type should change to text', () => {
        expect(input.type).to.equal('text');
      });
    });
  });

  describe('Given the user has toggled to "Show password"', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user toggles to hide the password', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('the input type should change to password', () => {
        expect(input.type).to.equal('password');
      });
    });
  });
});
