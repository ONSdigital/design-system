import TypeaheadUI from './typeahead.ui';

export default class Typeahead {
  constructor(context) {
    this.context = context;
    this.typeahead = new TypeaheadUI({ context });
  }
}
