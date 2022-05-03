const getSavedCartItems = (item = 'str') => {
  const cartItems = item;
  cartItems.innerHTML = localStorage.getItem('cartItems');
  // console.log(itemsSalvos);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
