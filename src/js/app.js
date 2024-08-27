document.addEventListener("DOMContentLoaded", function () {
  fixedNavigation();

  createGallery();

  showActiveSection();

  anchorNNavigation();
});

function anchorNNavigation(){
  const navigation = document.querySelector('.main-navigation');
  navigation.addEventListener('click', e=>{
    e.preventDefault();
    const target = e.target;
    let link = undefined;
    let section = null;
    if(target.classList.contains('nav-link')){
      link = target.getAttribute('href');
      section = document.querySelector(link);
      section.scrollIntoView({behavior: 'smooth'});
    }
  })
};
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
    let picture = document.createElement('PICTURE');

    picture.innerHTML =`
        <source loading="lazy"  srcset="./build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source loading="lazy"  srcset="./build/img/gallery/thumb/${i}.webp" type="image/webp">

        <img loading="lazy" width="300" height="200" src="./build/img/gallery/thumb/${i}.jpg" alt="gallery picture" data-id="${i}" class="gallery-img">
    `;

    ulGallery.appendChild(picture);
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
  let picture = document.createElement('PICTURE');

  picture.innerHTML =`
  <source   srcset="./build/img/gallery/full/${imgId}.avif" type="image/avif">
  <source   srcset="./build/img/gallery/full/${imgId}.webp" type="image/webp">

  <img  src="./build/img/gallery/full/${imgId}.jpg" alt="gallery image">
`;

  // create modal element
  const modal = document.createElement("DIV");
  modal.appendChild(picture);
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
