const getSavedCartItems = () => {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = localStorage.getItem('itemList');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
