import * as fs from 'fs';
import * as path from 'path';
import nunjucks from 'nunjucks';

export const NunjucksLoader = nunjucks.Loader.extend({
  //Based off of the Nunjucks 'FileSystemLoader'
  init: function(searchPaths, sourceFoundCallback) {
    this.sourceFoundCallback = sourceFoundCallback;
    if (searchPaths) {
      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      this.searchPaths = searchPaths.map(path.normalize);
    } else {
      this.searchPaths = ['.'];
    }
  },

  getSource: function(name) {
    let fullpath = null;
    let paths = this.searchPaths;

    for (let i = 0; i < paths.length; i++) {
      let basePath = path.resolve(paths[i]);
      let p = path.resolve(paths[i], name);

      // Only allow the current directory and anything
      // underneath it to be searched
      if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
        fullpath = p;
        break;
      }
    }

    if (!fullpath) {
      return null;
    }

    if (this.sourceFoundCallback) {
      this.sourceFoundCallback(fullpath);
    }

    return {
      src: fs.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: this.noCache
    };
  }
});
