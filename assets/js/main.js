 // ===== main.js — وظائف عامة للموقع =====

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

function loadLanguage(lang) {
  localStorage.setItem('lang', lang);
  fetch(`assets/lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) el.textContent = data[key];
      });
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    })
    .catch(() => console.log('ملف اللغة غير موجود بعد'));
}

const savedLang = localStorage.getItem('lang') || 'ar';
loadLanguage(savedLang);

const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active-link');
  }
});
