require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se a função fetch foi chamado ao chamar a função fetchProducts com o argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se acessa corretamente o endpoint', async () => {
    const rtn = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(rtn);
  });
  it('Testa se o retorno da função é igual a computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('Testa se fetchProducts for chamada vazia retorna a mensagem de erro "You must provide an url"', async () => {
    const erro = new Error('You must provide an url');
    expect(await fetchProducts()).toEqual(erro);
  })
});
