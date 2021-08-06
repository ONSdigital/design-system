import { promises as fs } from 'fs';

const srcPath = './search-index.json';

export async function createIndex(page) {
  if (page && page.title !== 'Home') {
    const pageData = JSON.stringify({ en: page.title, url: page.url });
    try {
      await fs.writeFile(srcPath, `${pageData}, `, { flag: 'a+' }, () => {});
    } catch (err) {
      console.error(err);
    }
  }
}
