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
