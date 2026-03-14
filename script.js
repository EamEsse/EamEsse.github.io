let images = [];
let currentIndex = 0;

function openModal(title, desc, imgs) {
  images = imgs;
  currentIndex = 0;

  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = desc;
  document.getElementById("modal-img").src = images[0];

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

const prevBtn = document.getElementById("prevBtn");
if (prevBtn) {
  prevBtn.onclick = function () {
    if (currentIndex > 0) {
      currentIndex--;
      document.getElementById("modal-img").src = images[currentIndex];
    }
  };
}

const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.onclick = function () {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      document.getElementById("modal-img").src = images[currentIndex];
    }
  };
}

let productImages = [];
let currentProductImgIndex = 0;

async function openProduct(id) {
  const productId = id.toLowerCase();
  currentProductImgIndex = 0;
  productImages = [];

  document.querySelectorAll(".module").forEach(m => m.style.display = "none");
  document.getElementById("product-view").style.display = "block";
  document.getElementById("backArrow").style.display = "block";

  // Definir datos específicos si existen, sino usar genéricos
  const productData = {
    "producto1": { title: "Funda para Pendrive con Forma de Patita de Gato", desc: "Una funda con medida personalizada para transformar cualquier pendrive/ usb en una bonita pata de gato.", link: "https://cults3d.com/es/modelo-3d/artilugios/funda-pendrive-usb-pata-de-gato" },
    "producto2": { title: "Marcapáginas con Forma de Gatos", desc: "Unos bonitos marcapáginas para tus libros con forma de diferentes gatitos, incluye una pequeña caja de almacenaje.", link: "https://cults3d.com/es/modelo-3d/variado/pack-marcapaginas-de-gatos" },
    "producto3": { title: "Fidget \"Ouchie\", Juguete Sensorial", desc: "Un juguete sensorial con textura para aliviar el estrés.", link: "https://cults3d.com/es/modelo-3d/juegos/fidget-ouchie-juguete-sensorial" },
    "producto4": { title: "Lapicero Ovni", desc: "Un lapicero con forma de platillo volante, perfecto para tener tus boligrafos en la mesa.", link: "https://cults3d.com/es/modelo-3d/casa/lapicero-ovni" },
    "producto5": { title: "Cajones Modulares Apilables", desc: "Unos cajones modulares apilables, tiene diferentes módulos con diferentes tamaños de cajones, puedes usar y apilar tantos como quieras.", link: "https://cults3d.com/es/modelo-3d/casa/cajones-modulares-apilables" },
    "producto6": { title: "Sujetalibro Portal de Tentáculos", desc: "Un soporte para el libro que quieras con temática de portal con tentáculos.", link: "https://cults3d.com/es/modelo-3d/casa/soporte-libro-eamesse" },
    "producto7": { title: "Hacha con Estética Cute", desc: "Un hacha con estética cute \"magical girl\", perfecta para cosplay, sesiones de fotos o decoración.", link: "https://cults3d.com/es/modelo-3d/moda/hacha-cute-eamesse" },
    "producto8": { title: "Porta-anillos con Forma de Helado Derretido", desc: "Guarda tus anillos en este portanillos con forma de helado derretido.", link: "https://cults3d.com/es/modelo-3d/joyas/helado-soporte-para-anillos-eamesse" },
    "producto9": { title: "Cinturón de Estrellitas", desc: "Un cinturón con estrellitas.", link: "https://cults3d.com/es/modelo-3d/moda/cinturon-de-estrellas" },
    "producto10": { title: "Posavasos con Forma de Tela de Araña", desc: "Unos posavasos con forma de tela de araña.", link: "https://cults3d.com/es/modelo-3d/variado/posavasos-tela-de-arana-eamesse" }
  };

  if (productId.startsWith("render")) {
    document.getElementById("product-title").innerText = "Render " + productId.replace("render", "");
    document.getElementById("product-desc").innerText = "Visualización 3D artística realizada con Blender/Cycles.";
    document.getElementById("product-link").style.display = "none";
  } else {
    const data = productData[productId] || {
      title: "Producto " + productId.replace("producto", ""),
      desc: "Diseño exclusivo de modelo para impresión 3D.",
      link: "https://cults3d.com/"
    };
    document.getElementById("product-title").innerText = data.title;
    document.getElementById("product-desc").innerText = data.desc;
    document.getElementById("product-link").href = data.link;
    document.getElementById("product-link").style.display = "inline-block";
  }

  // CARGA DINÁMICA DE IMÁGENES
  const basePath = productId.startsWith("render") ? "fotos_renders" : "fotos_productos_3d";
  const extensions = [".jpg", ".JPG"];
  for (let i = 1; i <= 10; i++) {
    let found = false;
    for (const ext of extensions) {
      const url = `${basePath}/${productId}/${i}${ext}`;
      const exists = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

      if (exists) {
        productImages.push(url);
        found = true;
        break;
      }
    }
    if (!found) {
      if (i === 1) {
        productImages = ["https://via.placeholder.com/600x400?text=Imagen+no+disponible"];
      }
      break;
    }
  }

  updateMainImage();
  renderThumbnails();
}

function updateMainImage() {
  const mainImg = document.getElementById("product-main-img");
  mainImg.src = productImages[currentProductImgIndex];

  // Ocultar flechas si solo hay una imagen
  const arrows = document.querySelectorAll(".slider-arrow");
  arrows.forEach(arrow => {
    arrow.style.display = productImages.length > 1 ? "block" : "none";
  });
}

function renderThumbnails() {
  const container = document.getElementById("product-thumbnails");
  container.innerHTML = "";

  if (productImages.length <= 1) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  productImages.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.classList.toggle("active", index === currentProductImgIndex);
    thumb.onclick = () => {
      currentProductImgIndex = index;
      updateMainImage();
      renderThumbnails();
    };
    container.appendChild(thumb);
  });
}

function changeImage(step) {
  currentProductImgIndex += step;
  if (currentProductImgIndex < 0) currentProductImgIndex = productImages.length - 1;
  if (currentProductImgIndex >= productImages.length) currentProductImgIndex = 0;
  updateMainImage();
  renderThumbnails();
}

function goBack() {
  document.getElementById("product-view").style.display = "none";
  document.querySelectorAll(".module").forEach(m => m.style.display = "block");
  document.getElementById("backArrow").style.display = "none";
}

function showSection(sectionId) {
  if (sectionId === 'renders') {
    // Si estamos en index.html, ocultamos los otros módulos y mostramos solo el de renders
    // O podríamos simplemente hacer scroll si estuvieran todos en la misma página
    // Dado el diseño actual, 'Ver todo' en Renders podría filtrar o redirigir.
    // De momento, mantendremos la coherencia con lo que el usuario espera.
    // Si no hay una página dedicada a renders, simplemente mostramos el módulo.
    document.querySelectorAll(".module").forEach(m => {
      const h2 = m.querySelector("h2");
      if (h2 && h2.innerText.toLowerCase().includes("renders")) {
        m.style.display = "block";
      } else {
        m.style.display = "none";
      }
    });
  }
}

