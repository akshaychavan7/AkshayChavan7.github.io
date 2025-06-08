let masonry;
const SHEET_ID = '1g_3EYOmSTU1S9EvqX2XMPZTsZYb1kBwSfhL4OcECqbY';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_eRwGsG00BReQhnAtsFemgYqec-c2Fb_jIOMBVPig92PQkP0eal7fO7zbVgCYtP07/exec';

// Get image ID from URL
function getImageId(imageUrl) {
  // Extract filename from URL
  const filename = imageUrl.split('/').pop();
  // Remove file extension and any special characters
  return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
}

// Register a new image with Google Sheets
async function registerImage(imageUrl, title) {
  try {
    const id = getImageId(imageUrl);
    const response = await fetch(`${SCRIPT_URL}?action=registerImage&id=${id}&imageUrl=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(title)}`);
    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to register image');
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
  // First load from localStorage as fallback
  const savedLikes = localStorage.getItem('galleryLikes');
  if (savedLikes) {
    const parsedLikes = JSON.parse(savedLikes);
    data.gallery.forEach(item => {
      const id = getImageId(item.image);
      if (parsedLikes[id]) {
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
        if (sheetData.likes[id]) {
          item.likes = parseInt(sheetData.likes[id]);
        }
      });
      // Update localStorage with fresh data
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

// Save likes to Google Sheets
async function saveLikesToSheet(imageUrl, likes) {
  try {
    const id = getImageId(imageUrl);
    await fetch(`${SCRIPT_URL}?action=updateLikes&id=${id}&likes=${likes}`);
  } catch (error) {
    console.error('Error saving likes to Google Sheets:', error);
  }
}

// Initialize gallery
function initGallery() {
  loadLikes();
  const galleryContainer = document.getElementById('gallery');
  
  data.gallery.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-aos', 'fade-up');
    
    // Create image element
    const img = new Image();
    img.src = item.image;
    img.alt = item.title;
    img.className = 'gallery-image';
    
    // Add load event to reinitialize masonry after image loads
    img.onload = function() {
      if (masonry) {
        masonry.layout();
      }
    };
    
    const imageId = getImageId(item.image);
    
    galleryItem.innerHTML = `
      <div class="gallery-overlay">
        <div class="gallery-info">
          <h3 class="gallery-title">${item.title}</h3>
          <button class="like-button ${item.likes > 0 ? 'liked' : ''}" data-id="${imageId}">
            <i class="fas fa-heart"></i>
            <span class="like-count">${item.likes}</span>
          </button>
        </div>
        <div class="gallery-meta">
          <div class="gallery-date">
            <i class="far fa-calendar-alt"></i>
            <span>${item.date}</span>
          </div>
          <div class="gallery-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${item.location}</span>
          </div>
        </div>
      </div>
    `;
    
    // Insert image at the beginning
    galleryItem.insertBefore(img, galleryItem.firstChild);
    galleryContainer.appendChild(galleryItem);
  });
  
  // Initialize Masonry
  masonry = new Masonry(galleryContainer, {
    itemSelector: '.gallery-item',
    columnWidth: '.gallery-item',
    percentPosition: true,
    transitionDuration: '0.3s'
  });
  
  // Add click event listeners to like buttons
  document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', handleLike);
  });
}

// Handle like button click
async function handleLike(event) {
  const button = event.currentTarget;
  const id = button.dataset.id;
  const item = data.gallery.find(item => getImageId(item.image) === id);
  
  if (item) {
    item.likes++;
    button.classList.add('liked');
    button.querySelector('.like-count').textContent = item.likes;
    
    // Save to localStorage
    saveLikes();
    
    // Save to Google Sheets
    await saveLikesToSheet(item.image, item.likes);
  }
}

// Function to add a new image to the gallery
async function addNewImage(imageUrl, title, date, location) {
  try {
    // Register the image with Google Sheets
    await registerImage(imageUrl, title);
    
    // Add to gallery data
    data.gallery.push({
      image: imageUrl,
      title: title,
      date: date,
      location: location,
      likes: 0
    });
    
    // Reinitialize gallery
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
  await syncGalleryWithSheet(); // Sync first
  await loadLikes(); // Then load likes
  initGallery();
}); 