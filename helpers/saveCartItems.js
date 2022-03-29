const saveCartItems = () => {
  const ol = document.querySelector('.cart__items');
  const saveCart = localStorage.setItem('itemList', ol.innerHTML);
  return saveCart;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
