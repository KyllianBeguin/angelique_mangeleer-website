// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after picking a link (mobile)
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Gallery lightbox (page Œuvres)
// Clicking a thumbnail opens the picture at full scale, in an overlay,
// without leaving oeuvres.html. Closing: the cross button, clicking
// outside the picture, or pressing Escape.
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

if (gallery && lightbox && lightboxImg && lightboxClose) {
  const openLightbox = (img, figcaption) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    // Reuse the thumbnail's caption (title+date / description) under the full image
    if (lightboxCaption) {
      lightboxCaption.innerHTML = figcaption ? figcaption.innerHTML : '';
    }

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    if (lightboxCaption) lightboxCaption.innerHTML = '';
    document.body.style.overflow = '';
  };

  gallery.querySelectorAll('.gallery-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      const figcaption = trigger.closest('.gallery-item')?.querySelector('.gallery-caption');
      if (img) openLightbox(img, figcaption);
    });
  });

  // Close on cross button
  lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking outside the picture (the dark overlay itself),
  // but not when clicking the picture or the close button.
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Close on Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// Contact form
// NOTE for the dev: this only validates and shows a message in the browser.
// It does NOT send an email yet. To make it functional, either:
//   1) Point the <form> at a form backend (e.g. Formspree, Netlify Forms), or
//   2) Add a small backend endpoint and send this data with fetch().
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Merci de vérifier les champs du formulaire.';
      return;
    }

    // TODO: replace this with a real submission (see note above).
    status.textContent = 'Merci, votre message a bien été pris en compte.';
    form.reset();
  });
}
