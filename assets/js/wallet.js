// ===== wallet.js — محفظة البائع =====

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

function renderBalance() {
  document.getElementById('walletBalance').textContent = `${(currentUser.wallet || 0).toFixed(2)} $`;
}

function renderHistory() {
  const container = document.getElementById('walletHistory');
  const history = currentUser.walletHistory || [];

  if (history.length === 0) {
    container.innerHTML = `<p class="empty-msg">لا توجد عمليات بعد.</p>`;
    return;
  }

  container.innerHTML = history.slice().reverse().map(entry => `
    <div class="history-item">
      <span>${entry.type === 'sale' ? '💰 بيع منتج' : '💸 سحب أرباح'}</span>
      <span class="${entry.type === 'sale' ? 'amount-positive' : 'amount-negative'}">
        ${entry.type === 'sale' ? '+' : '-'}${entry.amount.toFixed(2)} $
      </span>
      <span class="history-date">${entry.date}</span>
    </div>
  `).join('');
}

function addToWallet(amount) {
  currentUser.wallet = (currentUser.wallet || 0) + amount;
  currentUser.walletHistory = currentUser.walletHistory || [];
  currentUser.walletHistory.push({
    type: 'sale',
    amount: amount,
    date: new Date().toLocaleDateString('ar-EG')
  });
  saveUser();
}

document.getElementById('withdrawBtn')?.addEventListener('click', () => {
  if (!currentUser.wallet || currentUser.wallet <= 0) {
    alert("لا يوجد رصيد كافٍ للسحب.");
    return;
  }

  const amount = currentUser.wallet;
  currentUser.wallet = 0;
  currentUser.walletHistory.push({
    type: 'withdraw',
    amount: amount,
    date: new Date().toLocaleDateString('ar-EG')
  });
  saveUser();
  renderBalance();
  renderHistory();
  alert("✅ تم إرسال طلب السحب. سيتم مراجعته والتحويل خلال 3-5 أيام عمل.");
});

renderBalance();
renderHistory();
