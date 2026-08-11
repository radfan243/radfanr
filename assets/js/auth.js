// ===== auth.js — تسجيل الدخول وإنشاء حساب جديد =====

const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

tabLogin?.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

tabSignup?.addEventListener('click', () => {
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const errorEl = document.getElementById('signupError');

  const users = getUsers();
  const exists = users.find(u => u.email === email);

  if (exists) {
    errorEl.textContent = "⚠️ هذا البريد مسجّل مسبقاً";
    return;
  }

  users.push({ name, email, password, store: null, wallet: 0 });
  saveUsers(users);

  localStorage.setItem('currentUser', email);
  window.location.href = "dashboard.html";
});

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorEl.textContent = "⚠️ البريد أو كلمة المرور غير صحيحة";
    return;
  }

  localStorage.setItem('currentUser', email);
  window.location.href = "dashboard.html";
});
