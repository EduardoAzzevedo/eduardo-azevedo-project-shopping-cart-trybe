const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const fetched = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => console.log(error));
  return fetched;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
