// Carousel functionality for Local Pride Global Quality section
class QualityCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.autoSlideInterval = null;
    this.slideInterval = 2000; // 2 seconds
    this.isAutoPlaying = true;
    
    this.slides = [
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f4c846d47ddf5b41de3d67e344b3af286304aa9?width=2244",
        text: "dibuat di bandung dengan kualitas internasional cotton s24 berbahan cooltech"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cde2837f6888802d56a0c6f5322eb0ab8ad30924?width=1017",
        text: "material premium dengan teknologi cooltech untuk kenyamanan maksimal"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e386efd00903b70bd1fcb669c929137b703f2be0?width=1271",
        text: "inovasi terdepan dalam industri fashion dengan standar global"
      }
    ];
    
    this.init();
  }
  
  init() {
    this.createCarouselElements();
    this.bindEvents();
    this.startAutoSlide();
  }
  
  createCarouselElements() {
    const carouselContainer = document.querySelector('.quality-carousel');
    if (!carouselContainer) return;
    
    // Create image element
    const imageElement = carouselContainer.querySelector('.carousel-image');
    if (imageElement) {
      imageElement.src = this.slides[0].image;
    }
    
    // Create text element
    const textElement = carouselContainer.querySelector('.carousel-text');
    if (textElement) {
      textElement.textContent = this.slides[0].text;
    }
    
    // Update progress bars
    this.updateProgressBars();
  }
  
  bindEvents() {
    // Progress bar click events
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
      bar.addEventListener('click', () => {
        this.goToSlide(index);
      });
      
      // Add hover effect
      bar.style.cursor = 'pointer';
    });
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.quality-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.stopAutoSlide();
      });
      
      carouselContainer.addEventListener('mouseleave', () => {
        this.startAutoSlide();
      });
    }
  }
  
  goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
    
    this.currentSlide = slideIndex;
    this.updateCarousel();
    this.updateProgressBars();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
    this.updateProgressBars();
  }
  
  updateCarousel() {
    const imageElement = document.querySelector('.carousel-image');
    const textElement = document.querySelector('.carousel-text');
    
    if (imageElement) {
      // Add fade transition
      imageElement.style.opacity = '0';
      setTimeout(() => {
        imageElement.src = this.slides[this.currentSlide].image;
        imageElement.style.opacity = '1';
      }, 150);
    }
    
    if (textElement) {
      // Add fade transition
      textElement.style.opacity = '0';
      setTimeout(() => {
        textElement.textContent = this.slides[this.currentSlide].text;
        textElement.style.opacity = '1';
      }, 150);
    }
  }
  
  updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
      if (index === this.currentSlide) {
        bar.classList.remove('bg-white/50');
        bar.classList.add('bg-white');
      } else {
        bar.classList.remove('bg-white');
        bar.classList.add('bg-white/50');
      }
    });
  }
  
  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.isAutoPlaying = true;
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
    this.isAutoPlaying = false;
  }
  
  destroy() {
    this.stopAutoSlide();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const qualityCarousel = new QualityCarousel();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', function() {
    qualityCarousel.destroy();
  });
});
