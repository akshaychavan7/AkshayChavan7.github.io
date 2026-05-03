let masonry;
let lightbox;
const SHEET_ID = '1g_3EYOmSTU1S9EvqX2XMPZTsZYb1kBwSfhL4OcECqbY';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_eRwGsG00BReQhnAtsFemgYqec-c2Fb_jIOMBVPig92PQkP0eal7fO7zbVgCYtP07/exec';

// Get image ID from URL
function getImageId(imageUrl) {
  const filename = imageUrl.split('/').pop();
  return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
}

// Register a new image with Google Sheets
async function registerImage(imageUrl, title) {
  try {
    const id = getImageId(imageUrl);
    const response = await fetch(`${SCRIPT_URL}?action=registerImage&id=${id}&imageUrl=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(title)}`);
    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to register image');
    }
    return id;
  } catch (error) {
    console.error('Error registering image:', error);
    throw error;
  }
}

// Sync gallery with Google Sheets
async function syncGalleryWithSheet() {
  try {
    const currentIds = data.gallery.map(item => getImageId(item.image));
    await fetch(`${SCRIPT_URL}?action=syncGallery&ids=${JSON.stringify(currentIds)}`);
  } catch (error) {
    console.error('Error syncing gallery with Google Sheets:', error);
  }
}

// Load likes from localStorage and Google Sheets
async function loadLikes() {
  // Load from localStorage first as fallback
  const savedLikes = localStorage.getItem('galleryLikes');
  if (savedLikes) {
    const parsedLikes = JSON.parse(savedLikes);
    data.gallery.forEach(item => {
      const id = getImageId(item.image);
      if (parsedLikes[id] !== undefined) {
        item.likes = parsedLikes[id];
      }
    });
  }

  // Then try to load from Google Sheets
  try {
    const response = await fetch(`${SCRIPT_URL}?action=getLikes`);
    const sheetData = await response.json();
    if (sheetData.likes) {
      data.gallery.forEach(item => {
        const id = getImageId(item.image);
        if (sheetData.likes[id] !== undefined) {
          item.likes = parseInt(sheetData.likes[id]);
        }
      });
      saveLikes();
    }
  } catch (error) {
    console.error('Error loading likes from Google Sheets:', error);
  }
}

// Save likes to localStorage
function saveLikes() {
  const likesToSave = {};
  data.gallery.forEach(item => {
    likesToSave[getImageId(item.image)] = item.likes;
  });
  localStorage.setItem('galleryLikes', JSON.stringify(likesToSave));
}

// Track which items the current user has liked
function getLikedByUser() {
  const saved = localStorage.getItem('galleryLikedByUser');
  return saved ? new Set(JSON.parse(saved)) : new Set();
}

function saveLikedByUser(likedSet) {
  localStorage.setItem('galleryLikedByUser', JSON.stringify([...likedSet]));
}

// Save likes to Google Sheets
async function saveLikesToSheet(imageUrl, likes) {
  try {
    const id = getImageId(imageUrl);
    await fetch(`${SCRIPT_URL}?action=updateLikes&id=${id}&likes=${likes}`);
  } catch (error) {
    console.error('Error saving likes to Google Sheets:', error);
  }
}

// Initialize gallery — do NOT call loadLikes() here; caller is responsible for awaiting it first
function initGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const likedByUser = getLikedByUser();

  data.gallery.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-aos', 'fade-up');

    const imageId = getImageId(item.image);
    const isLiked = likedByUser.has(imageId);

    // Create image element wrapped in a lightbox anchor
    const imgAnchor = document.createElement('a');
    imgAnchor.href = item.image;
    imgAnchor.className = 'glightbox';
    imgAnchor.setAttribute('data-gallery', 'portfolio-gallery');
    imgAnchor.setAttribute('data-title', item.title);

    const img = new Image();
    img.src = item.image;
    img.alt = item.title;
    img.className = 'gallery-image';
    img.loading = 'lazy';

    img.onload = function () {
      if (masonry) masonry.layout();
    };

    imgAnchor.appendChild(img);

    galleryItem.innerHTML = `
      <div class="gallery-overlay">
        <div class="gallery-info">
          <h3 class="gallery-title">${item.title}</h3>
          <button class="like-button ${isLiked ? 'liked' : ''}" data-id="${imageId}" aria-label="${isLiked ? 'Unlike' : 'Like'} photo: ${item.title}">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <span class="like-count">${item.likes}</span>
          </button>
        </div>
        <div class="gallery-meta">
          <div class="gallery-date">
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            <span>${item.date}</span>
          </div>
          <div class="gallery-location">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            <span>${item.location}</span>
          </div>
        </div>
      </div>
    `;

    galleryItem.insertBefore(imgAnchor, galleryItem.firstChild);
    galleryContainer.appendChild(galleryItem);
  });

  // Initialize Masonry
  masonry = new Masonry(galleryContainer, {
    itemSelector: '.gallery-item',
    columnWidth: '.gallery-item',
    percentPosition: true,
    transitionDuration: '0.3s'
  });

  // Initialize GLightbox if available
  if (typeof GLightbox !== 'undefined') {
    lightbox = GLightbox({ selector: '.glightbox', touchNavigation: true });
  }

  // Add like/unlike toggle listeners
  document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', handleLike);
  });
}

// Handle like/unlike toggle
async function handleLike(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  const id = button.dataset.id;
  const item = data.gallery.find(item => getImageId(item.image) === id);
  if (!item) return;

  const likedByUser = getLikedByUser();
  const alreadyLiked = likedByUser.has(id);

  if (alreadyLiked) {
    item.likes = Math.max(0, item.likes - 1);
    likedByUser.delete(id);
    button.classList.remove('liked');
    button.setAttribute('aria-label', `Like photo: ${item.title}`);
  } else {
    item.likes++;
    likedByUser.add(id);
    button.classList.add('liked');
    button.setAttribute('aria-label', `Unlike photo: ${item.title}`);
  }

  button.querySelector('.like-count').textContent = item.likes;
  saveLikes();
  saveLikedByUser(likedByUser);
  await saveLikesToSheet(item.image, item.likes);
}

// Function to add a new image to the gallery
async function addNewImage(imageUrl, title, date, location) {
  try {
    await registerImage(imageUrl, title);
    data.gallery.push({ image: imageUrl, title, date, location, likes: 0 });
    await syncGalleryWithSheet();
    await loadLikes();
    initGallery();
  } catch (error) {
    console.error('Error adding new image:', error);
    throw error;
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await syncGalleryWithSheet();
  await loadLikes();   // load once here; initGallery() no longer calls it
  initGallery();
});
