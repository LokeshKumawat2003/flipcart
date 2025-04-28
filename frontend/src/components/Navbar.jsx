"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { 
  Search, ShoppingCart, User, Heart, ChevronDown, Menu, X, 
  Package, Gift, LogOut, Bell, HelpCircle, Home, Smartphone, 
  Zap, Mic, TrendingUp, ShoppingBag, Truck, Sun, Moon, Headphones,
  Tv, ShoppingBasket, Sparkles, Plane
} from "lucide-react"

const Navbar = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const { currentUser, logout } = useAuth()
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  const categoryTimeoutRef = useRef(null)
  const navRef = useRef(null)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const searchTimeoutRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Check if mobile view
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Reset search expanded state when switching to desktop view
      if (!isMobile && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };
    
    // Initial check
    checkMobileView();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, [isSearchExpanded]);

  // Handle click outside to close expanded search
  useEffect(() => {
    if (!isMobileView) return;
    
    const handleClickOutside = (event) => {
      if (isSearchExpanded && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileView, isSearchExpanded]);

  // Handle scroll event to show/hide elements with debouncing for better performance
  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        window.cancelAnimationFrame(scrollTimeoutRef.current);
      }
      
      // Use requestAnimationFrame for smooth scrolling
      scrollTimeoutRef.current = window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 60) {
          if (!isScrolled) {
            setIsScrolled(true);
            
            // Close expanded search on scroll
            if (isSearchExpanded) {
              setIsSearchExpanded(false);
            }
          }
        } else {
          if (isScrolled) {
            setIsScrolled(false);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [isScrolled, isSearchExpanded]);

  // Toggle search expansion for mobile view
  const toggleSearchExpansion = (e) => {
    if (isMobileView) {
      e.stopPropagation();
      setIsSearchExpanded(!isSearchExpanded);
      
      // Focus the input when expanded
      if (!isSearchExpanded && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current.focus();
        }, 100);
      }
    }
  };

  // console.log(currentUser)

  // Sample trending searches
  const trendingSearches = [
    "Smartphones",
    "Laptops",
    "Headphones",
    "Smart watches",
    "Gaming consoles"
  ]

  // Recent search history sample
  const recentSearches = [
    "Wireless earbuds",
    "OLED TVs",
    "Fitness trackers",
    "Gaming laptops",
  ]

  // Extract search query from URL on initial load and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    } else if (location.pathname !== '/products') {
      // Clear search query when not on products page and no search param
      setSearchQuery("");
    }
  }, [location.search, location.pathname]);

  // Direct navigation to products page with search query
  const navigateToSearch = useCallback((query) => {
    if (!query || !query.trim()) {
      return; // Prevent empty searches
    }
    
    // Ensure we're navigating to a new URL even if just the query changes
    const searchUrl = `/products?search=${encodeURIComponent(query.trim())}`;
    
    // Check if we're already on the products page
    const isProductsPage = location.pathname === '/products';
    const currentParams = new URLSearchParams(location.search);
    const currentSearch = currentParams.get('search');
    
    // If we're already on the products page with the same search, force a refresh
    if (isProductsPage && currentSearch !== query.trim()) {
      // Navigate with replace to avoid adding to history stack
      navigate(searchUrl);
    } else {
      // Normal navigation for different routes or first search
      navigate(searchUrl);
    }
    
    // Close any open UI elements
    setShowSearchSuggestions(false);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [navigate, isMenuOpen, location]);

  // Check if current page is a search results or filter page
  const isSearchOrFilterPage = () => {
    // Check if we're on the products page with search or category parameters
    if (location.pathname === '/products') {
      const params = new URLSearchParams(location.search);
      return params.has('search') || params.has('category') || params.has('subcategory') || params.has('filter');
    }
    return false;
  };

  // Debounced search function for input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set a new timeout for showing search suggestions
    if (e.target.value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        setShowSearchSuggestions(true);
      }, 200);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigateToSearch(searchQuery);
    // Close search suggestions after submitting
    setShowSearchSuggestions(false);
  };

  const handleSearchFocus = () => {
    // Only show suggestions if there's a query
    if (searchQuery.trim()) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = (e) => {
    // Check if the related target is inside the search suggestions
    if (e?.relatedTarget && searchRef.current?.contains(e.relatedTarget)) {
      return; // Don't hide suggestions if clicking inside them
    }
    
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setShowSearchSuggestions(false);
      }
    }, 300); // Increased timeout to give more time for interaction
  };

  // Focus the search input
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      if (searchQuery.trim()) {
        setShowSearchSuggestions(true);
      }
    }
  };

  const handleTrendingSearchClick = (term) => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setSearchQuery(term);
    navigateToSearch(term);
  };

  // Handle clicks inside the suggestions container
  const handleSuggestionContainerClick = (e) => {
    // Prevent event from bubbling up and triggering blur
    e.stopPropagation();
    
    // Keep focus on the input to prevent suggestions from disappearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchKeyDown = (e) => {
    // Submit search on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigateToSearch(searchQuery);
      }
    }
  };

  const toggleVoiceSearch = () => {
    setIsVoiceSearchActive(!isVoiceSearchActive);
    // In a real app, this would trigger voice recognition
    if (!isVoiceSearchActive) {
      setTimeout(() => {
        setIsVoiceSearchActive(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Would implement actual dark mode toggle with CSS/context in a real app
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
        setActiveCategory(null)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      if (categoryTimeoutRef.current) {
        clearTimeout(categoryTimeoutRef.current)
      }
    }
  }, [])

  const handleCategoryMouseEnter = (category) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  const handleMegaMenuMouseEnter = () => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  const categories = [
    {
      name: "Electronics & Gadgets",
      icon: <Zap size={16} className="mr-1.5" />,
      url: "/products?category=electronics-gadgets",
      subcategories: [
        {
          title: "Latest Tech",
          items: ["Smart Home", "VR Headsets", "Drones", "Gaming Consoles", "Wearable Tech"],
        },
        {
          title: "Computer Peripherals",
          items: ["Mechanical Keyboards", "Gaming Mice", "Monitors", "Webcams", "External Storage"],
        },
        {
          title: "Photography",
          items: ["DSLR Cameras", "Mirrorless Cameras", "Action Cameras", "Camera Lenses", "Tripods"],
        },
      ],
    },
    {
      name: "Electronics",
      icon: <Smartphone size={16} className="mr-1.5" />,
      url: "/products?category=electronics",
      subcategories: [
        {
          title: "Mobiles & Tablets",
          items: ["Smartphones", "iPhones", "5G Phones", "Android Phones", "Tablets", "iPad"],
        },
        {
          title: "Laptops & Computers",
          items: ["Gaming Laptops", "Thin & Light", "2-in-1 Laptops", "Desktop PCs", "Computer Accessories"],
        },
        {
          title: "Audio & Wearables",
          items: ["TWS Earbuds", "Smartwatches", "Bluetooth Speakers", "Headphones", "Fitness Bands"],
        },
      ],
    },
    {
      name: "TVs & Appliances",
      icon: <Tv size={16} className="mr-1.5" />,
      url: "/products?category=appliances",
      subcategories: [
        {
          title: "Televisions",
          items: ["Smart TVs", "OLED TVs", "4K TVs", "55+ Inch TVs", "Budget TVs", "Soundbars"],
        },
        {
          title: "Home Appliances",
          items: ["Washing Machines", "Refrigerators", "Air Conditioners", "Air Purifiers", "Dishwashers"],
        },
        {
          title: "Kitchen Appliances",
          items: ["Microwaves", "Air Fryers", "Mixers & Grinders", "Coffee Makers", "Induction Cooktops"],
        },
      ],
    },
    {
      name: "Fashion",
      icon: <ShoppingBag size={16} className="mr-1.5" />,
      url: "/products?category=fashion",
      subcategories: [
        {
          title: "Men's Fashion",
          items: ["T-shirts & Polos", "Shirts", "Jeans & Trousers", "Activewear", "Ethnic Wear"],
        },
        {
          title: "Women's Fashion",
          items: ["Dresses", "Tops & Tees", "Sarees & Kurtas", "Western Wear", "Bags & Footwear"],
        },
        {
          title: "Kids & Baby",
          items: ["Kids Clothing", "Baby Essentials", "School Supplies", "Kids Footwear", "Toys"],
        },
      ],
    },
    {
      name: "Grocery",
      icon: <ShoppingBasket size={16} className="mr-1.5" />,
      url: "/products?category=grocery",
      subcategories: [
        {
          title: "Daily Essentials",
          items: ["Fruits & Vegetables", "Dairy & Eggs", "Bread & Breakfast", "Snacks", "Beverages"],
        },
        {
          title: "Kitchen Staples",
          items: ["Atta & Rice", "Oils & Ghee", "Spices & Masalas", "Dry Fruits", "Cleaning Essentials"],
        },
        {
          title: "Packaged Food",
          items: ["Instant Food", "Ready to Eat", "Chocolates & Sweets", "Frozen Food", "Health Food"],
        },
      ],
    },
    {
      name: "Mobiles",
      icon: <Smartphone size={16} className="mr-1.5" />,
      url: "/products?category=mobiles",
      subcategories: [
        {
          title: "Popular Brands",
          items: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Nothing"],
        },
        {
          title: "Price Range",
          items: ["Under ₹10,000", "₹10,000-₹20,000", "₹20,000-₹30,000", "Premium (₹30,000+)"],
        },
        {
          title: "Accessories",
          items: ["Cases & Covers", "Screen Protectors", "Fast Chargers", "Power Banks", "Wireless Earbuds"],
        },
      ],
    },
    {
      name: "Beauty",
      icon: <Sparkles size={16} className="mr-1.5" />,
      url: "/products?category=beauty",
      subcategories: [
        {
          title: "Makeup",
          items: ["Lipstick & Lip Care", "Face Makeup", "Eye Makeup", "Makeup Kits", "Nail Polish"],
        },
        {
          title: "Skincare",
          items: ["Moisturizers", "Cleansers", "Serums", "Sunscreen", "Korean Skincare"],
        },
        {
          title: "Hair Care",
          items: ["Shampoo & Conditioner", "Hair Oil", "Hair Styling", "Hair Color", "Hair Appliances"],
        },
      ],
    },
    {
      name: "Home & Furniture",
      icon: <Home size={16} className="mr-1.5" />,
      url: "/products?category=home",
      subcategories: [
        {
          title: "Living Room",
          items: ["Sofas", "Recliners", "TV Units", "Coffee Tables", "Wall Decor"],
        },
        {
          title: "Bedroom & Dining",
          items: ["Beds", "Mattresses", "Wardrobes", "Dining Sets", "Bedsheets & Pillows"],
        },
        {
          title: "Kitchen & Dining",
          items: ["Cookware", "Dinnerware", "Kitchen Storage", "Serveware", "Bakeware"],
        },
      ],
    },
    {
      name: "Travel",
      icon: <Plane size={16} className="mr-1.5" />,
      url: "/products?category=travel",
      subcategories: [
        {
          title: "Luggage",
          items: ["Trolley Bags", "Backpacks", "Duffel Bags", "Laptop Bags", "Travel Accessories"],
        },
        {
          title: "Travel Essentials",
          items: ["Travel Pillows", "Organizers", "Passport Holders", "Luggage Tags", "Travel Adapters"],
        },
        {
          title: "Experience",
          items: ["Flight Bookings", "Hotel Bookings", "Holiday Packages", "Bus Tickets", "Activities"],
        },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Main Navbar - Search stays visible when scrolled */}
      <div 
        className={`bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-lg transition-all duration-300 ${
          isScrolled ? 'py-1' : 'py-2 sm:py-3'
        }`} 
        ref={navRef}
      >
        <div className="container mx-auto px-2 sm:px-4 max-w-[1400px]">
          <div className="flex items-center justify-between">
            {/* Logo and Menu - Hidden when scrolled */}
            <div 
              className={`flex-shrink-0 mr-3 transition-opacity transition-transform duration-300 ${
                (isMobileView && isScrolled) ? 'opacity-0 invisible h-0 absolute' : 'opacity-100 visible flex'
              }`}
            >
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white focus:outline-none flex-shrink-0 hover:bg-white/10 p-1.5 rounded-full transition-all mr-2"
                onClick={() => {
                  onToggleSidebar();
                  setIsMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo with Plus */}
              <div className="flex flex-col mr-1 xs:mr-2 sm:mr-4 flex-shrink-0">
                <Link to="/" className="flex-shrink-0 inline-block">
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                    alt="Flipkart"
                    className="h-5 xs:h-6 sm:h-7 filter drop-shadow-sm"
                  />
                </Link>
                <Link to="/" className="flex items-center text-[8px] xs:text-[10px] sm:text-[11px] italic text-white">
                  <span>Explore</span>
                  <span className="text-[#ffe500] font-medium ml-0.5">Plus</span>
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                    alt="Plus"
                    className="h-2 xs:h-2.5 sm:h-3 ml-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Search Bar - Collapsible on mobile, always visible on desktop */}
            <div 
              className={`flex-1 transition-all duration-300 ${
                isScrolled ? 'max-w-full' : 'max-w-2xl'
              }`} 
              ref={searchRef}
            >
              {/* Mobile Search Icon (Only visible on mobile when search is not expanded) */}
              {isMobileView && !isSearchExpanded ? (
                <button
                  onClick={toggleSearchExpansion}
                  className="p-2 bg-white rounded-full shadow-md focus:outline-none"
                  aria-label="Show search"
                >
                  <Search size={20} className="text-[#2563eb]" />
                </button>
              ) : (
                <form onSubmit={handleSearch} className="relative" onClick={focusSearchInput}>
                  <div className={`flex items-center bg-white rounded-lg overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-blue-300 transition-all ${
                    isMobileView && isSearchExpanded ? 'animate-expandSearch' : ''
                  }`}>
                    {/* Back button when search is expanded on mobile */}
                    {isMobileView && isSearchExpanded && (
                      <button
                        type="button"
                        onClick={toggleSearchExpansion}
                        className="h-full px-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Back"
                      >
                        <ChevronDown size={18} className="rotate-90" />
                      </button>
                    )}
                    
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products"
                      className="w-full py-1.5 xs:py-2 sm:py-2.5 px-2 xs:px-3 sm:px-4 text-gray-800 focus:outline-none text-xs xs:text-sm sm:text-base"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      onKeyDown={handleSearchKeyDown}
                      autoComplete="off"
                      aria-label="Search for products, brands and more"
                      spellCheck="false"
                    />
                    
                    {/* Clear search button - show when there's input */}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          if (searchInputRef.current) {
                            searchInputRef.current.focus();
                          }
                        }}
                        className="h-full px-1 sm:px-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X size={14} className="sm:w-[16px] sm:h-[16px]" />
                      </button>
                    )}
                    
                    {/* Voice Search Button - Hidden on smallest screens */}
                    <button
                      type="button"
                      onClick={toggleVoiceSearch}
                      className={`h-full px-1 sm:px-2 hidden xs:flex items-center justify-center transition-colors cursor-pointer ${
                        isVoiceSearchActive ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      aria-label="Voice search"
                    >
                      <Mic size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    
                    <button
                      type="submit"
                      aria-label="Search"
                      className="h-full px-2 sm:px-3 md:px-4 bg-[#2563eb] text-white flex items-center justify-center hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                    >
                      <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>

                  {/* Enhanced Search Suggestions */}
                  {showSearchSuggestions && (
                    <div 
                      className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-xl border border-gray-200 z-20 overflow-hidden max-h-[80vh] overflow-y-auto"
                      onClick={handleSuggestionContainerClick}
                    >
                      <div className="p-2 sm:p-3">
                        {recentSearches.length > 0 && (
                          <div className="mb-3 sm:mb-4">
                            <div className="flex justify-between items-center mb-1 sm:mb-2">
                              <h4 className="text-xs font-medium text-gray-500">Recent Searches</h4>
                              <button className="text-[10px] sm:text-xs text-blue-500 hover:text-blue-700">Clear All</button>
                            </div>
                            <ul className="space-y-1 sm:space-y-1.5">
                              {recentSearches.map((term, index) => (
                                <li key={`recent-${index}`}>
                                  <button
                                    type="button"
                                    className="flex w-full items-center text-[10px] xs:text-xs sm:text-sm text-gray-700 hover:bg-gray-50 p-1.5 sm:p-2 rounded-md text-left transition-colors"
                                    onClick={() => handleTrendingSearchClick(term)}
                                    onMouseDown={(e) => e.preventDefault()}
                                  >
                                    <TrendingUp size={12} className="mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
                                    {term}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <h4 className="text-xs font-medium text-gray-500 mb-1 sm:mb-2">Trending Searches</h4>
                        <ul className="space-y-1 sm:space-y-1.5">
                          {trendingSearches.map((term, index) => (
                            <li key={`trending-${index}`}>
                              <button
                                type="button"
                                className="flex w-full items-center text-[10px] xs:text-xs sm:text-sm text-gray-700 hover:bg-gray-50 p-1.5 sm:p-2 rounded-md text-left transition-colors"
                                onClick={() => handleTrendingSearchClick(term)}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                <Search size={12} className="mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" />
                                {term}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Right Side Navigation - Hidden when scrolled or when search is expanded on mobile */}
            <div 
              className={`flex items-center gap-0.5 xs:gap-1 sm:gap-2 md:gap-4 ml-1 sm:ml-4 transition-opacity transition-transform duration-300 ${
                (isMobileView && isScrolled) || (isMobileView && isSearchExpanded) ? 'opacity-0 invisible absolute' : 'opacity-100 visible flex'
              }`}
            >
              {/* Become a Seller */}
              <Link 
                to="/seller" 
                className="hidden md:flex items-center text-white hover:text-white/90 whitespace-nowrap font-medium text-sm transition-colors hover:bg-white/10 px-3 py-1.5 rounded-full"
              >
                <ShoppingBag size={16} className="mr-1.5 hidden sm:block" />
                <span>Become a Seller</span>
              </Link>

              {/* User Menu - Modernized */}
              <div className="relative">
                <button
                  className="flex items-center hover:bg-white/10 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsUserMenuOpen(!isUserMenuOpen)
                  }}
                  aria-expanded={isUserMenuOpen}
                  aria-label="User menu"
                >
                  <User size={14} className="mr-1 sm:mr-1.5 hidden xs:block" />
                  <span className="text-xs sm:text-sm font-medium">{currentUser ? currentUser.name.split(" ")[0] : "Login"}</span>
                  <ChevronDown size={12} className={`ml-0.5 sm:ml-1 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu - Modernized */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-xl z-50 text-gray-800 border border-gray-200 animate-fadeIn overflow-hidden">
                    {!currentUser ? (
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h3 className="text-sm font-medium text-gray-800">New Customer?</h3>
                          <Link
                            to="/register"
                            className="text-[#2563eb] hover:underline text-xs sm:text-sm"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                        <hr className="my-2" />
                        <ul className="text-gray-700">
                          <li>
                            <Link
                              to="/login"
                              className="flex items-center py-2 sm:py-2.5 px-2 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User size={14} className="mr-2 sm:mr-3 flex-shrink-0 text-[#2563eb]" />
                              <span className="text-xs sm:text-sm">Login</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/support"
                              className="flex items-center py-2 sm:py-2.5 px-2 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <HelpCircle size={14} className="mr-2 sm:mr-3 flex-shrink-0 text-[#2563eb]" />
                              <span className="text-xs sm:text-sm">Customer Support</span>
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={toggleDarkMode}
                              className="flex w-full items-center py-2 sm:py-2.5 px-2 hover:bg-gray-50 rounded-md text-left transition-colors"
                            >
                              {isDarkMode ? 
                                <Sun size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" /> : 
                                <Moon size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              }
                              <span className="text-xs sm:text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="py-2">
                        <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium mr-2 sm:mr-3 flex-shrink-0">
                            {currentUser.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-800 font-medium">{currentUser.name}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[160px] sm:max-w-[200px]">{currentUser.email}</p>
                          </div>
                        </div>
                        <hr className="my-1.5" />
                        <ul className="text-gray-700">
                          <li>
                            <Link
                              to="/orders"
                              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Package size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              <span className="text-xs sm:text-sm">My Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/profile"
                              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              <span className="text-xs sm:text-sm">My Profile</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/wishlist"
                              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Heart size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              <span className="text-xs sm:text-sm">Wishlist</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/notifications"
                              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Bell size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              <span className="text-xs sm:text-sm">Notifications</span>
                              <span className="ml-auto bg-red-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">3</span>
                            </Link>
                          </li>
                          {currentUser.role === "admin" && (
                            <li>
                              <Link
                                to="/admin"
                                className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <User size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                                <span className="text-xs sm:text-sm">Admin Dashboard</span>
                              </Link>
                            </li>
                          )}
                          <hr className="my-1.5" />
                          <li>
                            <button
                              onClick={toggleDarkMode}
                              className="flex w-full items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 text-left transition-colors"
                            >
                              {isDarkMode ? 
                                <Sun size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" /> : 
                                <Moon size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              }
                              <span className="text-xs sm:text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 text-left transition-colors"
                            >
                              <LogOut size={14} className="mr-2 sm:mr-3 text-[#2563eb] flex-shrink-0" />
                              <span className="text-xs sm:text-sm">Logout</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cart with Counter - Modern Look */}
              <Link to="/cart" className="flex items-center hover:bg-white/10 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full transition-colors">
                <div className="relative">
                  <ShoppingCart size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#ff6161] text-white text-[8px] sm:text-[10px] font-bold rounded-full min-w-3 h-3 sm:min-w-4 sm:h-4 flex items-center justify-center px-0.5 sm:px-1">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium">Cart</span>
              </Link>

              {/* Wishlist with Counter (Tablet+ Only) */}
              <Link to="/wishlist" className="hidden sm:flex items-center hover:bg-white/10 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full transition-colors">
                <div className="relative">
                  <Heart size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#ff6161] text-white text-[8px] sm:text-[10px] font-bold rounded-full min-w-3 h-3 sm:min-w-4 sm:h-4 flex items-center justify-center px-0.5 sm:px-1">
                      {wishlistItems > 9 ? '9+' : wishlistItems}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium">Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Categories Navigation - Responsive for all screens, hidden when scrolled or when search is expanded on mobile */}
      <div 
        className={`bg-white shadow-sm overflow-hidden transition-all duration-300 ${
          (isMobileView && isScrolled) || (isMobileView && isSearchExpanded)
            ? 'max-h-0 opacity-0 pointer-events-none' 
            : 'max-h-14 opacity-100'
        }`}
        style={{ 
          transform: (isMobileView && isScrolled) || (isMobileView && isSearchExpanded) ? 'translateY(-100%)' : 'translateY(0)',
          transitionProperty: 'max-height, opacity, transform',
        }}
      >
        <div className="container mx-auto px-2 sm:px-4 max-w-[1400px] overflow-x-auto">
          <div className="flex items-center whitespace-nowrap py-1.5">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => handleCategoryMouseEnter(category)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="block px-2 xs:px-3 py-2 text-xs sm:text-sm font-medium text-gray-800 hover:text-[#2563eb] transition-colors flex items-center"
                  onClick={(e) => {
                    e.preventDefault(); // Always prevent default to use navigate
                    // Force a new navigation to ensure params update
                    navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}`, { replace: true });
                    // Close any open menus when navigating
                    setActiveCategory(null);
                  }}
                >
                  {category.icon}
                  <span className="ml-1">{category.name}</span>
                  {category.subcategories && (
                    <ChevronDown size={14} className={`hidden sm:inline-block ml-1 transition-transform duration-200 ${activeCategory === category ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Mega Menu - Hidden when scrolled and only visible on larger screens */}
                {!isMobileView && activeCategory === category && category.subcategories && (
                  <div
                    className="absolute left-0 mt-0 w-[900px] bg-white rounded-lg shadow-xl z-40 p-6 border border-gray-200 border-t-0 animate-fadeIn"
                    onMouseEnter={handleMegaMenuMouseEnter}
                    onMouseLeave={handleMegaMenuMouseLeave}
                  >
                    <div className="grid grid-cols-3 gap-10">
                      {category.subcategories.map((subcat, index) => (
                        <div key={index} className="space-y-4">
                          <h4 className="text-sm font-medium text-[#2563eb] pb-2 border-b border-gray-100">{subcat.title}</h4>
                          <ul className="space-y-2.5">
                            {subcat.items.map((item, idx) => (
                              <li key={idx}>
                                <Link
                                  to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(
                                    item.toLowerCase()
                                  )}`}
                                  className="block text-sm text-gray-600 hover:text-[#2563eb] transition-colors hover:translate-x-0.5 transform duration-150 flex items-center group"
                                  onClick={(e) => {
                                    e.preventDefault(); // Always prevent default
                                    // Force navigation to update params
                                    navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(
                                      item.toLowerCase()
                                    )}`, { replace: true });
                                    // Close the mega menu
                                    setActiveCategory(null);
                                  }}
                                >
                                  <span className="w-1 h-1 bg-gray-300 rounded-full mr-2 group-hover:bg-[#2563eb] group-hover:w-1.5 transition-all duration-200"></span>
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link 
                            to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(subcat.title.toLowerCase())}`}
                            className="text-xs text-[#2563eb] hover:underline mt-2 inline-block" 
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(subcat.title.toLowerCase())}`, { replace: true });
                              setActiveCategory(null);
                            }}
                          >
                            View all {subcat.title} →
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <Link 
                        to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                        className="text-[#2563eb] text-sm font-medium hover:underline" 
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}`, { replace: true });
                          setActiveCategory(null);
                        }}
                      >
                        Explore All {category.name}
                      </Link>
                      <span className="text-xs text-gray-400">Top Trending Products</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
