import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/table/src/_template.njk';
import tableScroll from 'components/table/src/scrollable-table';

const params = {
  scrollable: true,
  ths: [
    {
      value: 'Column 1'
    },
    {
      value: 'Column 2'
    },
    {
      value: 'Column 3'
    },
    {
      value: 'Column 4'
    },
    {
      value: 'Column 5'
    },
    {
      value: 'Column 6'
    },
    {
      value: 'Column 8'
    },
    {
      value: 'Column 9'
    },
    {
      value: 'Column 10'
    },
    {
      value: 'Column 11'
    },
    {
      value: 'Column 12'
    },
    {
      value: 'Column 13'
    }
  ],
  trs: [
    {
      tds: [
        {
          value: 'Monthly Business Survey - Retail Sales Index'
        },
        {
          value: 'Annual Inward Foreign Direct Investment Survey'
        },
        {
          value: 'Business Register and Employment Survey'
        },
        {
          value: 'Quartely Survey of Building Materials Sand and Gravel'
        },
        {
          value: 'Monthly Survey of Building Materials Concrete Building Blocks'
        },
        {
          value: 'Monthly Business Survey - Retail Sales Index'
        },
        {
          value: 'Annual Inward Foreign Direct Investment Survey'
        },
        {
          value: 'Business Register and Employment Survey'
        },
        {
          value: 'Quartely Survey of Building Materials Sand and Gravel'
        },
        {
          value: 'Monthly Survey of Building Materials Concrete Building Blocks'
        },
        {
          value: 'Monthly Business Survey - Retail Sales Index'
        },
        {
          value: 'Annual Inward Foreign Direct Investment Survey'
        },
        {
          value: 'Business Register and Employment Survey'
        }
      ]
    }
  ]
};

describe.only('Component: Scrollable table', function() {
  before(() => awaitPolyfills);

  beforeEach(function() {
    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });

    this.tableEl.style.width = '2000px';
    this.tableComponent.style.position = 'relative';
    this.tableScrollEl.style.width = '100%';
    this.tableScrollEl.style.overflow = 'visible';
    this.tableScrollEl.style.overflowX = 'scroll';
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When the component initialises', function() {
    beforeEach(() => {
      tableScroll();
    });

    it('should add shadow elements', function() {
      const leftShadowElement = this.tableComponent.querySelector('.left-shadow');
      const rightShadowElement = this.tableComponent.querySelector('.right-shadow');
      expect(this.tableComponent.contains(leftShadowElement)).to.equal(true);
      expect(this.tableComponent.contains(rightShadowElement)).to.equal(true);
    });

    describe('When the table component is scrolled,', function() {
      beforeEach('Scroll table', function() {
        this.tableScrollEl.scrollLeft = 10;
      });

      it('should show both shadow elements', function(done) {
        const tableComponent = this.tableComponent;
        setTimeout(function() {
          const leftShadowVisible = tableComponent.querySelector('.left-shadow.visible');
          const rightShadowVisible = tableComponent.querySelector('.right-shadow.visible');
          expect(tableComponent.contains(leftShadowVisible)).to.equal(true);
          expect(tableComponent.contains(rightShadowVisible)).to.equal(true);
          done();
        }, 200);
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const tableComponent = wrapper.querySelector('.table-scrollable');
  const tableScrollEl = tableComponent.querySelector('.table-scrollable__content');
  const tableEl = tableComponent.querySelector('.table');

  return {
    wrapper,
    tableComponent,
    tableScrollEl,
    tableEl
  };
}
