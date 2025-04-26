

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { Search, ShoppingCart, User, Heart, ChevronDown, Menu, X } from "lucide-react"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsUserMenuOpen(false)
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
      setIsCategoryMenuOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const categories = [
    { name: "Electronics", url: "/products?category=electronics" },
    { name: "Fashion", url: "/products?category=fashion" },
    { name: "Footwear", url: "/products?category=footwear" },
    { name: "Appliances", url: "/products?category=appliances" },
    { name: "Mobiles", url: "/products?category=mobiles" },
    { name: "Grocery", url: "/products?category=grocery" },
    { name: "Home", url: "/products?category=home" },
    { name: "Beauty", url: "/products?category=beauty" },
    { name: "Toys", url: "/products?category=toys" },
  ]

  return (
    <header className="bg-[#2874f0] text-white">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo and Search - Left Side */}
          <div className="flex items-center flex-1">
            {/* Mobile Menu Button */}
            <button
              className="mr-2 lg:hidden"
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="mr-4 flex-shrink-0">
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt="Flipkart"
                className="h-6"
              />
              <div className="flex items-center text-xs italic text-white">
                <span>Explore</span>
                <span className="text-[#ffe500] ml-0.5">Plus</span>
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                  alt="Plus"
                  className="h-3 ml-0.5"
                />
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full py-2 px-4 rounded-sm text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-[#2874f0] flex items-center justify-center"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4 ml-4">
            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center hover:bg-[#1a5dc8] px-2 py-1 rounded-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsUserMenuOpen(!isUserMenuOpen)
                }}
              >
                <User size={18} className="mr-1" />
                <span className="hidden sm:inline">{currentUser ? currentUser.name.split(" ")[0] : "Login"}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-1 w-60 bg-white rounded-sm shadow-lg z-50">
                  {!currentUser ? (
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-800 font-medium">New Customer?</h3>
                        <Link
                          to="/register"
                          className="text-[#2874f0] hover:underline text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                      <hr className="my-2" />
                      <ul className="text-gray-800">
                        <li>
                          <Link
                            to="/login"
                            className="block py-2 hover:text-[#2874f0]"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User size={16} className="inline mr-2" />
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2874f0] font-medium mr-2">
                          {currentUser.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">{currentUser.name}</p>
                          <p className="text-gray-500 text-xs">{currentUser.email}</p>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <ul className="text-gray-800">
                        {currentUser.role === "admin" && (
                          <li>
                            <Link
                              to="/admin"
                              className="block py-2 hover:text-[#2874f0]"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                        )}
                        {(currentUser.role === "manager" || currentUser.role === "admin") && (
                          <li>
                            <Link
                              to="/manager"
                              className="block py-2 hover:text-[#2874f0]"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Manager Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link
                            to="/wishlist"
                            className="block py-2 hover:text-[#2874f0]"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart size={16} className="inline mr-2" />
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-[#2874f0]">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="flex items-center hover:bg-[#1a5dc8] px-2 py-1 rounded-sm relative">
              <Heart size={18} className="mr-1" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6161] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="flex items-center hover:bg-[#1a5dc8] px-2 py-1 rounded-sm relative">
              <ShoppingCart size={18} className="mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6161] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded-sm text-gray-800 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 text-[#2874f0] flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-white text-gray-800 shadow-md hidden lg:block">
        <div className="container mx-auto">
          <ul className="flex justify-between items-center px-4">
            {categories.map((category, index) => (
              <li key={index} className="relative group py-2">
                <Link to={category.url} className="flex items-center hover:text-[#2874f0] px-2 py-1">
                  {category.name}
                  <ChevronDown size={14} className="ml-1" />
                </Link>
                {/* Mega Menu would go here */}
                <div className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-sm p-4 z-50 hidden group-hover:block">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Popular in {category.name}</h4>
                      <ul className="text-sm">
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&subcategory=popular1`}>Popular Item 1</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&subcategory=popular2`}>Popular Item 2</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&subcategory=popular3`}>Popular Item 3</Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Brands</h4>
                      <ul className="text-sm">
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&brand=brand1`}>Brand 1</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&brand=brand2`}>Brand 2</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&brand=brand3`}>Brand 3</Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <ul className="text-sm">
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&price=under1000`}>Under ₹1,000</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&price=1000-5000`}>₹1,000 - ₹5,000</Link>
                        </li>
                        <li className="py-1 hover:text-[#2874f0]">
                          <Link to={`${category.url}&price=over5000`}>Over ₹5,000</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-800 shadow-md absolute top-full left-0 right-0 z-50">
          <div className="p-4">
            {!currentUser ? (
              <div className="mb-4">
                <Link
                  to="/login"
                  className="block w-full bg-[#2874f0] text-white text-center py-2 rounded-sm mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full border border-[#2874f0] text-[#2874f0] text-center py-2 rounded-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-gray-100 rounded-sm">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2874f0] font-medium mr-2">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{currentUser.name}</p>
                    <p className="text-gray-500 text-xs">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            <h3 className="font-medium mb-2">Categories</h3>
            <ul className="mb-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.url}
                    className="block py-2 border-b border-gray-100 hover:text-[#2874f0]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            {currentUser && (
              <>
                <h3 className="font-medium mb-2">Account</h3>
                <ul className="mb-4">
                  <li>
                    <Link
                      to="/wishlist"
                      className="block py-2 border-b border-gray-100 hover:text-[#2874f0]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart size={16} className="inline mr-2" />
                      Wishlist
                    </Link>
                  </li>
                  {currentUser.role === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="block py-2 border-b border-gray-100 hover:text-[#2874f0]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {(currentUser.role === "manager" || currentUser.role === "admin") && (
                    <li>
                      <Link
                        to="/manager"
                        className="block py-2 border-b border-gray-100 hover:text-[#2874f0]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manager Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left py-2 border-b border-gray-100 hover:text-[#2874f0]"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
