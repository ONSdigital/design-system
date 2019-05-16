export const dom = {
  getElements(className, { context = null } = {}) {
    return [...(context || document).querySelectorAll(`.${className}`)];
  },

  getFirstElement(className, { context = null } = {}) {
    return (context || document).querySelector(`.${className}`);
  }
};
