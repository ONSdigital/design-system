import { Loader } from 'nunjucks';

export default class FakeNunjucksLoader extends Loader {
  getSource(name) {
    if (this.fakeTemplateMap && this.fakeTemplateMap[name]) {
      const source = {
        src: this.fakeTemplateMap[name],
        path: name,
        noCache: true,
      };

      this.emit('load', name, source);
      return source;
    }

    return null;
  }
}
