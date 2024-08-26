document.addEventListener("DOMContentLoaded", function () {
  fixedNavigation();

  createGallery();

  showActiveSection();
});

function showActiveSection() {
  document.addEventListener("scroll", () => {
    //get all section elements from the document
    const sections = document.querySelectorAll("section");
    //get all a elements inside the nav elements
    const anchors = document.querySelectorAll(".main-navigation a");
    // detect the current section
    let current = "";
    sections.forEach((section) => {
      const distanceFromTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (distanceFromTop - sectionHeight / 3)) {
        current = section.id;
      }
    });

    anchors.forEach(a =>{
      a.classList.remove('active');
      if(a.getAttribute('href') === `#${current}`){
        a.classList.add('active');
      }
    })
  });
}
function fixedNavigation() {
  // when the about festival section is no longer in the viewport the header will be fixed
  const aboutFestivalSection = document.querySelector(".about-festival");
  const header = document.querySelector(".header");

  document.addEventListener("scroll", () => {
    const distanceFromTop = aboutFestivalSection.getBoundingClientRect().bottom;
    if (distanceFromTop < 0) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function createGallery() {
  const ulGallery = document.querySelector(".gallery-images");
  const IMAGES_NUM = 16;

  for (let i = 1; i <= IMAGES_NUM; i++) {
    const img = document.createElement("IMG");
    img.src = `src/img/gallery/full/${i}.jpg`;
    img.alt = "gallery picture";
    img.classList.add("gallery-img");
    img.setAttribute("data-id", i);
    ulGallery.appendChild(img);
  }
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
  const img = document.createElement("IMG");
  img.setAttribute("src", `src/img/gallery/full/${imgId}.jpg`);
  img.setAttribute("alt", "gallery image");
  // create modal element
  const modal = document.createElement("DIV");
  modal.appendChild(img);
  modal.classList.add("modal");
  //   close button
  const closeBtn = document.createElement("BUTTON");
  closeBtn.textContent = "X";
  closeBtn.classList.add("closeBtn");
  modal.appendChild(closeBtn);

  //insert inside the body
  const body = document.body;
  // dissable overflow
  body.style.overflowY = "hidden";
  //insert at the beginning inside the body
  body.prepend(modal);
}

function clickEventHandler(e) {
  const target = e.target;
  if (target.classList.contains("gallery-img")) {
    // if the modal doesn't exist it'll be created
    if (!document.querySelector(".modal")) {
      id = target.dataset.id;
      showImg(id);
      return;
    }
  }

  if (
    target.classList.contains("modal") ||
    target.classList.contains("closeBtn")
  ) {
    closeModal();
    return;
  }
}

document.body.addEventListener("click", clickEventHandler);
