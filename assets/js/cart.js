// ===== cart.js — سلة الشراء والدفع =====

const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById('cartItemsList');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-msg">سلتك فاضية.</p>`;
    document.getElementById('cartTotal').textContent = "0";
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image || 'assets/images/logo.png'}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>${item.price} $</p>
      <button class="removeBtn" data-index="${index}">🗑️ إزالة</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  document.getElementById('cartTotal').textContent = total.toFixed(2);

  document.querySelectorAll('.removeBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const updatedCart = getCart();
      updatedCart.splice(idx, 1);
      saveCart(updatedCart);
      renderCart();
    });
  });
}

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  const cart = getCart();
  const msgEl = document.getElementById('checkoutMsg');

  if (cart.length === 0) {
    msgEl.textContent = "⚠️ سلتك فاضية، أضف منتج أولاً.";
    return;
  }

  const payMethod = document.querySelector('input[name="payMethod"]:checked').value;

  alert(`سيتم توجيهك لإتمام الدفع عبر: ${payMethod}`);
});

renderCart();
