const cartItem = '.cart__item';

const totalPrice = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const totalPrices = () => {
  const everyLi = Array.from(document.querySelectorAll(cartItem)); // Transforma em array.
  const total = everyLi.reduce((acc, li) => {
    const priceOfItem = Number(li.innerText.split('PRICE: $')[1]); // Split para separar o PRICE: $
    return acc + priceOfItem; // o valor do produto fica no index[1]
  }, 0);
  if (!total) {
    totalPrice.innerText = 0;
  return;
}
  totalPrice.innerText = `${total}`;
};

function cartItemClickListener(event) {
  event.target.remove(); // remove o item clicado
  totalPrices(); // quando remover um item, mostra o valor atualizado
  saveCartItems();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', async () => { 
    const getFetch = await fetchItem(sku);
    const itemToCart = createCartItemElement(getFetch);
    const ol = document.querySelector('.cart__items');
    ol.appendChild(itemToCart);
    saveCartItems();
    totalPrices();
  });

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(btn);

  return section;
}

async function getAndDisplayItems() {
  const fetchedItems = await fetchProducts('computador');
  const section = document.querySelector('.items');
  const getItems = fetchedItems.forEach((item) => {
    const product = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    section.appendChild(createProductItemElement(product));
  });
  return getItems;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const localStorageLis = () => {
  const gettingLiFromStorage = getSavedCartItems();
  const ol = document.querySelector('ol');
  ol.innerHTML = gettingLiFromStorage;
  const getLi = document.querySelectorAll('li');
  getLi.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

const eraseCart = () => {
  const eraseCartBtn = document.querySelector('.empty-cart');
  eraseCartBtn.addEventListener('click', () => {
    document.querySelectorAll(cartItem).forEach((item) => item.remove());
    totalPrices();
    saveCartItems();
  });
};
eraseCart();

const loadMsg = () => {
  const loadText = document.createElement('p');
  loadText.innerText = 'carregando...';
  loadText.className = 'loading';
  const span = document.querySelector('.cart__title');
  span.appendChild(loadText);
};

const remLoading = () => {
  document.querySelector('.loading').remove();
};

window.onload = async () => {
  loadMsg();
  await getAndDisplayItems();
  remLoading();
  localStorageLis();
};
