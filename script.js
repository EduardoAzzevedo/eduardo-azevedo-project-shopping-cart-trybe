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

function cartItemClickListener(event) {
  event.target.remove(); 
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
  });

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(btn);

  return section;
}

async function getAndDisplayItems() {
  const fetchedItems = await fetchProducts();
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
  console.log(getLi);
  getLi.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

window.onload = async () => {
  await getAndDisplayItems();
  localStorageLis();
 };
