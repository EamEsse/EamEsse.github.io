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

document.getElementById("prevBtn").onclick = function() {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("modal-img").src = images[currentIndex];
  }
};

document.getElementById("nextBtn").onclick = function() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    document.getElementById("modal-img").src = images[currentIndex];
  }
};

function openProduct(name) {

  document.querySelector(".module").style.display = "none";
  document.getElementById("product-view").style.display = "block";

  if (name === "Organizador") {
    document.getElementById("product-title").innerText = "Organizador";
    document.getElementById("product-desc").innerText = "Organizador impreso en 3D funcional.";
    document.getElementById("product-main-img").src = "fotos_productos_3d/producto1/1.jpg";
    document.getElementById("product-link").href = "https://cults3d.com/";
  }

  if (name === "Figura cute") {
    document.getElementById("product-title").innerText = "Figura cute";
    document.getElementById("product-desc").innerText = "Figura decorativa estilo cute.";
    document.getElementById("product-main-img").src = "fotos_productos_3d/producto2/1.jpg";
    document.getElementById("product-link").href = "https://cults3d.com/";
  }
}
