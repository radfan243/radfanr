// ===== products.js — عرض المنتجات في الصفحة العامة/المتجر =====

function getAllProducts() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}

function getUserByEmail(email) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.email === email);
}

function buildProductCard(product) {
  const owner = getUserByEmail(product.ownerEmail);
  const storeName = owner?.storeName || owner?.name || "متجر";

  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image || 'assets/images/logo.png'}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p class="product-subtitle">${product.subtitle || ''}</p>
      <p class="product-store">🏬 ${storeName}</p>
      <p class="product-price">${product.price} $</p>
      <a href="product.html?id=${product.id}" class="btn-primary">عرض المنتج</a>
    </div>
  `;
}

function renderAllProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const products = getAllProducts();

  if (products.length === 0) {
    container.innerHTML = `<p class="empty-msg">لا توجد منتجات بعد.</p>`;
    return;
  }

  container.innerHTML = products.map(buildProductCard).join('');
}

function renderStoreProducts(containerId, ownerEmail) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const products = getAllProducts().filter(p => p.ownerEmail === ownerEmail);

  if (products.length === 0) {
    container.innerHTML = `<p class="empty-msg">هذا المتجر لا يحتوي منتجات بعد.</p>`;
    return;
  }

  container.innerHTML = products.map(buildProductCard).join('');
}
