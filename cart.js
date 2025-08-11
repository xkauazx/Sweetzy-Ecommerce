// cart.js
document.addEventListener('DOMContentLoaded', function () {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const cartList = document.querySelector('.cart-list');
  // Se a página não tem área do carrinho, sai — evita erros quando o script for carregado em outra página
  if (!cartList) return;

  const subtotalElement = document.querySelector('.div-subtotal .subtotal');
  const discountElement = document.querySelector('.div-discount .subtotal');
  const totalElement = document.querySelector('.div-total .subtotal');

  function renderCartItems() {
    cartList.innerHTML = '';
    let subtotal = 0;

    cartItems.forEach(item => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      subtotal += itemTotal;

      const li = document.createElement('li');
      li.className = 'cart-item';

      li.dataset.id = String(item.id);

      li.innerHTML = `
        <div class="col-product">
            <span class="delete-icon">🗑️</span>
            <img src="${item.image || ''}" alt="${item.name || ''}" class="product-image">
            <span>${item.name || ''}</span>
        </div>
        <div class="col-price">$${(item.price || 0).toFixed(2)}</div>
        <div class="col-qty">
            <div class="qty-controls">
                <button class="qty-less" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-more" data-id="${item.id}">+</button>
            </div>
        </div>
        <div class="col-total">$${itemTotal.toFixed(2)}</div>
      `;

      cartList.appendChild(li);
    });

    const discount = subtotal * 0.2;
    const total = subtotal - discount;

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;

    // atualiza contador no cabeçalho
    const headerCounter = document.querySelector('#cart strong');
    if (headerCounter) {
      const count = cartItems.reduce((acc, it) => acc + (it.quantity || 0), 0);
      headerCounter.textContent = count;
    }
  }

  cartList.addEventListener('click', function (e) {
    // aumentar
    if (e.target.classList.contains('qty-more')) {
      const id = e.target.getAttribute('data-id');
      const item = cartItems.find(it => String(it.id) === String(id));
      if (item) {
        item.quantity++;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
      }
      return;
    }

    // diminuir
    if (e.target.classList.contains('qty-less')) {
      const id = e.target.getAttribute('data-id');
      const item = cartItems.find(it => String(it.id) === String(id));
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          const idx = cartItems.findIndex(it => String(it.id) === String(id));
          if (idx !== -1) cartItems.splice(idx, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
      }
      return;
    }

    // deletar
    if (e.target.classList.contains('delete-icon')) {
      const li = e.target.closest('.cart-item');
      const id = li ? li.dataset.id : null;
      if (id) {
        const idx = cartItems.findIndex(it => String(it.id) === String(id));
        if (idx !== -1) {
          cartItems.splice(idx, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          renderCartItems();
        }
      }
    }
  });

  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) continueBtn.addEventListener('click', () => window.location.href = 'index.html');

  renderCartItems();
});
