import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: back-to-top', () => {
  beforeEach(async () => {
    await setTestPage(
      '/test',
      `
        <div class="ons-back-to-top-track ons-container">
          <div class="ons-grid">
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Enim neque volutpat ac tincidunt. Tortor pretium viverra suspendisse potenti nullam ac tortor. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Odio morbi quis commodo odio. Lobortis feugiat vivamus at augue eget. Aliquam id diam maecenas ultricies mi eget. Dictum non consectetur a erat nam at lectus urna. Justo laoreet sit amet cursus sit amet. Tristique senectus et netus et malesuada fames. Etiam dignissim diam quis enim. Urna id volutpat lacus laoreet non curabitur. Proin sagittis nisl rhoncus mattis. Vel pretium lectus quam id leo in vitae turpis.
                Orci nulla pellentesque dignissim enim sit amet venenatis urna. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Quis commodo odio aenean sed adipiscing. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Pellentesque sit amet porttitor eget dolor. Habitant morbi tristique senectus et netus et malesuada. Curabitur vitae nunc sed velit. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Id leo in vitae turpis massa. Vitae ultricies leo integer malesuada.
                Elit at imperdiet dui accumsan sit amet nulla. Pretium quam vulputate dignissim suspendisse in est ante. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Mattis aliquam faucibus purus in massa tempor nec. Orci a scelerisque purus semper. Vel fringilla est ullamcorper eget nulla facilisi. Ac ut consequat semper viverra nam libero justo laoreet sit. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Lobortis scelerisque fermentum dui faucibus in ornare quam. Diam vel quam elementum pulvinar etiam. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean.
                Pulvinar sapien et ligula ullamcorper malesuada. Risus pretium quam vulputate dignissim suspendisse in est. Facilisi etiam dignissim diam quis enim. Sodales ut eu sem integer vitae. Eget nunc scelerisque viverra mauris. Malesuada bibendum arcu vitae elementum curabitur. Elementum nisi quis eleifend quam adipiscing vitae proin. Ultrices vitae auctor eu augue. Hac habitasse platea dictumst vestibulum rhoncus est. Urna neque viverra justo nec ultrices dui sapien eget mi. Quisque egestas diam in arcu cursus euismod quis viverra. Nullam ac tortor vitae purus faucibus. Fames ac turpis egestas maecenas. Magna fermentum iaculis eu non diam phasellus vestibulum. Nisl nunc mi ipsum faucibus vitae aliquet nec. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Faucibus turpis in eu mi bibendum neque egestas.
                Lectus nulla at volutpat diam ut venenatis tellus. Tellus rutrum tellus pellentesque eu tincidunt tortor. Purus sit amet volutpat consequat mauris nunc congue. Dignissim cras tincidunt lobortis feugiat vivamus at. Ac felis donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Pulvinar proin gravida hendrerit lectus a. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Maecenas sed enim ut sem viverra aliquet eget. Lacus laoreet non curabitur gravida arcu ac tortor. Laoreet sit amet cursus sit amet dictum. Maecenas accumsan lacus vel facilisis volutpat est velit.
              </div>
            </div>
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sem integer vitae justo eget magna fermentum iaculis. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Imperdiet proin fermentum leo vel orci porta non. Sed enim ut sem viverra aliquet eget sit amet. Rhoncus mattis rhoncus urna neque viverra justo. At tellus at urna condimentum mattis pellentesque. Vel orci porta non pulvinar neque laoreet suspendisse. Consectetur purus ut faucibus pulvinar elementum integer enim. Urna condimentum mattis pellentesque id nibh. Sem integer vitae justo eget magna fermentum. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Adipiscing bibendum est ultricies integer quis auctor elit. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Sapien faucibus et molestie ac feugiat. Tempor id eu nisl nunc mi ipsum. Arcu non sodales neque sodales ut etiam sit amet nisl. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Pellentesque adipiscing commodo elit at imperdiet. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Semper risus in hendrerit gravida rutrum quisque. Tempor nec feugiat nisl pretium fusce id. Ipsum consequat nisl vel pretium. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Etiam tempor orci eu lobortis elementum nibh. Eget nullam non nisi est sit amet facilisis magna. Diam vel quam elementum pulvinar. Dolor morbi non arcu risus quis. Nullam ac tortor vitae purus.
                Morbi leo urna molestie at elementum eu facilisis sed odio. Purus in mollis nunc sed id. Sit amet est placerat in egestas erat imperdiet sed. Diam sollicitudin tempor id eu nisl nunc mi. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ac feugiat sed lectus vestibulum mattis. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Faucibus vitae aliquet nec ullamcorper sit amet. Eu consequat ac felis donec et odio pellentesque diam. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. A erat nam at lectus urna duis convallis. Pellentesque elit eget gravida cum sociis. Cursus sit amet dictum sit amet justo donec enim. Vitae justo eget magna fermentum iaculis. Enim ut sem viverra aliquet. Convallis tellus id interdum velit. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Venenatis a condimentum vitae sapien. Lacus viverra vitae congue eu consequat ac felis. Diam donec adipiscing tristique risus nec feugiat.
                Sit amet mattis vulputate enim nulla aliquet. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Vulputate odio ut enim blandit volutpat. Elit pellentesque habitant morbi tristique senectus et netus. Aliquet lectus proin nibh nisl condimentum id. A iaculis at erat pellentesque adipiscing commodo elit at. Quis ipsum suspendisse ultrices gravida dictum fusce. Sit amet mauris commodo quis imperdiet massa tincidunt. Adipiscing elit ut aliquam purus. A diam maecenas sed enim ut sem viverra aliquet eget. Enim neque volutpat ac tincidunt vitae. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Amet nisl suscipit adipiscing bibendum. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Nulla facilisi cras fermentum odio eu feugiat.
              </div>
            </div>
          </div>
          <div id="contents" class="ons-container">
              <h1>Contents</h1>
          </div>
          <div class="ons-grid">
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Enim neque volutpat ac tincidunt. Tortor pretium viverra suspendisse potenti nullam ac tortor. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Odio morbi quis commodo odio. Lobortis feugiat vivamus at augue eget. Aliquam id diam maecenas ultricies mi eget. Dictum non consectetur a erat nam at lectus urna. Justo laoreet sit amet cursus sit amet. Tristique senectus et netus et malesuada fames. Etiam dignissim diam quis enim. Urna id volutpat lacus laoreet non curabitur. Proin sagittis nisl rhoncus mattis. Vel pretium lectus quam id leo in vitae turpis.
                Orci nulla pellentesque dignissim enim sit amet venenatis urna. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Quis commodo odio aenean sed adipiscing. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Pellentesque sit amet porttitor eget dolor. Habitant morbi tristique senectus et netus et malesuada. Curabitur vitae nunc sed velit. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Id leo in vitae turpis massa. Vitae ultricies leo integer malesuada.
                Elit at imperdiet dui accumsan sit amet nulla. Pretium quam vulputate dignissim suspendisse in est ante. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Mattis aliquam faucibus purus in massa tempor nec. Orci a scelerisque purus semper. Vel fringilla est ullamcorper eget nulla facilisi. Ac ut consequat semper viverra nam libero justo laoreet sit. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Lobortis scelerisque fermentum dui faucibus in ornare quam. Diam vel quam elementum pulvinar etiam. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean.
                Pulvinar sapien et ligula ullamcorper malesuada. Risus pretium quam vulputate dignissim suspendisse in est. Facilisi etiam dignissim diam quis enim. Sodales ut eu sem integer vitae. Eget nunc scelerisque viverra mauris. Malesuada bibendum arcu vitae elementum curabitur. Elementum nisi quis eleifend quam adipiscing vitae proin. Ultrices vitae auctor eu augue. Hac habitasse platea dictumst vestibulum rhoncus est. Urna neque viverra justo nec ultrices dui sapien eget mi. Quisque egestas diam in arcu cursus euismod quis viverra. Nullam ac tortor vitae purus faucibus. Fames ac turpis egestas maecenas. Magna fermentum iaculis eu non diam phasellus vestibulum. Nisl nunc mi ipsum faucibus vitae aliquet nec. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Faucibus turpis in eu mi bibendum neque egestas.
                Lectus nulla at volutpat diam ut venenatis tellus. Tellus rutrum tellus pellentesque eu tincidunt tortor. Purus sit amet volutpat consequat mauris nunc congue. Dignissim cras tincidunt lobortis feugiat vivamus at. Ac felis donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Pulvinar proin gravida hendrerit lectus a. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Maecenas sed enim ut sem viverra aliquet eget. Lacus laoreet non curabitur gravida arcu ac tortor. Laoreet sit amet cursus sit amet dictum. Maecenas accumsan lacus vel facilisis volutpat est velit.
              </div>
            </div>
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sem integer vitae justo eget magna fermentum iaculis. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Imperdiet proin fermentum leo vel orci porta non. Sed enim ut sem viverra aliquet eget sit amet. Rhoncus mattis rhoncus urna neque viverra justo. At tellus at urna condimentum mattis pellentesque. Vel orci porta non pulvinar neque laoreet suspendisse. Consectetur purus ut faucibus pulvinar elementum integer enim. Urna condimentum mattis pellentesque id nibh. Sem integer vitae justo eget magna fermentum. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Adipiscing bibendum est ultricies integer quis auctor elit. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Sapien faucibus et molestie ac feugiat. Tempor id eu nisl nunc mi ipsum. Arcu non sodales neque sodales ut etiam sit amet nisl. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Pellentesque adipiscing commodo elit at imperdiet. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Semper risus in hendrerit gravida rutrum quisque. Tempor nec feugiat nisl pretium fusce id. Ipsum consequat nisl vel pretium. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Etiam tempor orci eu lobortis elementum nibh. Eget nullam non nisi est sit amet facilisis magna. Diam vel quam elementum pulvinar. Dolor morbi non arcu risus quis. Nullam ac tortor vitae purus.
                Morbi leo urna molestie at elementum eu facilisis sed odio. Purus in mollis nunc sed id. Sit amet est placerat in egestas erat imperdiet sed. Diam sollicitudin tempor id eu nisl nunc mi. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ac feugiat sed lectus vestibulum mattis. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Faucibus vitae aliquet nec ullamcorper sit amet. Eu consequat ac felis donec et odio pellentesque diam. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. A erat nam at lectus urna duis convallis. Pellentesque elit eget gravida cum sociis. Cursus sit amet dictum sit amet justo donec enim. Vitae justo eget magna fermentum iaculis. Enim ut sem viverra aliquet. Convallis tellus id interdum velit. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Venenatis a condimentum vitae sapien. Lacus viverra vitae congue eu consequat ac felis. Diam donec adipiscing tristique risus nec feugiat.
                Sit amet mattis vulputate enim nulla aliquet. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Vulputate odio ut enim blandit volutpat. Elit pellentesque habitant morbi tristique senectus et netus. Aliquet lectus proin nibh nisl condimentum id. A iaculis at erat pellentesque adipiscing commodo elit at. Quis ipsum suspendisse ultrices gravida dictum fusce. Sit amet mauris commodo quis imperdiet massa tincidunt. Adipiscing elit ut aliquam purus. A diam maecenas sed enim ut sem viverra aliquet eget. Enim neque volutpat ac tincidunt vitae. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Amet nisl suscipit adipiscing bibendum. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Nulla facilisi cras fermentum odio eu feugiat.
              </div>
            </div>
          </div>
          <div class="ons-grid">
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Enim neque volutpat ac tincidunt. Tortor pretium viverra suspendisse potenti nullam ac tortor. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Odio morbi quis commodo odio. Lobortis feugiat vivamus at augue eget. Aliquam id diam maecenas ultricies mi eget. Dictum non consectetur a erat nam at lectus urna. Justo laoreet sit amet cursus sit amet. Tristique senectus et netus et malesuada fames. Etiam dignissim diam quis enim. Urna id volutpat lacus laoreet non curabitur. Proin sagittis nisl rhoncus mattis. Vel pretium lectus quam id leo in vitae turpis.
                Orci nulla pellentesque dignissim enim sit amet venenatis urna. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Quis commodo odio aenean sed adipiscing. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Pellentesque sit amet porttitor eget dolor. Habitant morbi tristique senectus et netus et malesuada. Curabitur vitae nunc sed velit. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Id leo in vitae turpis massa. Vitae ultricies leo integer malesuada.
                Elit at imperdiet dui accumsan sit amet nulla. Pretium quam vulputate dignissim suspendisse in est ante. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Mattis aliquam faucibus purus in massa tempor nec. Orci a scelerisque purus semper. Vel fringilla est ullamcorper eget nulla facilisi. Ac ut consequat semper viverra nam libero justo laoreet sit. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Lobortis scelerisque fermentum dui faucibus in ornare quam. Diam vel quam elementum pulvinar etiam. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean.
                Pulvinar sapien et ligula ullamcorper malesuada. Risus pretium quam vulputate dignissim suspendisse in est. Facilisi etiam dignissim diam quis enim. Sodales ut eu sem integer vitae. Eget nunc scelerisque viverra mauris. Malesuada bibendum arcu vitae elementum curabitur. Elementum nisi quis eleifend quam adipiscing vitae proin. Ultrices vitae auctor eu augue. Hac habitasse platea dictumst vestibulum rhoncus est. Urna neque viverra justo nec ultrices dui sapien eget mi. Quisque egestas diam in arcu cursus euismod quis viverra. Nullam ac tortor vitae purus faucibus. Fames ac turpis egestas maecenas. Magna fermentum iaculis eu non diam phasellus vestibulum. Nisl nunc mi ipsum faucibus vitae aliquet nec. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Faucibus turpis in eu mi bibendum neque egestas.
                Lectus nulla at volutpat diam ut venenatis tellus. Tellus rutrum tellus pellentesque eu tincidunt tortor. Purus sit amet volutpat consequat mauris nunc congue. Dignissim cras tincidunt lobortis feugiat vivamus at. Ac felis donec et odio pellentesque diam volutpat commodo. Arcu dui vivamus arcu felis. Pulvinar proin gravida hendrerit lectus a. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Maecenas sed enim ut sem viverra aliquet eget. Lacus laoreet non curabitur gravida arcu ac tortor. Laoreet sit amet cursus sit amet dictum. Maecenas accumsan lacus vel facilisis volutpat est velit.
              </div>
            </div>
            <div class="ons-grid__col ons-col-6@m">
              <div class="ons-pl-grid-col">
                Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Sem integer vitae justo eget magna fermentum iaculis. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Imperdiet proin fermentum leo vel orci porta non. Sed enim ut sem viverra aliquet eget sit amet. Rhoncus mattis rhoncus urna neque viverra justo. At tellus at urna condimentum mattis pellentesque. Vel orci porta non pulvinar neque laoreet suspendisse. Consectetur purus ut faucibus pulvinar elementum integer enim. Urna condimentum mattis pellentesque id nibh. Sem integer vitae justo eget magna fermentum. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Adipiscing bibendum est ultricies integer quis auctor elit. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Sapien faucibus et molestie ac feugiat. Tempor id eu nisl nunc mi ipsum. Arcu non sodales neque sodales ut etiam sit amet nisl. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Pellentesque adipiscing commodo elit at imperdiet. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Semper risus in hendrerit gravida rutrum quisque. Tempor nec feugiat nisl pretium fusce id. Ipsum consequat nisl vel pretium. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Etiam tempor orci eu lobortis elementum nibh. Eget nullam non nisi est sit amet facilisis magna. Diam vel quam elementum pulvinar. Dolor morbi non arcu risus quis. Nullam ac tortor vitae purus.
                Morbi leo urna molestie at elementum eu facilisis sed odio. Purus in mollis nunc sed id. Sit amet est placerat in egestas erat imperdiet sed. Diam sollicitudin tempor id eu nisl nunc mi. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ac feugiat sed lectus vestibulum mattis. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Faucibus vitae aliquet nec ullamcorper sit amet. Eu consequat ac felis donec et odio pellentesque diam. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. A erat nam at lectus urna duis convallis. Pellentesque elit eget gravida cum sociis. Cursus sit amet dictum sit amet justo donec enim. Vitae justo eget magna fermentum iaculis. Enim ut sem viverra aliquet. Convallis tellus id interdum velit. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Venenatis a condimentum vitae sapien. Lacus viverra vitae congue eu consequat ac felis. Diam donec adipiscing tristique risus nec feugiat.
                Sit amet mattis vulputate enim nulla aliquet. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Vulputate odio ut enim blandit volutpat. Elit pellentesque habitant morbi tristique senectus et netus. Aliquet lectus proin nibh nisl condimentum id. A iaculis at erat pellentesque adipiscing commodo elit at. Quis ipsum suspendisse ultrices gravida dictum fusce. Sit amet mauris commodo quis imperdiet massa tincidunt. Adipiscing elit ut aliquam purus. A diam maecenas sed enim ut sem viverra aliquet eget. Enim neque volutpat ac tincidunt vitae. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Amet nisl suscipit adipiscing bibendum. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Nulla facilisi cras fermentum odio eu feugiat.
              </div>
            </div>
          </div>
          ${renderComponent('back-to-top', {})}
        </div>
      `,
    );
  });

  it('is enabled on page when the page is rendered', async () => {
    const backToTop = await page.$('.ons-back-to-top');
    expect(backToTop).not.toBeNull();
  });

  it('is sticky when scrolled past 2 times the window height', async () => {
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2 + 10);
    });
    const backToTopSticky = await page.$eval('.ons-back-to-top', (node) => node.classList.contains('ons-back-to-top__sticky'));
    expect(backToTopSticky).toBe(true);
  });

  it('is enabled when the page is scrolled to the bottom', async () => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    const backToTopEnabled = await page.$eval('.ons-back-to-top', (node) => node.classList.contains('ons-back-to-top__enabled'));
    expect(backToTopEnabled).toBe(true);
  });

  it('changes width when the window is resized', async () => {
    await page.setViewport({ width: 1000, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2);
    });
    await new Promise((r) => setTimeout(r, 250));
    const previousWidth = await page.evaluate(() => {
      const node = document.querySelector('.ons-back-to-top > .ons-back-to-top__link');
      return window.getComputedStyle(node).width;
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await new Promise((r) => setTimeout(r, 250));
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2);
    });
    const newWidth = await page.evaluate(() => {
      const node = document.querySelector('.ons-back-to-top > .ons-back-to-top__link');
      return window.getComputedStyle(node).width;
    });
    expect(previousWidth).not.toEqual(newWidth);
  });

  it('changes left margin when the window is resized', async () => {
    await page.setViewport({ width: 1300, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2);
    });
    await new Promise((r) => setTimeout(r, 250));
    const previousWidth = await page.evaluate(() => {
      const node = document.querySelector('.ons-back-to-top > .ons-back-to-top__link');
      return window.getComputedStyle(node).left;
    });
    await page.setViewport({ width: 2000, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 2);
    });
    await new Promise((r) => setTimeout(r, 250));
    const newWidth = await page.evaluate(() => {
      const node = document.querySelector('.ons-back-to-top > .ons-back-to-top__link');
      return window.getComputedStyle(node).left;
    });
    expect(previousWidth).not.toEqual(newWidth);
  });
});
