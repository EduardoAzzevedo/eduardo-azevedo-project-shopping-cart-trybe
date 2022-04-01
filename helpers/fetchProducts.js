const fetchProducts = async (product) => {
  if (!product) {
    return new Error('You must provide an url');
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const fetched = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.results);
  return fetched;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
