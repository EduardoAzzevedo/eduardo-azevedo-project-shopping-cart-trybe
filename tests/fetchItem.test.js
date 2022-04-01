require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fecthItem é uma função', () => {
    expect(typeof fetchItem()).toBe('function');
  });
  it('Testa se a função fetch foi chamado ao chamar a função fetchItem com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se acessa corretamente o endpoint', async () => {
    const rtn = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(rtn);
  });
  it('Testa se o retorno da função fetchItem é igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('Testa se fetchItem for chamada vazia retorna a mensagem de erro "You must provide an url"', async () => {
    const erro = new Error('You must provide an url');
    expect(await fetchItem()).toEqual(erro);
  })
});
