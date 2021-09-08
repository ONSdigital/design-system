(function() {
  function installLanguageSelect(element) {
    const languageSelect = element.getElementsByClassName('ons-js-language-filter__select')[0];
    const languageContentElements = element.getElementsByClassName('ons-js-language-filter__content');

    languageSelect.addEventListener('change', function(event) {
      for (let languageContentElement of languageContentElements) {
        if (languageContentElement.id === this.value) {
          languageContentElement.classList.remove('ons-u-hidden');
        } else {
          languageContentElement.classList.add('ons-u-hidden');
        }
      }
    });
  }

  let languageFilterElements = document.getElementsByClassName('ons-js-language-filter');
  Array.from(languageFilterElements).forEach(installLanguageSelect);
})();
