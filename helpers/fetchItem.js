const fetchItem = async (id) => {
  if (!id) {
    return new Error('You must provide an url');
  }
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
