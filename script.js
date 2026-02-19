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

document.getElementById("prevBtn").onclick = function () {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("modal-img").src = images[currentIndex];
  }
};

document.getElementById("nextBtn").onclick = function () {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    document.getElementById("modal-img").src = images[currentIndex];
  }
};

let productImages = [];
let currentProductImgIndex = 0;

function openProduct(id) {
  const productId = id.toLowerCase();
  currentProductImgIndex = 0;

  document.querySelectorAll(".module").forEach(m => m.style.display = "none");
  document.getElementById("product-view").style.display = "block";
  document.getElementById("backArrow").style.display = "block";

  if (productId === "producto1") {
    productImages = ["fotos_productos_3d/producto1/1.jpg", "fotos_productos_3d/producto1/2.jpg"];
    document.getElementById("product-title").innerText = "Funda para pendrive con forma de patita de gato";
    document.getElementById("product-desc").innerText = "Una funda para pendrive con forma de patita de gato.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId === "producto2") {
    productImages = ["fotos_productos_3d/producto2/1.jpg"];
    document.getElementById("product-title").innerText = "Marcapáginas";
    document.getElementById("product-desc").innerText = "Marcapáginas con formas de gatitos.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId === "producto3") {
    productImages = ["fotos_productos_3d/producto3/1.jpg"];
    document.getElementById("product-title").innerText = "Porta-anillos con forma de helado";
    document.getElementById("product-desc").innerText = "Un simpático porta-anillos con forma de helado.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId === "producto4") {
    productImages = ["fotos_productos_3d/producto4/1.jpg"];
    document.getElementById("product-title").innerText = "Soporte para auriculares minimalista";
    document.getElementById("product-desc").innerText = "Un soporte elegante y minimalista para tus cascos.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId === "producto5") {
    productImages = ["fotos_productos_3d/producto5/1.jpg"];
    document.getElementById("product-title").innerText = "Maceta geométrica decorativa";
    document.getElementById("product-desc").innerText = "Una maceta con diseño geométrico moderno para tus plantas.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId === "producto6") {
    productImages = ["fotos_productos_3d/producto6/1.jpg"];
    document.getElementById("product-title").innerText = "Llavero de pulpo articulado";
    document.getElementById("product-desc").innerText = "Un divertido pulpo articulado impreso en una sola pieza.";
    document.getElementById("product-link").href = "https://cults3d.com/";
  } else if (productId.startsWith("render")) {
    // Lógica para Renders
    productImages = [`fotos_renders/${productId}/1.jpg`];
    document.getElementById("product-title").innerText = "Render " + productId.replace("render", "");
    document.getElementById("product-desc").innerText = "Visualización 3D artística realizada con Blender/Cycles.";
    document.getElementById("product-link").style.display = "none"; // 👈 ocultar botón comprar
  } else {
    // Default or other products
    productImages = [`fotos_productos_3d/${productId}/1.jpg`];
    document.getElementById("product-title").innerText = "Producto desconocido";
    document.getElementById("product-desc").innerText = "Descripción no disponible.";
    document.getElementById("product-link").href = "#";
  }

  // Asegurar que el botón de comprar se vea si no es un render
  if (!productId.startsWith("render")) {
    document.getElementById("product-link").style.display = "inline-block";
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

