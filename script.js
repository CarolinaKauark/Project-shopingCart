// const { fetchProducts } = require('./helpers/fetchProducts');
// const { fetchItem } = require("./helpers/fetchItem");
// const saveCartItems = require("./helpers/saveCartItems");
// const saveCartItems = require("./helpers/saveCartItems");

// const liCarrinho = document.querySelectorAll('.cart__item');
const nomeClasseCart = '.cart__item';
const cartItems = document.querySelector('.cart__items');

// requisito 7
function carregando() {
  console.log('carregou');
  const liCarregando = document.createElement('li');
  liCarregando.className = 'loading';
  liCarregando.innerText = 'carregando...';
  document.getElementsByClassName('items')[0].appendChild(liCarregando);
}

function removeCarregando() {
  document.getElementsByClassName('loading')[0].remove();
  console.log('removeu');
}

// requisito 5
function pegaPrice(textoLi) {
  const arrayTextoLi = textoLi.split('');
  const priceDaLi = [];
  for (let index = arrayTextoLi.length; index > 0; index -= 1) {
    if (arrayTextoLi[index] === '$') {
      break;
    } else {
      priceDaLi.unshift(arrayTextoLi[index]);
    }
  }
  price = parseFloat(priceDaLi.join('')); 
  return price;
}

function calculaTotal() {
  const liCarrinho = document.querySelectorAll(nomeClasseCart);
  const arrayInnerText = [];
  liCarrinho.forEach((li) => arrayInnerText.push(li.innerText));
  const precos = arrayInnerText.map((text) => pegaPrice(text));
  const total = precos.reduce((final, valor) => final + valor, 0);
  const preco = document.querySelector('.total-price');
  preco.innerText = `Subtotal: R$ ${total}`;  
}

// Função do projeto
function createProductImageElement(imageSource, classImg) {
  const img = document.createElement('img');
  img.className = classImg;
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image, 'item__image'));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.parentNode.remove();
  saveCartItems(cartItems.innerHTML);
  calculaTotal();
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  const div = document.createElement('div');
  div.className = 'cart-div';
  
  div.appendChild(createCustomElement('span', 'cart_title', name));
  div.appendChild(createCustomElement('span', 'cart_id', `ID: ${sku}`));
  div.appendChild(createCustomElement('span', 'cart_price', `R$ ${salePrice}`));
  li.appendChild(createProductImageElement(image, 'cart_img'));
  li.appendChild(div)
  const X = createCustomElement('button', 'x', 'x');
  li.appendChild(X);
  // li.innerText = `ID: ${sku} 
  // NAME: ${name} 
  // PRICE: $${salePrice}`;
  X.addEventListener('click', cartItemClickListener);
  return li;
}

// Exercício 2 - funcao que add o produto ao carrinho
const adicionandoAoCarrinho = async (id) => {
  const objProduto = await fetchItem(id);
  const { id: sku, title: name, price: salePrice, thumbnail: image } = objProduto;
  // const cartItems = document.querySelector('.cart__items');
  const cartProduct = createCartItemElement({ sku, name, salePrice, image });
  cartItems.appendChild(cartProduct);
  saveCartItems(cartItems.innerHTML);
  calculaTotal();
};

// Exercício 2 - função do evento
const pegaId = (event) => {
  const elementoPai = event.target.parentNode;
  const id = elementoPai.firstChild.innerText;
  // console.log(id);
  adicionandoAoCarrinho(id);
};

// Exercício 1
const chamaOsItems = async (opcao) => {
  const items = await fetchProducts(opcao);
  removeCarregando();
    items.forEach((item) => {
      const { id: sku, title: name, thumbnail: image, price: salePrice } = item;
      const secaoItem = document.querySelector('.items');
      secaoItem.appendChild(createProductItemElement({ sku, name, image, salePrice }));

      const botoesAdd = document.querySelectorAll('.item__add');
      botoesAdd.forEach((botao) => botao.addEventListener('click', pegaId));
    });
};

// requisito 6
function esvaziaCarrinho() {
  const liCarrinho = document.querySelectorAll(nomeClasseCart);
  for (let index = liCarrinho.length; index > 0; index -= 1) {
    document.querySelector('.cart__item').remove();
  }
  saveCartItems(cartItems.innerHTML);
  calculaTotal();
}

function novaOpcao() {

  if (document.querySelector('.welcome')){
    document.querySelector('.welcome').remove();
  } else {
    const arrayItems = document.getElementsByClassName('item');
    for (let i = arrayItems.length - 1; i >= 0; i -=1) {
      document.getElementsByClassName('item')[i].remove();
    }
  }
    carregando();
}

function welcome() {
  removeCarregando();
  
  const secaoItem = document.querySelector('.items');
  secaoItem.appendChild(createProductImageElement('trybe-shopping.png', 'welcome'));

  document.querySelector('.computador').addEventListener('click', () => {
    novaOpcao();
    chamaOsItems('computador');
  });

  document.querySelector('.livro').addEventListener('click', () => {
    novaOpcao();
    chamaOsItems('livro');
  });

  document.querySelector('.papelaria').addEventListener('click', () => {
    novaOpcao();
    chamaOsItems('papelaria')
  });

  document.querySelector('#search').addEventListener('change', (e) => {
    novaOpcao();
    chamaOsItems(e.target.value);
  });
}

window.onload = () => { 
  carregando();
  welcome();
  //chamaOsItems('toy');

  getSavedCartItems(cartItems);
  const arrayLi = document.querySelectorAll(nomeClasseCart);
  // console.log(arrayLi);
  arrayLi.forEach((li) => li.addEventListener('click', cartItemClickListener));
  calculaTotal();
  const btnEsvaziarCarrinho = document.querySelector('.empty-cart');
  btnEsvaziarCarrinho.addEventListener('click', esvaziaCarrinho);
};

// localStorage.clear();