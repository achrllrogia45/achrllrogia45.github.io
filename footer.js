// Footer Component - Reusable across pages
// Usage: <script type="text/babel" src="footer.js"></script> and use <Footer /> in your React code

function Footer() {
  const [isVisible, setIsVisible] = React.useState(false);
  const footerRef = React.useRef(null);

  // Intersection Observer for footer animation
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className={`bg-black text-white font-roboto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Logo section above with animation */}
        <div className={`mb-12 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <img
            src="images/hg_logo_header_black.svg"
            alt="HumanGreatness Logo"
            className="h-20 sm:h-24 lg:h-32 w-auto max-w-full mx-auto filter brightness-0 invert hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        {/* Three columns section for services, navigation and address */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Customer Care */}
          <div className="footer-contact text-center md:text-left group">
            <img
              src="images/hgn.svg"
              alt="HGN Logo"
              className="h-6 sm:h-8 mb-6 mx-auto md:mx-0 filter brightness-0 invert group-hover:scale-105 transition-transform duration-300"
            />
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <p className="text-white text-sm text-center md:text-left">
                Online Customer Care:
                <br />
                <a
                  href="https://wa.me/6282126610201"
                  className="underline hover:text-cream transition-colors duration-300 hover:scale-105 inline-block transform"
                >
                  +62 821 2661 0201
                </a>
              </p>
              
              {/* Social Media with staggered animations */}
              <div className="social-links space-y-3 w-full">
                {/* Instagram */}
                <div className={`flex items-center space-x-3 justify-center md:justify-start transition-all duration-500 delay-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg
                    className="social-icon hover:scale-110 transition-transform duration-300"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.28 0C3.2648 0 0 3.2648 0 7.28V17.36C0 21.3752 3.2648 24.64 7.28 24.64H17.36C21.3752 24.64 24.64 21.3752 24.64 17.36V7.28C24.64 3.2648 21.3752 0 17.36 0H7.28ZM19.04 4.48C19.656 4.48 20.16 4.984 20.16 5.6C20.16 6.216 19.656 6.72 19.04 6.72C18.424 6.72 17.92 6.216 17.92 5.6C17.92 4.984 18.424 4.48 19.04 4.48ZM12.32 6.16C15.7192 6.16 18.48 8.9208 18.48 12.32C18.48 15.7192 15.7192 18.48 12.32 18.48C8.9208 18.48 6.16 15.7192 6.16 12.32C6.16 8.9208 8.9208 6.16 12.32 6.16ZM12.32 7.28C9.5424 7.28 7.28 9.5424 7.28 12.32C7.28 15.0976 9.5424 17.36 12.32 17.36C15.0976 17.36 17.36 15.0976 17.36 12.32C17.36 9.5424 15.0976 7.28 12.32 7.28Z"
                      fill="#FFFCEE"
                    />
                  </svg>
                  <a
                    href="https://www.instagram.com/hgbasiclabs"
                    className="social-link text-white underline hover:text-cream transition-all duration-300 hover:translate-x-1"
                  >
                    @hgbasiclabs
                  </a>
                </div>
                
                {/* Facebook */}
                <div className={`flex items-center space-x-3 justify-center md:justify-start transition-all duration-500 delay-800 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg
                    className="social-icon hover:scale-110 transition-transform duration-300"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.96 0.408203H3.03999C1.49439 0.408203 0.23999 1.6626 0.23999 3.2082V21.1282C0.23999 22.6738 1.49439 23.9282 3.03999 23.9282H20.96C22.5056 23.9282 23.76 22.6738 23.76 21.1282V3.2082C23.76 1.6626 22.5056 0.408203 20.96 0.408203ZM18.72 8.8082H17.6C16.4016 8.8082 15.92 9.0882 15.92 9.9282V11.6082H18.72L18.16 14.4082H15.92V22.8082H13.12V14.4082H10.88V11.6082H13.12V9.9282C13.12 7.6882 14.24 6.0082 16.48 6.0082C18.104 6.0082 18.72 6.5682 18.72 6.5682V8.8082Z"
                      fill="#FFFCEE"
                    />
                  </svg>
                  <a
                    href="https://www.facebook.com/hgbasiclabs/"
                    className="social-link text-white underline hover:text-cream transition-all duration-300 hover:translate-x-1"
                  >
                    Human Greatness
                  </a>
                </div>
                
                {/* TikTok */}
                <div className={`flex items-center space-x-3 justify-center md:justify-start transition-all duration-500 delay-900 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg
                    className="social-icon hover:scale-110 transition-transform duration-300"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.96 0.408203H3.03999C1.49607 0.408203 0.23999 1.66428 0.23999 3.2082V21.1282C0.23999 22.6721 1.49607 23.9282 3.03999 23.9282H20.96C22.5039 23.9282 23.76 22.6721 23.76 21.1282V3.2082C23.76 1.66428 22.5039 0.408203 20.96 0.408203ZM18.7233 10.6691C18.5962 10.6808 18.4674 10.6887 18.337 10.6887C16.8681 10.6887 15.5773 9.93324 14.8263 8.7914C14.8263 11.7868 14.8263 15.195 14.8263 15.2521C14.8263 17.8892 12.6882 20.0272 10.0512 20.0272C7.41415 20.0272 5.27607 17.8892 5.27607 15.2521C5.27607 12.6151 7.41415 10.477 10.0512 10.477C10.1509 10.477 10.2483 10.486 10.3463 10.4921V12.8452C10.2483 12.8335 10.152 12.8156 10.0512 12.8156C8.70495 12.8156 7.61407 13.9064 7.61407 15.2527C7.61407 16.5989 8.70495 17.6898 10.0512 17.6898C11.3974 17.6898 12.5863 16.6292 12.5863 15.2829C12.5863 15.2297 12.6098 4.31028 12.6098 4.31028H14.8588C15.0705 6.32124 16.6939 7.90828 18.7233 8.05388V10.6691Z"
                      fill="#FFFCEE"
                    />
                  </svg>
                  <a
                    href="https://www.tiktok.com/@hgbasiclabs"
                    className="social-link text-white underline hover:text-cream transition-all duration-300 hover:translate-x-1"
                  >
                    @hgbasiclabs
                  </a>
                </div>
              </div>
              
              {/* Shopping Icons */}
              <div className={`shopping-icons flex space-x-4 mt-6 justify-center md:justify-start transition-all duration-500 delay-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}>
                {/* SVG icons omitted for brevity */}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className={`footer-nav text-center md:text-left transition-all duration-500 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-xl sm:text-2xl font-medium text-white uppercase mb-6 tracking-wider hover:text-cream transition-colors duration-300">
              Navigation
            </h3>
            <nav className="space-y-3 flex flex-col items-center md:items-start">
              <a
                href="/"
                className="nav-item text-white hover:text-cream transition-all duration-300 text-sm hover:translate-x-2 hover:scale-105"
              >
                Home
              </a>
              <a
                href="location"
                className="nav-item text-white hover:text-cream transition-all duration-300 text-sm hover:translate-x-2 hover:scale-105"
              >
                Shop
              </a>
              <a
                href="#"
                className="nav-item text-white hover:text-cream transition-all duration-300 text-sm hover:translate-x-2 hover:scale-105"
              >
                Catalogues
              </a>
              <a
                href="aboutus"
                className="nav-item text-white hover:text-cream transition-all duration-300 text-sm hover:translate-x-2 hover:scale-105"
              >
                About Us
              </a>
            </nav>
          </div>
          
          {/* Address */}
          <div className={`footer-address text-center md:text-left transition-all duration-500 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-xl sm:text-2xl font-medium text-white uppercase mb-6 tracking-wider hover:text-cream transition-colors duration-300">
              Address
            </h3>
            <address className="not-italic text-white text-sm leading-relaxed mx-auto md:mx-0 max-w-xs hover:text-cream transition-colors duration-300">
              Jl. Hasanudin No 9, Lebak Gede
              <br />
              Kota Bandung
              <br />
              Jawa Barat
              <br />
              Indonesia
            </address>
          </div>
        </div>
      </div>
      
      {/* Copyright with slide-up animation */}
      <div className={`copyright-section border-t border-cream bg-cream transition-all duration-1000 delay-1100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-black text-sm hover:scale-105 transition-transform duration-300">
            © 2025. Made in Bandung by Hilman Nur Firdaus
          </p>
        </div>
      </div>
    </footer>
  );
}

// Make available globally for Babel CDN
window.Footer = Footer;
