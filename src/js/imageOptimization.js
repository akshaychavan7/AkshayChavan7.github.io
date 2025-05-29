// Image optimization and lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add loading="lazy" to all images
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Add proper alt text if missing
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', 'Image');
    });
});

// Function to convert images to WebP format
function convertToWebP(img) {
    if (!img.complete) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    try {
        const webpData = canvas.toDataURL('image/webp');
        if (webpData.length < img.src.length) {
            img.src = webpData;
        }
    } catch (e) {
        console.warn('WebP conversion failed:', e);
    }
} 