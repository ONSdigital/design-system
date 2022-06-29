import * as cheerio from 'cheerio';

import * as helper from '../../tests/helpers/cheerio';

const EXAMPLE_HTML = `
  <div>
    <div id="a">First</div>
    <div id="b" class="second">Second</div>
    <div id="c" class="third">Third</div>
  </div>
`;

describe('mapAll(cheerioNodes, selector)', () => {
  it('gets mapped values`', () => {
    const $ = cheerio.load(EXAMPLE_HTML);
    const values = helper.mapAll($('div > div'), node => node.attr('id'));

    expect(values).toEqual(['a', 'b', 'c']);
  });

  it('gets all mapped values including `undefined`', () => {
    const $ = cheerio.load(EXAMPLE_HTML);
    const values = helper.mapAll($('div > div'), node => node.attr('class'));

    expect(values).toEqual([undefined, 'second', 'third']);
  });
});
