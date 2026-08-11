// ===== payment.js — تنفيذ الدفع وتوزيع الأرباح =====

const PLATFORM_COMMISSION = 0.10; // 10%

function getPlatformWallet() {
  return JSON.parse(localStorage.getItem('platformWallet') || '{"balance":0,"history":[]}');
}
function savePlatformWallet(data) {
  localStorage.setItem('platformWallet', JSON.stringify(data));
}

function addPlatformCommission(amount) {
  const platform = getPlatformWallet();
  platform.balance += amount;
  platform.history.push({
    amount: amount,
    date: new Date().toLocaleDateString('ar-EG')
  });
  savePlatformWallet(platform);
}

function processPayment(product, payMethod) {
  const price = parseFloat(product.price);
  const commission = price * PLATFORM_COMMISSION;
  const sellerAmount = price - commission;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const sellerIndex = users.findIndex(u => u.email === product.ownerEmail);
  if (sellerIndex !== -1) {
    users[sellerIndex].wallet = (users[sellerIndex].wallet || 0) + sellerAmount;
    users[sellerIndex].walletHistory = users[sellerIndex].walletHistory || [];
    users[sellerIndex].walletHistory.push({
      type: 'sale',
      amount: sellerAmount,
      date: new Date().toLocaleDateString('ar-EG')
    });
    users[sellerIndex].salesCount = (users[sellerIndex].salesCount || 0) + 1;
    localStorage.setItem('users', JSON.stringify(users));
  }

  addPlatformCommission(commission);

  return { success: true, sellerAmount, commission, payMethod };
}

function checkoutCart(cart, payMethod) {
  const results = cart.map(product => processPayment(product, payMethod));
  localStorage.removeItem('cart');
  return results;
}
