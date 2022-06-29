export function sanitiseAutosuggestText(string, sanitisedQueryRemoveChars = [], sanitisedQuerySplitNumsChars = false, trimEnd = true) {
  let sanitisedString = string.toLowerCase();

  sanitisedQueryRemoveChars.forEach(char => {
    sanitisedString = sanitisedString.replace(new RegExp(char.toLowerCase(), 'g'), '');
  });

  sanitisedString = trimEnd ? sanitisedString.trim() : sanitisedString.trimStart();
  sanitisedString = sanitisedString.replace(/\s\s+/g, ' ');
  sanitisedString = sanitisedString.replace(/[&]/g, '%26');

  if (sanitisedQuerySplitNumsChars) {
    sanitisedString = sanitisedString.replace(/\d(?=[a-z]{3,})/gi, '$& ');
  }

  return sanitisedString;
}
