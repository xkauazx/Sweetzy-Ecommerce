// script.js
// Este script deve ser incluído na página de produtos (index.html)
const products = document.querySelectorAll(".product");
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function saveCart(){
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCounter();
}

function updateCartCounter(){
  const counterElement = document.querySelector('#cart strong');
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  if (counterElement) counterElement.textContent = totalItems;
}

function addItemToCart(item){
  const existing = cartItems.find(p => String(p.id) === String(item.id));
  if (existing) {
    existing.quantity = (existing.quantity || 0) + item.quantity;
  } else {
    cartItems.push(item);
  }
  saveCart();
}

function updateCartItem(itemId, newQuantity){
  const idx = cartItems.findIndex(it => String(it.id) === String(itemId));
  if (idx !== -1){
    if (newQuantity <= 0) {
      cartItems.splice(idx, 1);
    } else {
      cartItems[idx].quantity = newQuantity;
    }
    saveCart();
  }
}

// Se não houver produtos na página, não faz nada
if (products && products.length) {
  products.forEach((product) => {
    const button = product.querySelector(".btn-cart");
    const container = product.querySelector(".container");
    const quantityEl = product.querySelector(".quantity");
    let btnMore = product.querySelector(".btn-more");
    let btnLess = product.querySelector(".btn-less");
    const subtotalEl = product.querySelector('.subtotal');
    const id = product.dataset.id;
    const name = product.dataset.name; // usar data-name
    const price = parseFloat(product.dataset.price || 0);

    // Caso as classes estejam invertidas no HTML (btn-more mostrando '-' etc), corrige automaticamente
    if (btnMore && btnLess && btnMore.textContent.trim() === '-') {
      [btnMore, btnLess] = [btnLess, btnMore];
    }

    let qty = 1;
    if (quantityEl) quantityEl.textContent = qty;
    if (subtotalEl) subtotalEl.textContent = `$${(qty * price).toFixed(2)}`;

    if (button) {
      button.addEventListener('click', () => {
        if (container) container.classList.toggle('toggle');
        button.style.display = 'none';
        if (quantityEl) quantityEl.textContent = qty;

        addItemToCart({
          id: String(id),
          name: name,
          price: price,
          quantity: qty,
          image: product.querySelector('img') ? product.querySelector('img').src : ''
        });
      });
    }

    if (btnMore) {
      btnMore.addEventListener('click', () => {
        qty++;
        if (quantityEl) quantityEl.textContent = qty;
        if (subtotalEl) subtotalEl.textContent = `$${(qty * price).toFixed(2)}`;
        updateCartItem(id, qty);
      });
    }

    if (btnLess) {
      btnLess.addEventListener('click', () => {
        if (qty > 1) {
          qty--;
          if (quantityEl) quantityEl.textContent = qty;
          if (subtotalEl) subtotalEl.textContent = `$${(qty * price).toFixed(2)}`;
          updateCartItem(id, qty);
        }
      });
    }
  });
}

// Atualiza contador ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartCounter);
