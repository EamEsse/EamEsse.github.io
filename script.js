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
    "producto1": { title: "Funda para pendrive con forma de patita de gato", desc: "Una funda para pendrive con forma de patita de gato." },
    "producto2": { title: "Marcapáginas", desc: "Marcapáginas con formas de gatitos." },
    "producto3": { title: "Porta-anillos con forma de helado", desc: "Un simpático porta-anillos con forma de helado." },
    "producto4": { title: "Soporte para auriculares minimalista", desc: "Un soporte elegante y minimalista para tus cascos." },
    "producto5": { title: "Maceta geométrica decorativa", desc: "Una maceta con diseño geométrico moderno para tus plantas." },
    "producto6": { title: "Llavero de pulpo articulado", desc: "Un divertido pulpo articulado impreso en una sola pieza." }
  };

  if (productId.startsWith("render")) {
    productImages = [`fotos_renders/${productId}/1.jpg`];
    document.getElementById("product-title").innerText = "Render " + productId.replace("render", "");
    document.getElementById("product-desc").innerText = "Visualización 3D artística realizada con Blender/Cycles.";
    document.getElementById("product-link").style.display = "none";
  } else {
    const data = productData[productId] || {
      title: "Producto " + productId.replace("producto", ""),
      desc: "Diseño exclusivo de modelo para impresión 3D."
    };
    document.getElementById("product-title").innerText = data.title;
    document.getElementById("product-desc").innerText = data.desc;
    document.getElementById("product-link").href = "https://cults3d.com/";
    document.getElementById("product-link").style.display = "inline-block";

    // CARGA DINÁMICA DE IMÁGENES
    const extensions = [".jpg", ".JPG"];
    for (let i = 1; i <= 10; i++) {
      let found = false;
      for (const ext of extensions) {
        const url = `fotos_productos_3d/${productId}/${i}${ext}`;
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
      if (!found && i > 1) break;
      if (!found && i === 1) {
        productImages = ["https://via.placeholder.com/600x400?text=Imagen+no+disponible"];
      }
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

