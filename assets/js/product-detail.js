// ===== product-detail.js — عرض تفاصيل منتج واحد =====

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function renderProductDetail() {
  const container = document.getElementById('productDetail');
  const products = getAllProducts();
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = `<p class="empty-msg">⚠️ المنتج غير موجود.</p>`;
    return;
  }

  const owner = getUserByEmail(product.ownerEmail);
  const storeName = owner?.storeName || owner?.name || "متجر";

  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image || 'assets/images/logo.png'}" alt="${product.title}" class="product-detail-img">
      <div class="product-detail-info">
        <h1>${product.title}</h1>
        <p class="product-subtitle">${product.subtitle || ''}</p>
        <p class="product-store">🏬 <a href="store.html?seller=${product.ownerEmail}">${storeName}</a></p>
        <p class="product-detail-price">${product.price} $</p>
        <p class="product-type">${product.type === 'digital' ? '📦 منتج رقمي (تحميل فوري بعد الدفع)' : '🚚 منتج ملموس (يشحن لعنوانك)'}</p>
        <button id="addToCartBtn" class="btn-primary">🛒 إضافة للسلة والشراء</button>
      </div>
    </div>
  `;

  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = "cart.html";
  });
}

renderProductDetail();
