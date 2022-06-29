import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_RELATIONSHIPS = {
  dontWrap: true,
  playback: "Amanda Bloggs is Joe Bloggs' <em>…</em>",
  name: 'relationship',
  radios: [
    {
      id: 'grandparent',
      value: 'grandparent',
      label: {
        text: 'Grandparent',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>grandparents</em>',
        'data-playback': "Amanda Bloggs is Joe Bloggs' <em>grandparents</em>",
      },
    },
    {
      id: 'other-relation',
      value: 'other-relation',
      label: {
        text: 'Other relation',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>other relation</em>',
        'data-playback': "Amanda Bloggs is Joe Bloggs' <em>other relation</em>",
      },
    },
    {
      id: 'unrelated',
      value: 'unrelated',
      label: {
        text: 'Unrelated',
        description: 'Including foster child',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
        'data-playback': 'Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
      },
    },
  ],
};

describe('script: relationships', () => {
  beforeEach(async () => {
    await setTestPage(
      '/test',
      renderComponent(
        'question',
        {
          title: 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>…</em>',
          readDescriptionFirst: true,
          legendIsQuestionTitle: true,
          legendTitleClasses: 'ons-js-relationships-legend',
        },
        [renderComponent('relationships', EXAMPLE_RELATIONSHIPS)],
      ),
    );
  });

  describe('when the component initialises', () => {
    it('then the playback paragraph should become visible', async () => {
      const hasHideClass = await page.$eval('.ons-relationships__playback', node => node.classList.contains('ons-u-d-no'));
      expect(hasHideClass).toBe(false);
    });
  });

  describe('when the user selects a relationship', () => {
    beforeEach(async () => {
      await page.click('#other-relation');
    });

    it('the question title should be changed to reflect the relationship', async () => {
      const headingText = await page.$eval('h1', element => element.innerHTML);
      expect(headingText.trim()).toBe('Thinking of Joe Bloggs, Amanda Bloggs is their <em>other relation</em>');
    });

    it('the playback should be changed to reflect the relationship', async () => {
      const playbackText = await page.$eval('.ons-relationships__playback', element => element.innerHTML);
      expect(playbackText.trim()).toBe("Amanda Bloggs is Joe Bloggs' <em>other relation</em>");
    });
  });
});
