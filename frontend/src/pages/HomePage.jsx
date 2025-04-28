"use client"

import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  TrendingUp,
  Gift,
  Percent,
  Star,
  Search,
  ShoppingBag,
  Heart,
  Zap,
  Sparkles,
  Layers,
  ShoppingCart,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  Bell,
  MessageCircle,
  Rocket,
  LayoutGrid,
  Globe,
  Sun
} from "lucide-react"
import { productService, categoryService } from "../services/apiService"

const HomePage = ({ components = [], featuredProducts: propFeaturedProducts = [], settings = {} } = {}) => {
  // Safety utility function to prevent rendering objects directly
  const safeRender = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      // If it looks like a review object
      if (value.title && value.content && value.author) {
        return value.title; // Just render the title
      }
      // For any other object, convert to string but limit the length
      return JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '');
    }
    return value;
  };

  // Add refs for timer and search
  const timerRef = useRef(null);
  const searchRef = useRef(null);

  const [featuredProducts, setFeaturedProducts] = useState(propFeaturedProducts || [])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [dealsOfTheDay, setDealsOfTheDay] = useState([]) 
  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [trendingSearches, setTrendingSearches] = useState([
    "Smartphones",
    "Laptops",
    "Headphones",
    "Sneakers",
    "Smart Watches",
  ])
  // Apply settings from props
  const {
    layout = "standard",
    productsPerRow = "4",
    showBannerCarousel = true,
    showFeaturedCategories = true
  } = settings;

  const navigate = useNavigate()
  const location = useLocation()

  // Update featuredProducts when propFeaturedProducts changes
  useEffect(() => {
    if (propFeaturedProducts && propFeaturedProducts.length > 0) {
      setFeaturedProducts(propFeaturedProducts);
    }
  }, [propFeaturedProducts]);

  const banners = [
    {
      id: 1,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20",
      alt: "Big Savings Days Sale",
      url: "/products?sale=true",
    },
    {
      id: 2,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
      alt: "New Season Collection",
      url: "/products?new=true",
    },
    {
      id: 3,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/aa1b2bdcf519b468.jpg?q=20",
      alt: "Electronics Sale",
      url: "/products?category=electronics",
    },
    {
      id: 4,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20",
      alt: "Fashion Sale",
      url: "/products?category=fashion",
    },
  ]

  // Category showcase with modern icons and enhanced experience
  const categoryShowcase = [
    {
      id: 1,
      name: "Electronics",
      icon: <Zap className="w-6 h-6 mb-2 text-indigo-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      url: "/products?category=electronics",
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
    },
    {
      id: 2,
      name: "Fashion",
      icon: <Layers className="w-6 h-6 mb-2 text-purple-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100",
      url: "/products?category=fashion",
      color: "bg-gradient-to-br from-purple-50 to-pink-100",
    },
    {
      id: 3,
      name: "Home",
      icon: <LayoutGrid className="w-6 h-6 mb-2 text-amber-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
      url: "/products?category=home",
      color: "bg-gradient-to-br from-amber-50 to-yellow-100",
    },
    {
      id: 4,
      name: "Beauty",
      icon: <Sparkles className="w-6 h-6 mb-2 text-rose-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
      url: "/products?category=beauty",
      color: "bg-gradient-to-br from-rose-50 to-red-100",
    },
    {
      id: 5,
      name: "Toys",
      icon: <PlusCircle className="w-6 h-6 mb-2 text-emerald-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      url: "/products?category=toys",
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
    },
    {
      id: 6,
      name: "Travel",
      icon: <Globe className="w-6 h-6 mb-2 text-sky-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
      url: "/products?category=travel",
      color: "bg-gradient-to-br from-sky-50 to-cyan-100",
    },
    {
      id: 7,
      name: "Grocery",
      icon: <ShoppingCart className="w-6 h-6 mb-2 text-lime-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
      url: "/products?category=grocery",
      color: "bg-gradient-to-br from-lime-50 to-green-100",
    },
    {
      id: 8,
      name: "Gaming",
      icon: <Rocket className="w-6 h-6 mb-2 text-red-600" />,
      image: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
      url: "/products?category=gaming",
      color: "bg-gradient-to-br from-red-50 to-orange-100",
    },
  ]

  // Immersive seasonal collections with rich media
  const seasonalCollections = [
    {
      id: 1,
      title: "Summer Essentials",
      image: "https://placehold.co/400x250/ffffff/000000?text=Summer+Collection",
      description: "Beat the heat with our curated summer collection",
      url: "/products?collection=summer",
      theme: "bg-gradient-to-r from-amber-500 to-yellow-300",
      icon: <Sun className="w-6 h-6 text-amber-100" />,
    },
    {
      id: 2,
      title: "Monsoon Ready",
      image: "https://placehold.co/400x250/ffffff/000000?text=Monsoon+Collection",
      description: "Stay dry and stylish this rainy season",
      url: "/products?collection=monsoon",
      theme: "bg-gradient-to-r from-blue-500 to-cyan-300",
      icon: <RefreshCw className="w-6 h-6 text-blue-100" />,
    },
    {
      id: 3,
      title: "Work From Home",
      image: "https://placehold.co/400x250/ffffff/000000?text=WFH+Collection",
      description: "Comfort meets productivity in our WFH collection",
      url: "/products?collection=wfh",
      theme: "bg-gradient-to-r from-indigo-500 to-purple-300",
      icon: <MessageCircle className="w-6 h-6 text-indigo-100" />,
    },
  ]
  
  // Personalized recommendations sections config
  const personalizedRecommendationsConfig = [
    {
      id: 201,
      name: "Based on Your Browsing",
      theme: "bg-gradient-to-r from-purple-50 to-indigo-50 border border-indigo-100",
      icon: <Bell className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 202,
      name: "New For You",
      theme: "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    }
  ]

  // Category to deal mapping for the Deals of the Day section
  const categoryDeals = {
    electronics: {
      name: "Best of Electronics",
      image: "https://rukminim1.flixcart.com/image/200/200/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      discount: "Up to 80% Off",
      brand: "Canon, Sony, Fujifilm",
      url: "/products?category=electronics",
    },
    appliances: {
      name: "Best of Home Appliances",
      image: "https://rukminim1.flixcart.com/image/200/200/xif0q/refrigerator-new/h/a/k/-original-imaggsgpbfpwwgt7.jpeg?q=70",
      discount: "Up to 65% Off",
      brand: "Samsung, LG, Whirlpool",
      url: "/products?category=appliances",
    },
    fashion: {
      name: "Fashion Top Deals",
      image: "https://rukminim1.flixcart.com/image/200/200/l3rmzrk0/shoe/u/b/u/-original-imagetgzg8crupfk.jpeg?q=70",
      discount: "Min 50% Off",
      brand: "Nike, Adidas, Puma",
      url: "/products?category=fashion",
    },
    furniture: {
      name: "Top Deals on Furniture",
      image: "https://rukminim1.flixcart.com/image/200/200/jlph9jk0/cycle/h/f/k/skyper-26t-sskp26bk0001-16-hero-original-imaf8ru5xysfgtmx.jpeg?q=70",
      discount: "From ₹1,999",
      brand: "Modern, Vintage, Classic",
      url: "/products?category=furniture",
    },
    toys: {
      name: "Best of Toys",
      image: "https://rukminim1.flixcart.com/image/200/200/kzfvzww0/stuffed-toy/t/w/m/cute-nylex-mother-teddy-with-2-babies-40-fluffies-original-imagbgc6zcgfh3xz.jpeg?q=70",
      discount: "Up to 70% Off",
      brand: "Disney, Barbie, Lego",
      url: "/products?category=toys",
    },
    mobiles: {
      name: "Premium Mobiles",
      image: "https://rukminim1.flixcart.com/image/200/200/ks0onm80/monitor/w/6/6/ha270-um-hw0si-a01-acer-original-imag5zjnk4yad4uz.jpeg?q=70",
      discount: "Up to ₹20,000 Off",
      brand: "Apple, Samsung, Google",
      url: "/products?category=mobiles",
    },
    beauty: {
      name: "Best of Beauty",
      image: "https://rukminim1.flixcart.com/image/200/200/kx50gi80/pen/h/z/k/119766-flair-original-imag9nzubznagufg.jpeg?q=70",
      discount: "From ₹99",
      brand: "Lakme, Maybelline, MAC",
      url: "/products?category=beauty",
    },
  }

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!propFeaturedProducts.length) {
        setLoading(true)
        try {
          const [featuredResponse, newArrivalsResponse, categoriesResponse] = await Promise.all([
            productService.getProducts({ featured: true, limit: 8 }),
            productService.getProducts({ sort: "newest", limit: 8 }),
            categoryService.getCategories(),
          ])

          setFeaturedProducts(featuredResponse.data.data || [])
          setNewArrivals(newArrivalsResponse.data.data || [])
          setCategories(categoriesResponse.data.data || [])
          setLoading(false)
        } catch (error) {
          console.error("Error fetching home data:", error)
          setLoading(false)
        }
      }
    }

    fetchHomeData()
  }, [propFeaturedProducts.length])

  useEffect(() => {
    // Auto-rotate banners
    timerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timerRef.current)
  }, [banners.length])

  useEffect(() => {
    // Close search results when clicking outside
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))
  }

  const handleSearchFocus = () => {
    setShowSearchResults(true)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 0) {
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchResults(false)
    }
  }

  const handleTrendingSearchClick = (term) => {
    navigate(`/products?search=${encodeURIComponent(term)}`)
    setShowSearchResults(false)
  }

  const handleSearchBlur = (e) => {
    // Delay hiding results to allow clicks on results
    setTimeout(() => {
      if (!searchRef.current.contains(document.activeElement)) {
        setShowSearchResults(false)
      }
    }, 200)
  }

  // Calculate discount prices
  const calculateDiscountPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100)
  }

  // Function to render components based on their type and order
  const renderComponent = (component) => {
    switch (component.type) {
      case 'banner':
        return (
          <div key={component.id} className="mb-6">
            {showBannerCarousel && (
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={banners[currentBannerIndex].image} 
                    alt={banners[currentBannerIndex].alt} 
                    className="w-full object-cover h-auto" 
                  />
                </div>
                <button 
                  onClick={prevBanner} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextBanner} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        );
      
      case 'categories':
        return (
          <div key={component.id} className="mb-6">
            {showFeaturedCategories && (
              <div>
                <h2 className="text-xl font-medium mb-4">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {categoryShowcase.map((category) => (
                    <Link 
                      key={category.id} 
                      to={category.url}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${category.color} hover:shadow-md text-center`}
                    >
                      {category.icon}
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-16 h-16 object-contain mb-2" 
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'featuredProducts':
        return (
          <div key={component.id} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Featured Products</h2>
              <Link to="/products" className="flex items-center text-blue-600 text-sm font-medium">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-${productsPerRow} gap-4`}>
              {(featuredProducts.length > 0 ? featuredProducts : newArrivals).slice(0, Number(productsPerRow)).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      
      case 'offers':
        return (
          <div key={component.id} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Special Offers</h2>
              <Link to="/offers" className="flex items-center text-blue-600 text-sm font-medium">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasonalCollections.map((collection) => (
                <Link 
                  key={collection.id} 
                  to={collection.url} 
                  className="group rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className={`${collection.theme} p-4 flex justify-between items-center`}>
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{collection.title}</h3>
                      <p className="text-sm opacity-90">{collection.description}</p>
                    </div>
                    {collection.icon}
                  </div>
                  <div className="p-2">
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-48 object-cover rounded" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div key={component.id} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">New Arrivals</h2>
              <Link to="/products?sort=newest" className="flex items-center text-blue-600 text-sm font-medium">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-${productsPerRow} gap-4`}>
              {newArrivals.slice(0, Number(productsPerRow)).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-blue-500 font-medium">Loading amazing deals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${layout === 'minimal' ? 'max-w-5xl' : ''}`}>
      {/* If we receive components from props, render those instead of the default layout */}
      {components && components.length > 0 ? (
        components.map(component => renderComponent(component))
      ) : (
        <>
          {/* Original code for the homepage */}
          {/* Banner Carousel */}
          <div className="relative mb-8">
            <div className="relative w-full overflow-hidden banner-slider">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    index === currentBannerIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Link to={banner.url}>
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
              ))}
              <button
                onClick={prevBanner}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-all z-10"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-all z-10"
                aria-label="Next banner"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
              </button>
              
              {/* Pagination indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === currentBannerIndex 
                        ? "bg-blue-500 w-4 sm:w-6" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Rest of the existing homepage sections */}
          {/* ... */}
        </>
      )}
    </div>
  )
}

export default HomePage
