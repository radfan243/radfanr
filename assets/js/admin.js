// ===== admin.js — لوحة تحكم مالك المنصة =====

// ===== التحقق من تسجيل الدخول (لاحقًا نربطه بحساب مالك مخصص) =====
const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

// ===== جلب البيانات =====
function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function getAllProductsData() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}
function getPlatformWalletData() {
  return JSON.parse(localStorage.getItem('platformWallet') || '{"balance":0,"history":[]}');
}

// ===== عرض الإحصائيات العامة =====
function renderAdminStats() {
  const users = getAllUsers();
  const products = getAllProductsData();
  const platform = getPlatformWalletData();

  document.getElementById('statTotalUsers').textContent = users.length;
  document.getElementById('statTotalProducts').textContent = products.length;
  document.getElementById('statPlatformWallet').textContent = `${platform.balance.toFixed(2)} $`;
}

// ===== عرض كل المستخدمين والمتاجر =====
function renderAllUsers() {
  const container = document.getElementById('allUsersList');
  const users = getAllUsers();

  if (users.length === 0) {
    container.innerHTML = `<p class="empty-msg">لا يوجد مستخدمين بعد.</p>`;
    return;
  }

  container.innerHTML = users.map(u => `
    <div class="product-card">
      <h4>${u.name}</h4>
      <p>${u.email}</p>
      <p>💰 رصيده: ${(u.wallet || 0).toFixed(2)} $</p>
      <p>📦 مبيعاته: ${u.salesCount || 0}</p>
    </div>
  `).join('');
}

// ===== عرض سجل عمولات المنصة =====
function renderPlatformHistory() {
  const container = document.getElementById('platformHistory');
  const platform = getPlatformWalletData();

  if (platform.history.length === 0) {
    container.innerHTML = `<p class="empty-msg">لا توجد عمولات مسجلة بعد.</p>`;
    return;
  }

  container.innerHTML = platform.history.slice().reverse().map(entry => `
    <div class="history-item">
      <span>💰 عمولة بيع</span>
      <span class="amount-positive">+${entry.amount.toFixed(2)} $</span>
      <span class="history-date">${entry.date}</span>
    </div>
  `).join('');
}

// ===== زر تسجيل الخروج =====
document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
});

renderAdminStats();
renderAllUsers();
renderPlatformHistory();
