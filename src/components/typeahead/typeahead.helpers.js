export function sanitiseTypeaheadText(string, sanitisedQueryReplaceChars = [], trimEnd = true) {
  let sanitisedString = string.toLowerCase().replace(/\s\s+/g, ' ');

  sanitisedString = trimEnd ? sanitisedString.trim() : sanitisedString.trimStart();

  sanitisedQueryReplaceChars.forEach(char => {
    sanitisedString = sanitisedString.replace(new RegExp(char, 'g'), '');
  });

  return sanitisedString;
}
