export function sanitiseTypeaheadText(string, sanitisedQueryRemoveChars = [], trimEnd = true) {
  let sanitisedString = string.toLowerCase();

  sanitisedQueryRemoveChars.forEach(char => {
    sanitisedString = sanitisedString.replace(new RegExp(char.toLowerCase(), 'g'), '');
  });

  sanitisedString = sanitisedString.replace(/\s\s+/g, ' ');

  sanitisedString = trimEnd ? sanitisedString.trim() : sanitisedString.trimStart();

  return sanitisedString;
}
