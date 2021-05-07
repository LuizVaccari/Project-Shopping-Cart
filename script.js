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

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

  function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} 

// R3 e R4
const cartItems = '.cart__items'; // declaração no escopo global solicitada pelo Lint

const cartLocalStorage = () => {
  const cartList = document.querySelector(cartItems).innerHTML;
  localStorage.setItem('cart', cartList);
};

  function cartItemClickListener(event) {
  event.target.remove();
  cartLocalStorage();
 }

 const loadingLocalStorage = () => {
  const savedCartItems = localStorage.getItem('cart');
  const cartList = document.querySelector(cartItems);
  cartList.innerHTML = savedCartItems;
  cartList.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart__item')) {
      cartItemClickListener(event);
    }
  });
};
 
  function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

// R1

const showProducts = (data) => {
  data.results.forEach((product) => {
    const getSection = document.querySelector('.items');
    getSection.appendChild(createProductItemElement(product));
  });
};

const getData = () => {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => {
    response.json()
    .then((data) => {
      showProducts(data);
    });
  });
};

// R2

const showCart = (productById) => {
  const cartList = document.querySelector(cartItems);
  cartList.appendChild(createCartItemElement(productById));
  cartLocalStorage();
  };

const getProductById = () => {
  const itemsClass = document.querySelector('.items');
  itemsClass.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      const { parentElement } = event.target; // destructuring solicitado pelo lint
      const id = getSkuFromProductItem(parentElement);
      fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => {
        response.json()
        .then((productById) => {
          showCart(productById);
        });
      });
    }
  });
};

window.onload = function onload() { 
  loadingLocalStorage();
  getData();
  getProductById();
};

// Requisitos 1 e 2 realizados com a ajuda dos vídeos:
// https://app.betrybe.com/course/live-lectures/sd-cohort-10-a#content-review-bloco-9-dia-93
// https://trybecourse.slack.com/files/U01AYN59Y2J/F01HW4TF02U/1-4.mp4
