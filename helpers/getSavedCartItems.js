const getSavedCartItems = () => localStorage.getItem('itemList');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
