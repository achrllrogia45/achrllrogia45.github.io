// Header Component - Reusable across pages
// Usage: <script src="header.js"></script> and use <Header /> in your React code


// Header Component - Reusable across pages
// Usage: <script src="header.js"></script> and use <Header /> in your React code

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // --- Breadcrumb Component ---
  function Breadcrumb() {
    const [textColor, setTextColor] = React.useState("text-cream");
    const breadcrumbRef = React.useRef(null);

    // Map pathname to page name
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    let pageName = "";
    if (path === "" || path === "index.html") {
      pageName = "HOME";
    } else if (path.includes("aboutus")) {
      pageName = "ABOUT US";
    } else if (path.includes("coolness")) {
      pageName = "COOLNESS";
    } else if (path.includes("location")) {
      pageName = "LOCATION";
    } else if (path.includes("catalogues")) {
      pageName = "CATALOGUES";
    } else {
      pageName = path.toUpperCase();
    }

    // Function to get luminance of a color
    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    // Function to detect background color
    function detectBackgroundColor() {
      if (!breadcrumbRef.current) return;
      
      const rect = breadcrumbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Get the element behind the breadcrumb
      breadcrumbRef.current.style.pointerEvents = 'none';
      const elementBehind = document.elementFromPoint(centerX, centerY);
      breadcrumbRef.current.style.pointerEvents = 'auto';
      
      if (elementBehind) {
        const computedStyle = window.getComputedStyle(elementBehind);
        const bgColor = computedStyle.backgroundColor;
        
        // Parse RGB values
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch.map(Number);
          const luminance = getLuminance(r, g, b);
          
          // If background is light (luminance > 0.5), use dark text
          // If background is dark (luminance <= 0.5), use light text
          if (luminance > 0.5) {
            setTextColor("text-black");
          } else {
            setTextColor("text-white");
          }
        } else {
          // Default to light text for gradient or complex backgrounds
          setTextColor("text-white");
        }
      }
    }

    React.useEffect(() => {
      detectBackgroundColor();
      
      // Re-detect on scroll and resize
      const handleChange = () => {
        setTimeout(detectBackgroundColor, 100);
      };
      
      window.addEventListener('scroll', handleChange);
      window.addEventListener('resize', handleChange);
      
      return () => {
        window.removeEventListener('scroll', handleChange);
        window.removeEventListener('resize', handleChange);
      };
    }, []);

    return (
      <div 
        ref={breadcrumbRef}
        className="fixed top-[115px] sm:top-[120px] md:top-[130px] text-lg font-thin w-full z-10 px-4 sm:px-8 md:px-[60px]"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-md sm:text-lg">
            <a
              href="/"
              className={`${textColor} hover:opacity-75 hover:underline transition-all mr-[10px]`}
            >
              HOME 
            </a>
            {pageName !== "HOME" && (
              <>
                <span className={`mx-2 ${textColor}`}>/</span>
                <span className={textColor}>{pageName}</span>
              </>
            )}
          </p>
        </div>
      </div>
    );
  }
  return (
    <header className="fixed text-white z-50 bg-gradient-to-b from-black/80 to-transparent w-full flex flex-col gap-5 font-roboto" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      <div className="flex items-center px-4 sm:px-8 md:px-[60px] py-4 w-full mx-auto h-[115px]">
        {/* Logo at left */}
        <div className="flex-shrink-0 flex items-center h-full">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/images/hg_logo_header_black.svg" alt="HumanGreatness Logo" className="h-8 sm:h-10 w-auto filter invert" />
          </a>
        </div>
        {/* Centered navigation */}
        <div className="flex-1 flex items-center justify-center h-full">
          <nav className="hidden lg:flex items-center gap-8 xl:gap-[152px]">
            <div className="w-px h-8 bg-white/30 mx-2"></div>
            <a href="location" className="relative text-cream hover:text-white transition-colors nav-link text-base lg:text-lg group">
              SHOP
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="aboutus" className="relative text-cream hover:text-white transition-colors nav-link text-base lg:text-lg group">
              ABOUT US
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="coolness" className="relative text-cream hover:text-white transition-colors nav-link text-base lg:text-lg group">
              COOLNESS
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
            </a>
            <div className="w-px h-8 bg-white/30 mx-2"></div>
          </nav>
        </div>
        {/* Mobile Header Right Group */}
        <div className="flex lg:hidden items-center gap-4 h-full">
          {/* Mobile Menu Button */}
          <button
            className="text-cream hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center py-8 space-y-6">
          <a href="location" className="relative text-cream hover:text-white transition-colors nav-link text-lg group">
            SHOP
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
          </a>
          <a href="aboutus" className="relative text-cream hover:text-white transition-colors nav-link text-lg group">
            ABOUT US
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
          </a>
          <a href="coolness" className="relative text-cream hover:text-white transition-colors nav-link text-lg group">
            COOLNESS
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
          </a>
        </nav>
      </div>
      {/* Breadcrumb below header */}
      <Breadcrumb />
    </header>
  );
}

// Make available globally for Babel CDN
window.Header = Header;
