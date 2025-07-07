// Product Carousel functionality with infinite sliding and staggered alignment
class ProductCarousel {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 3000; // 3 seconds
    
    this.products = [
      {
        id: 'shirt',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e386efd00903b70bd1fcb669c929137b703f2be0?width=1271',
        title: 'SHIRT',
        description: 'Alpen Shirt kami hadir dengan material micro cotton 24s yang lembut dan breathable,',
        alignment: 'bottom' // y-position offset
      },
      {
        id: 'hoodie',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aadf956c9d70e4bf179691b3b238fd929c67d387?width=1037',
        title: 'HOODIE',
        description: 'Basic Hoodie dengan 100% berbahan katun fleech dan pola regular fit',
        alignment: 'middle'
      },
      {
        id: 'oversized',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5ac8a1aa8a52d5ac4e2a27df97930d89ae9b8841?width=1388',
        title: 'OVERSIZED T-SHIRT',
        description: 'Soft, wrinkle free, and effortlessly stylish!',
        alignment: 'top'
      },
      {
        id: 'crewneck',
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/31b7658431005cf116b8928469558fb7e5fdacbd?width=1283',
        title: 'CREWNECK',
        description: 'A relaxed sweater for all day comfortable fit.',
        alignment: 'top'
      }
    ];
    
    this.init();
  }
  
  init() {
    this.createCarousel();
    this.bindEvents();
    this.startAutoSlide();
  }
  
  createCarousel() {
    const container = document.querySelector('.product-carousel-container');
    if (!container) return;
    
    // Create carousel track with duplicated items for infinite effect
    const track = container.querySelector('.carousel-track');
    if (!track) return;
    
    // Clear existing content
    track.innerHTML = '';
    
    // Create extended product array for infinite loop
    const extendedProducts = [
      ...this.products,
      ...this.products, // Duplicate for seamless loop
      ...this.products  // Triple for smooth infinite scrolling
    ];
    
    extendedProducts.forEach((product, index) => {
      const slide = this.createSlide(product, index);
      track.appendChild(slide);
    });
    
    // Set initial position to show the second set (to allow backward scrolling)
    this.currentIndex = this.products.length;
    this.updateCarousel(false); // No animation for initial position
  }
  
  createSlide(product, index) {
    const slide = document.createElement('div');
    slide.className = `carousel-slide flex-none ${this.getAlignmentClass(product.alignment)}`;
    
    slide.innerHTML = `
      <div class="product-card w-[320px] bg-white shadow-lg rounded-lg overflow-hidden relative">
        <div class="relative h-[400px] md:h-[500px]">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
            <h3 class="text-2xl md:text-3xl font-medium uppercase mb-2">${product.title}</h3>
            <p class="text-sm mb-4 leading-relaxed">${product.description}</p>
            <button class="product-btn px-8 py-3 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
              See more
            </button>
          </div>
        </div>
      </div>
    `;
    
    return slide;
  }
  
  getAlignmentClass(alignment) {
    switch(alignment) {
      case 'top':
        return 'mt-0';
      case 'middle':
        return 'mt-8 md:mt-12';
      case 'bottom':
        return 'mt-16 md:mt-24';
      default:
        return 'mt-8';
    }
  }
  
  bindEvents() {
    // Navigation buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.slideToPrev());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.slideToNext());
    }
    
    // Pause auto-slide on hover
    const container = document.querySelector('.product-carousel-container');
    if (container) {
      container.addEventListener('mouseenter', () => this.stopAutoSlide());
      container.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    // Touch/swipe support for mobile
    this.addTouchSupport();
  }
  
  addTouchSupport() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoSlide();
    });
    
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const deltaX = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          this.slideToNext();
        } else {
          this.slideToPrev();
        }
      }
      
      isDragging = false;
      this.startAutoSlide();
    });
  }
  
  slideToNext() {
    if (this.isAnimating) return;
    
    this.currentIndex++;
    this.updateCarousel();
    
    // Reset to beginning of second set when reaching end
    if (this.currentIndex >= this.products.length * 2) {
      setTimeout(() => {
        this.currentIndex = this.products.length;
        this.updateCarousel(false);
      }, 500);
    }
  }
  
  slideToPrev() {
    if (this.isAnimating) return;
    
    this.currentIndex--;
    this.updateCarousel();
    
    // Reset to end of second set when reaching beginning
    if (this.currentIndex < this.products.length) {
      setTimeout(() => {
        this.currentIndex = this.products.length * 2 - 1;
        this.updateCarousel(false);
      }, 500);
    }
  }
  
  updateCarousel(animate = true) {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    this.isAnimating = animate;
    
    // Calculate translation - show 3 cards at a time, centered
    const slideWidth = 350; // 320px card + 30px gap
    const visibleCards = 3;
    const centerOffset = (visibleCards - 1) / 2;
    const translateX = -(this.currentIndex - centerOffset) * slideWidth;
    
    if (animate) {
      track.style.transition = 'transform 0.5s ease-in-out';
    } else {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${translateX}px)`;
    
    if (animate) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }
  }
  
  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.slideToNext();
    }, this.autoSlideDelay);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  
  destroy() {
    this.stopAutoSlide();
  }
}

// Initialize product carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const productCarousel = new ProductCarousel();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', function() {
    productCarousel.destroy();
  });
});
