import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('ul.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);
galleryList.style.listStyle = 'none';

const lightboxList = document.querySelector('div.gallery');
lightboxList.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  alertError: false,
  loop: true,
});

document.addEventListener('keyup', onGalleryClose);
function onGalleryClose(event) {
  if (event.code === 'Escape') {
    lightbox.close();
    document.removeEventListener('keyup', onGalleryClose);
  }
}

function createGalleryItemsMarkup(items) {
  return items
    .map(
      ({ original, preview, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
     </a>
  </li>
    `
    )
    .join('');
}
