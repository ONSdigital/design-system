(function() {
  function installLanguageSelect(element) {
    const languageSelect = element.getElementsByClassName('js-language-filter__select')[0];
    const languageContentElements = element.getElementsByClassName('js-language-filter__content');

    languageSelect.addEventListener('change', function(event) {
      for (let languageContentElement of languageContentElements) {
        if (languageContentElement.id === this.value) {
          languageContentElement.classList.remove('u-hidden');
        } else {
          languageContentElement.classList.add('u-hidden');
        }
      }
    });
  }

  let languageFilterElements = document.getElementsByClassName('js-language-filter');
  Array.from(languageFilterElements).forEach(installLanguageSelect);
})();
