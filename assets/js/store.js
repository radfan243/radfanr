// ===== store.js — عرض صفحة متجر بائع معيّن =====

const urlParams = new URLSearchParams(window.location.search);
const sellerEmail = urlParams.get('seller');

function renderStoreHeader() {
  const container = document.getElementById('storeHeader');
  const owner = getUserByEmail(sellerEmail);

  if (!owner) {
    container.innerHTML = `<p class="empty-msg">⚠️ هذا المتجر غير موجود.</p>`;
    return;
  }

  const storeName = owner.storeName || owner.name;

  container.innerHTML = `
    <div class="store-info">
      <img src="${owner.storeLogo || 'assets/images/logo.png'}" alt="${storeName}" class="store-logo">
      <h1>${storeName}</h1>
      <p>${owner.storeDescription || 'متجر على منصة RADFANR'}</p>
    </div>
  `;
}

if (sellerEmail) {
  renderStoreHeader();
  renderStoreProducts('storeProductsList', sellerEmail);
} else {
  document.getElementById('storeHeader').innerHTML = `<p class="empty-msg">⚠️ لم يتم تحديد المتجر.</p>`;
}
