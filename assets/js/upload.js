// ===== upload.js — رفع منتج جديد / تعديل منتج =====

const currentUserEmail = localStorage.getItem('currentUser');
if (!currentUserEmail) {
  window.location.href = "login.html";
}

const productType = document.getElementById('productType');
const digitalFields = document.getElementById('digitalFields');

productType?.addEventListener('change', () => {
  digitalFields.style.display = productType.value === 'digital' ? 'block' : 'none';
});

const uploadImageBox = document.getElementById('uploadImageBox');
const productImage = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');
const uploadImageText = document.getElementById('uploadImageText');

uploadImageBox?.addEventListener('click', () => productImage.click());

productImage?.addEventListener('change', () => {
  const file = productImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove('hidden');
      uploadImageText.textContent = "✅ تم رفع الصورة - اضغط لتغييرها";
    };
    reader.readAsDataURL(file);
  }
});

function getProducts() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('edit');
let editingProduct = null;

if (editId) {
  const products = getProducts();
  editingProduct = products.find(p => p.id === editId);
  if (editingProduct) {
    document.getElementById('formTitle').textContent = "تعديل المنتج";
    document.getElementById('productType').value = editingProduct.type;
    document.getElementById('productTitle').value = editingProduct.title;
    document.getElementById('productSubtitle').value = editingProduct.subtitle || '';
    document.getElementById('productPrice').value = editingProduct.price;
    document.getElementById('productLink').value = editingProduct.link || '';
    if (editingProduct.image) {
      imagePreview.src = editingProduct.image;
      imagePreview.classList.remove('hidden');
    }
  }
}

document.getElementById('productForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('productTitle').value.trim();
  const price = document.getElementById('productPrice').value;
  const errorEl = document.getElementById('uploadError');

  if (!title || !price) {
    errorEl.textContent = "⚠️ عبّي عنوان المنتج والسعر على الأقل";
    return;
  }

  const productData = {
    id: editingProduct ? editingProduct.id : 'p_' + Date.now(),
    ownerEmail: currentUserEmail,
    type: document.getElementById('productType').value,
    title: title,
    subtitle: document.getElementById('productSubtitle').value.trim(),
    price: parseFloat(price),
    image: imagePreview.src.startsWith('data:') ? imagePreview.src : (editingProduct?.image || ''),
    link: document.getElementById('productLink').value.trim()
  };

  let products = getProducts();

  if (editingProduct) {
    products = products.map(p => p.id === editingProduct.id ? productData : p);
  } else {
    products.push(productData);
  }

  saveProducts(products);
  window.location.href = "dashboard.html";
});
