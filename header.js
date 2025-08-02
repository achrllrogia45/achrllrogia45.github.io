// Header Component - Reusable across pages
// Usage: <script src="header.js"></script> and use <Header /> in your React code


// Header Component - Reusable across pages
// Usage: <script src="header.js"></script> and use <Header /> in your React code

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);
  return (
    <header className="fixed z-50 bg-gradient-to-b from-black/80 to-transparent w-full flex flex-col gap-5">
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-[60px] py-4 w-full mx-auto h-[115px]">
        {/* Logo */}
        <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src="images/hg_logo_header.svg" alt="HumanGreatness Logo" className="h-8 sm:h-10 w-auto" />
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-[152px]">
          <a href="location" className="text-cream hover:text-white transition-colors nav-link text-sm lg:text-base">SHOP</a>
          <a href="aboutus" className="text-cream hover:text-white transition-colors nav-link text-sm lg:text-base">ABOUT US</a>
          <a href="#" className="text-cream hover:text-white transition-colors nav-link text-sm lg:text-base">COOLNESS</a>
        </nav>
        {/* Language and Shop Icon - Desktop */}
        <div className="hidden lg:flex items-center gap-4 sm:gap-6 lg:gap-[45px]">
          <div className="flex items-center gap-[10px] text-sm lg:text-base">
            <a href="#" className="text-cream relative group px-1">
              <span className="inline-block group-hover:opacity-0 transition-opacity duration-300">EN</span>
              <span className="fi fi-gb absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></span>
            </a>
            <span className="text-cream mx-1">/</span>
            <a href="#" className="text-cream relative group px-1">
              <span className="inline-block group-hover:opacity-0 transition-opacity duration-300">IN</span>
              <span className="fi fi-id absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></span>
            </a>
          </div>
          <img src="images/shop_icon_header.svg" alt="Shop" className="h-5 sm:h-6 w-5 sm:w-6 invert hover:invert-0 transition-colors" />
        </div>
        {/* Mobile Header Right Group */}
        <div className="flex lg:hidden items-center gap-4">
          <div className="flex items-center gap-[6px] text-sm">
            <a href="#" className="text-cream relative group px-1">
              <span className="inline-block group-hover:opacity-0 transition-opacity duration-300">EN</span>
              <span className="fi fi-gb absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></span>
            </a>
            <span className="text-cream mx-1">/</span>
            <a href="#" className="text-cream relative group px-1">
              <span className="inline-block group-hover:opacity-0 transition-opacity duration-300">IN</span>
              <span className="fi fi-id absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></span>
            </a>
          </div>
          <img src="images/shop_icon_header.svg" alt="Shop" className="h-5 w-5 invert" />
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
          <a href="location" className="text-cream hover:text-white transition-colors nav-link text-lg">SHOP</a>
          <a href="aboutus" className="text-cream hover:text-white transition-colors nav-link text-lg">ABOUT US</a>
          <a href="#" className="text-cream hover:text-white transition-colors nav-link text-lg">COOLNESS</a>
        </nav>
      </div>
    </header>
  );
}

// Make available globally for Babel CDN
window.Header = Header;
