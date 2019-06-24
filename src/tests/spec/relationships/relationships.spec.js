import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/relationships/_test-template.njk';
import Relationships from 'components/relationships/relationships';

const params = {
  legend: 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>…</em>',
  titleRelated: 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>{x}</em>',
  titleUnrelated: 'Thinking of Joe Bloggs, Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
  // eslint-disable-next-line prettier/prettier
  playbackRelated: 'Amanda Bloggs is Joe Bloggs\' <em>{x}</em>',
  playbackUnrelated: 'Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
  // eslint-disable-next-line prettier/prettier
  playback: 'Amanda Bloggs is Joe Bloggs\' <em>…</em>',
  name: 'relationship',
  radios: [
    {
      id: 'husband-wife',
      value: 'husband-wife',
      label: {
        text: 'Husband or wife'
      }
    },
    {
      id: 'civil-partner',
      value: 'civil-partner',
      label: {
        text: 'Legally registered civil partner'
      }
    },
    {
      id: 'partner',
      value: 'partner',
      label: {
        text: 'Partner'
      }
    },
    {
      id: 'son-daughter',
      value: 'son-daughter',
      label: {
        text: 'Son or daughter'
      }
    },
    {
      id: 'stepchild',
      value: 'stepchild',
      label: {
        text: 'Stepchild'
      }
    },
    {
      id: 'brother-sister',
      value: 'brother-sister',
      label: {
        text: 'Brother or sister'
      }
    },
    {
      id: 'stepbrother-stepsister',
      value: 'stepbrother-stepsister',
      label: {
        text: 'Stepbrother or stepsister'
      }
    },
    {
      id: 'mother-father',
      value: 'mother-father',
      label: {
        text: 'Mother or father'
      }
    },
    {
      id: 'stepmother-stepfather',
      value: 'stepmother-stepfather',
      label: {
        text: 'Stepmother or stepfather'
      }
    },
    {
      id: 'grandchild',
      value: 'grandchild',
      label: {
        text: 'Grandchild'
      }
    },
    {
      id: 'grandparent',
      value: 'grandparent',
      label: {
        text: 'Grandparent'
      }
    },
    {
      id: 'other-relation',
      value: 'other-relation',
      label: {
        text: 'Other relation'
      }
    },
    {
      id: 'unrelated',
      value: 'unrelated',
      label: {
        text: 'Unrelated',
        description: 'Including foster child'
      }
    }
  ]
};

describe('Component: Relationships', function() {
  before(() => awaitPolyfills);

  beforeEach(function() {
    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('Given that the component has not initialised', function() {
    it('then the playback paragraph should not be visible', function() {
      expect(this.playback.classList.contains('u-d-no')).to.equal(true);
    });

    describe('when the component initialises', function() {
      beforeEach(function() {
        this.instance = new Relationships(this.context);
      });

      it('then the playback paragraph should become visible', function() {
        expect(this.playback.classList.contains('u-d-no')).to.equal(false);
      });

      describe('when the user selects a relationship', function() {
        beforeEach(function() {
          this.selectedRadio = this.radios[0];
          this.selectedRadio.click();
        });

        it('the question title should be changed to reflect the relationship', function() {
          expect(this.h1.innerHTML).to.equal(params.titleRelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });

        it('the legend should be changed to reflect the relationship', function() {
          expect(this.legend.innerHTML).to.equal(params.titleRelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });

        it('the playback should be changed to reflect the relationship', function() {
          expect(this.playback.innerHTML).to.equal(params.playbackRelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });
      });

      describe('when the user says they are unrelated', function() {
        beforeEach(function() {
          this.selectedRadio = this.radios.find(radio => radio.value === 'unrelated');
          this.selectedRadio.click();
        });

        it('the question title should be changed to say they are unrelated', function() {
          expect(this.h1.innerHTML).to.equal(params.titleUnrelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });

        it('the legend should be changed to say they are unrelated', function() {
          expect(this.legend.innerHTML).to.equal(params.titleUnrelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });

        it('the playback should be changed to say they are unrelated', function() {
          expect(this.playback.innerHTML).to.equal(params.playbackUnrelated.replace('{x}', getLabelText(this.context, this.selectedRadio)));
        });
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const context = document.querySelector('.js-relationships');
  const h1 = wrapper.querySelector('h1');
  const legend = context.querySelector('.js-relationships-legend');
  const radios = [...context.querySelectorAll('input[type=radio]')];
  const playback = context.querySelector('.js-relationships-playback');

  return {
    wrapper,
    context,
    h1,
    legend,
    radios,
    playback
  };
}

function getLabelText(context, radio) {
  return context
    .querySelector(`label[for=${radio.id}]`)
    .childNodes[0].textContent.trim()
    .toLowerCase();
}
