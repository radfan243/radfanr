// ===== dashboard.js — لوحة تحكم البائع =====

const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

const users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = users.find(u => u.email === currentUserEmail);

function saveUser() {
  const idx = users.findIndex(u => u.email === currentUserEmail);
  users[idx] = currentUser;
  localStorage.setItem('users', JSON.stringify(users));
}

const userNameEl = document.getElementById('userName');
if (userNameEl && currentUser) {
  userNameEl.textContent = `مرحباً ${currentUser.name} 👋`;
}

function getMyProducts() {
  const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
  return allProducts.filter(p => p.ownerEmail === currentUserEmail);
}

function updateStats() {
  const myProducts = getMyProducts();
  document.getElementById('statProducts').textContent = myProducts.length;
  document.getElementById('statSales').textContent = currentUser.salesCount || 0;
  document.getElementById('statWallet').textContent = `${currentUser.wallet || 0} $`;
}

function renderMyProducts() {
  const container = document.getElementById('myProductsList');
  const myProducts = getMyProducts();

  if (myProducts.length === 0) {
    container.innerHTML = `<p class="empty-msg">لسه ما رفعت أي منتج. اضغط "رفع منتج جديد" وابدأ.</p>`;
    return;
  }

  container.innerHTML = myProducts.map(p => `
    <div class="product-card">
      <img src="${p.image || 'assets/images/logo.png'}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>${p.price} $</p>
      <a href="upload-product.html?edit=${p.id}" class="btn-secondary">✏️ تعديل</a>
    </div>
  `).join('');
}

document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
});

if (currentUser) {
  updateStats();
  renderMyProducts();
}
