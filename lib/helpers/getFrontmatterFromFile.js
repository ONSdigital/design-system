import * as fs from 'fs';
import frontmatter from 'frontmatter';

export default function (filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const file = fs.readFileSync(filePath, 'utf8');
  return frontmatter(file).data || {};
}
