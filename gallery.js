/* ===== GALLERY PAGE JAVASCRIPT ===== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZE GALLERY =====
    initializeGallery();
    
    // ===== SETUP EVENT LISTENERS =====
    setupEventListeners();
    
    // ===== SETUP ANIMATIONS =====
    setupAnimations();
});

/* ===== INITIALIZATION FUNCTIONS ===== */

/**
 * Initialize gallery based on URL parameters
 */
function initializeGallery() {
    try {
        // Get activity type from URL parameter
        const activityType = getUrlParameter('activity');
        
        if (activityType) {
            // Show the corresponding gallery
            showGallery(activityType);
        } else {
            // Default to parade gallery if no parameter
            showGallery('parade');
        }
        
        // Update page title based on activity
        updatePageTitle(activityType);
        
    } catch (error) {
        console.error('Error initializing gallery:', error);
        // Fallback to parade gallery
        showGallery('parade');
    }
}

/**
 * Show specific gallery section
 * @param {string} activityType - Type of activity gallery to show
 */
function showGallery(activityType) {
    try {
        // Hide all gallery sections first
        const allGalleries = document.querySelectorAll('.gallery-page');
        allGalleries.forEach(gallery => {
            gallery.classList.remove('active');
        });
        
        // Show the requested gallery
        const targetGallery = document.getElementById(`${activityType}-gallery`);
        if (targetGallery) {
            targetGallery.classList.add('active');
            
            // Trigger entrance animation for gallery items
            animateGalleryItems(targetGallery);
        } else {
            console.error(`Gallery not found: ${activityType}-gallery`);
            // Fallback to first available gallery
            if (allGalleries.length > 0) {
                allGalleries[0].classList.add('active');
                animateGalleryItems(allGalleries[0]);
            }
        }
        
    } catch (error) {
        console.error('Error showing gallery:', error);
    }
}

/* ===== EVENT LISTENERS SETUP ===== */

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    
    // ===== BACK BUTTON EVENT =====
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateBack();
        });
    }
    
    // ===== GALLERY ITEM CLICKS =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Open image in modal or lightbox (future enhancement)
            openImageModal(this);
        });
        
        // Add keyboard accessibility
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(this);
            }
        });
        
        // Make items focusable
        item.setAttribute('tabindex', '0');
    });
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // Escape key to go back
        if (e.key === 'Escape') {
            navigateBack();
        }
        
        // Arrow key navigation between gallery items
        if (e.key.startsWith('Arrow')) {
            navigateGalleryItems(e);
        }
    });
    
    // ===== BROWSER BACK BUTTON =====
    window.addEventListener('popstate', function(e) {
        // Handle browser back button
        if (e.state && e.state.activity) {
            showGallery(e.state.activity);
        } else {
            navigateBack();
        }
    });
}

/* ===== NAVIGATION FUNCTIONS ===== */

/**
 * Navigate back to activities page
 */
function navigateBack() {
    try {
        // Try to go back in browser history first
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to activities page
            window.location.href = 'index.html#activities';
        }
    } catch (error) {
        console.error('Error navigating back:', error);
        // Final fallback
        window.location.href = 'index.html';
    }
}

/**
 * Navigate between gallery items using arrow keys
 * @param {KeyboardEvent} e - Keyboard event
 */
function navigateGalleryItems(e) {
    const activeGallery = document.querySelector('.gallery-page.active');
    if (!activeGallery) return;
    
    const galleryItems = Array.from(activeGallery.querySelectorAll('.gallery-item'));
    const focusedItem = document.activeElement;
    
    if (galleryItems.includes(focusedItem)) {
        e.preventDefault();
        const currentIndex = galleryItems.indexOf(focusedItem);
        let nextIndex;
        
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                nextIndex = (currentIndex + 1) % galleryItems.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                nextIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                break;
            default:
                return;
        }
        
        galleryItems[nextIndex].focus();
    }
}

/* ===== ANIMATION FUNCTIONS ===== */

/**
 * Setup intersection observer for animations
 */
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);
    
    // Observe all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.6s ease';
        
        // Start observing
        observer.observe(item);
    });
}

/**
 * Animate gallery items entrance
 * @param {HTMLElement} gallery - Gallery container element
 */
function animateGalleryItems(gallery) {
    const items = gallery.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
        // Reset animation state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        
        // Animate with staggered delay
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

/* ===== MODAL FUNCTIONS ===== */

/**
 * Open image in modal/lightbox view
 * @param {HTMLElement} galleryItem - Clicked gallery item
 */
function openImageModal(galleryItem) {
    try {
        const img = galleryItem.querySelector('img');
        const overlayText = galleryItem.querySelector('.gallery-overlay-text');
        
        if (!img) return;
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <img src="${img.src}" alt="${img.alt}" class="modal-image">
                    <div class="modal-caption">${overlayText ? overlayText.textContent : img.alt}</div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            <style>
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }
                .modal-image {
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                }
                .modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-caption {
                    color: white;
                    margin-top: 20px;
                    font-size: 1.1rem;
                    line-height: 1.5;
                }
            </style>
        `;
        
        // Add styles to head if not already present
        if (!document.querySelector('#modal-styles')) {
            const styleTag = document.createElement('style');
            styleTag.id = 'modal-styles';
            styleTag.innerHTML = modalStyles;
            document.head.appendChild(styleTag);
        }
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Close modal events
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(modal);
        });
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

/**
 * Close image modal
 * @param {HTMLElement} modal - Modal element to close
 */
function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Get URL parameters
 * @param {string} param - Parameter name to get
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Update page title based on activity type
 * @param {string} activityType - Type of activity
 */
function updatePageTitle(activityType) {
    const titles = {
        'parade': 'NCC Parade Gallery',
        'blood-donation': 'NCC Blood Donation Gallery',
        'tree-plantation': 'NCC Tree Plantation Gallery',
        'swachh-bharat': 'NCC Swachh Bharat Gallery',
        'guard-of-honour': 'NCC Guard of Honour Gallery',
        'camps': 'NCC Camps Gallery'
    };
    
    document.title = titles[activityType] || 'NCC Activities Gallery';
}

/* ===== ERROR HANDLING ===== */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Gallery error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Gallery promise rejection:', e.reason);
});

/* ===== PERFORMANCE OPTIMIZATION ===== */

// Lazy load images when they come into view
function setupLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading if needed
// setupLazyLoading();