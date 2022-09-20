import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkUp = createMarkUp(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", galleryMarkUp);
galleryRef.addEventListener("click", onGalleryClick)

function createMarkUp(galleryItems) {
   return galleryItems.map(({ preview, original, description }) =>
    `<div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </div>`
    )
    .join("");
}

function onGalleryClick(evt) {
    evt.preventDefault();

    const targetEL = evt.target.classList.contains("gallery__image");
    
    if (!targetEL) {
        return;
    }

    const originalImage = evt.target.dataset.source;

    showModal(originalImage);
}

function showModal(imageUrl){
    const modal = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
`)
    modal.show(() => window.addEventListener("keydown", closeModalByEsc));

    function closeModalByEsc(evt) {
        if (evt.code === "Escape") {
            modal.close(() => window.removeEventListener("keydown", closeModalByEsc));
        };
    };
};
