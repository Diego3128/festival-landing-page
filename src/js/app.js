document.addEventListener("DOMContentLoaded", function () {
  createGallery();
});

function createGallery() {
  const ulGallery = document.querySelector(".gallery-images");
  const IMAGES_NUM = 16;

  for (let i = 1; i <= IMAGES_NUM; i++) {
    const img = document.createElement("IMG");
    img.src = `src/img/gallery/full/${i}.jpg`;
    img.alt = "gallery picture";
    img.classList.add("gallery-img");
    img.id = `gallery-img-${i}`;
    ulGallery.appendChild(img);
  }
  console.log(ulGallery);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const body = document.body;
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal?.remove();
    body.style.overflowY = "auto";
  }, 200);
}
function showImg(imgId) {
  //image's reference to show in the modal
  const img = document.getElementById(imgId);
  // create modal element
  const modal = document.createElement("DIV");
  modal.appendChild(img);
  modal.onclick = closeModal;
  modal.classList.add("modal");
  //   close button
  const closeBtn = document.createElement("BUTTON");
  closeBtn.textContent = "X";
  closeBtn.classList.add("closeBtn");
  modal.appendChild(closeBtn);

  //insert inside the body
  const body = document.body;
  body.style.overflowY = "hidden";
  body.prepend(modal);
}

function clickEventHandler(e) {
  const target = e.target;
  if (target.classList.contains("gallery-img")) {
    showImg(target.id);
  }
}
document.addEventListener("click", clickEventHandler);
