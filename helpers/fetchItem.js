const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const fetched = await fetch(url)
  .then((response) => response.json())
  .then((data) => data);
  return fetched;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
