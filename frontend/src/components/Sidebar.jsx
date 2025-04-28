// src/components/Sidebar.jsx
"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { 
  User, 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  LogOut, 
  Package, 
  Home, 
  Settings, 
  ChevronDown,
  X
} from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth()
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const navigate = useNavigate()
  const sidebarRef = useRef(null)
  const [expandedCategory, setExpandedCategory] = useState(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleLogout = () => {
    logout()
    navigate("/")
    onClose()
  }

  const toggleCategory = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryName)
    }
  }

  const categories = [
    {
      name: "Electronics & Gadgets",
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
      url: "/products?category=electronics",
      subcategories: [
        {
          title: "Mobiles & Tablets",
          items: ["All Mobiles", "iPhones", "5G Phones", "Android Phones", "Tablets"],
        },
        {
          title: "Laptops & Computers",
          items: ["Laptops", "Gaming Laptops", "Desktop PCs", "Computer Accessories", "Monitors"],
        },
        {
          title: "Audio",
          items: ["Bluetooth Headphones", "True Wireless Earbuds", "Speakers", "Soundbars", "Microphones"],
        },
      ],
    },
    {
      name: "Fashion",
      url: "/products?category=fashion",
      subcategories: [
        {
          title: "Men's Fashion",
          items: ["T-shirts", "Shirts", "Jeans", "Trousers", "Suits"],
        },
        {
          title: "Women's Fashion",
          items: ["Tops", "Dresses", "Sarees", "Kurtis", "Lehengas"],
        },
        {
          title: "Kids' Fashion",
          items: ["Boys Clothing", "Girls Clothing", "Kids Footwear", "School Supplies", "Baby Care"],
        },
      ],
    },
    {
      name: "Footwear",
      url: "/products?category=footwear",
      subcategories: [
        {
          title: "Men's Footwear",
          items: ["Sports Shoes", "Casual Shoes", "Formal Shoes", "Sandals", "Loafers"],
        },
        {
          title: "Women's Footwear",
          items: ["Flats", "Heels", "Boots", "Sports Shoes", "Casual Shoes"],
        },
        {
          title: "Top Brands",
          items: ["Nike", "Adidas", "Puma", "Reebok", "Skechers"],
        },
      ],
    },
    {
      name: "Appliances",
      url: "/products?category=appliances",
      subcategories: [
        {
          title: "Home Appliances",
          items: ["Washing Machines", "Refrigerators", "Air Conditioners", "Microwaves", "Dishwashers"],
        },
        {
          title: "Kitchen Appliances",
          items: ["Mixers & Grinders", "Induction Cooktops", "Toasters", "Coffee Makers", "Juicers"],
        },
        {
          title: "Seasonal Appliances",
          items: ["Air Coolers", "Fans", "Water Heaters", "Air Purifiers", "Humidifiers"],
        },
      ],
    },
    {
      name: "Mobiles",
      url: "/products?category=mobiles",
      subcategories: [
        {
          title: "By Brand",
          items: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Realme"],
        },
        {
          title: "By Price",
          items: ["Under ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000", "Above ₹30,000"],
        },
        {
          title: "Accessories",
          items: ["Cases & Covers", "Screen Protectors", "Chargers", "Power Banks", "Memory Cards"],
        },
      ],
    },
    {
      name: "Grocery",
      url: "/products?category=grocery",
      subcategories: [
        {
          title: "Staples",
          items: ["Rice & Flour", "Pulses", "Sugar & Salt", "Cooking Oil", "Spices"],
        },
        {
          title: "Packaged Food",
          items: ["Noodles & Pasta", "Breakfast Cereals", "Snacks", "Ready to Eat", "Beverages"],
        },
        {
          title: "Household Care",
          items: ["Detergents", "Cleaners", "Repellents", "Fresheners", "Tissues & Disposables"],
        },
      ],
    },
    {
      name: "Home",
      url: "/products?category=home",
      subcategories: [
        {
          title: "Kitchen & Dining",
          items: ["Cookware", "Dinnerware", "Kitchen Storage", "Kitchen Tools", "Serveware"],
        },
        {
          title: "Home Decor",
          items: ["Wall Decor", "Clocks", "Lamps & Lighting", "Showpieces", "Paintings"],
        },
        {
          title: "Furniture",
          items: ["Beds", "Sofas", "Dining Tables", "Wardrobes", "Office Furniture"],
        },
      ],
    },
    {
      name: "Beauty",
      url: "/products?category=beauty",
      subcategories: [
        {
          title: "Makeup",
          items: ["Face", "Eyes", "Lips", "Nails", "Makeup Kits"],
        },
        {
          title: "Skincare",
          items: ["Cleansers", "Moisturizers", "Sunscreen", "Face Masks", "Serums"],
        },
        {
          title: "Haircare",
          items: ["Shampoo & Conditioner", "Hair Styling", "Hair Oils", "Hair Color", "Hair Accessories"],
        },
      ],
    },
    {
      name: "Toys",
      url: "/products?category=toys",
      subcategories: [
        {
          title: "Age Group",
          items: ["0-2 Years", "2-5 Years", "5-8 Years", "8-12 Years", "12+ Years"],
        },
        {
          title: "Toys by Type",
          items: ["Action Figures", "Dolls", "Educational Toys", "Outdoor Toys", "Board Games"],
        },
        {
          title: "Popular Brands",
          items: ["Lego", "Nerf", "Barbie", "Hot Wheels", "Fisher-Price"],
        },
      ],
    },
  ]

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      ref={sidebarRef}
    >
      {/* Header */}
      <div className="bg-[#2874f0] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium">Flipkart</h2>
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      {/* User info or login/signup */}
      <div className="border-b border-gray-200">
        {currentUser ? (
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2874f0] font-medium mr-3">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>
            {currentUser.role === "admin" && (
              <Link 
                to="/admin" 
                className="block w-full mt-2 p-2 text-sm border border-gray-300 rounded text-center hover:bg-gray-50"
                onClick={onClose}
              >
                Admin Dashboard
              </Link>
            )}
            {(currentUser.role === "manager" || currentUser.role === "admin") && (
              <Link 
                to="/manager" 
                className="block w-full mt-2 p-2 text-sm border border-gray-300 rounded text-center hover:bg-gray-50"
                onClick={onClose}
              >
                Manager Dashboard
              </Link>
            )}
          </div>
        ) : (
          <div className="p-4 flex flex-col">
            <Link
              to="/login"
              className="w-full bg-[#2874f0] text-white text-center py-2 rounded-sm mb-2"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full border border-[#2874f0] text-[#2874f0] text-center py-2 rounded-sm"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="border-b border-gray-200 p-2">
        <Link to="/orders" className="flex items-center p-3 hover:bg-gray-50 rounded" onClick={onClose}>
          <Package size={20} className="text-[#2874f0] mr-3" />
          <span>My Orders</span>
        </Link>
        <Link to="/wishlist" className="flex items-center p-3 hover:bg-gray-50 rounded" onClick={onClose}>
          <Heart size={20} className="text-[#2874f0] mr-3" />
          <span>Wishlist</span>
          {wishlistItems > 0 && (
            <span className="ml-auto bg-gray-100 rounded-full px-2 py-1 text-xs font-medium">
              {wishlistItems}
            </span>
          )}
        </Link>
        <Link to="/cart" className="flex items-center p-3 hover:bg-gray-50 rounded" onClick={onClose}>
          <ShoppingCart size={20} className="text-[#2874f0] mr-3" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="ml-auto bg-gray-100 rounded-full px-2 py-1 text-xs font-medium">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Categories */}
      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
        <div className="border-b border-gray-200 py-2">
          <h3 className="px-4 py-2 uppercase text-xs font-medium text-gray-500">Shop By Category</h3>
          {categories.map((category, index) => (
            <div key={index} className="border-b last:border-b-0 border-gray-100">
              <div
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <Link 
                  to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`} 
                  className="flex-grow"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    e.preventDefault();
                    navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}`, { replace: true });
                    onClose();
                  }}
                >
                  {category.name}
                </Link>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    expandedCategory === category.name ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              
              {expandedCategory === category.name && (
                <div className="bg-gray-50 pl-4 pr-2 pb-2 animate-fadeIn">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <h4 className="font-medium text-sm text-[#2563eb] py-1.5 border-b border-gray-200">{subcategory.title}</h4>
                      <ul className="pl-1 mt-2 space-y-1.5">
                        {subcategory.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link 
                              to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(item.toLowerCase())}`}
                              className="text-sm text-gray-700 hover:text-[#2563eb] flex items-center py-1.5 hover:translate-x-1 transition-transform duration-150"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(item.toLowerCase())}`, { replace: true });
                                onClose();
                              }}
                            >
                              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2 flex-shrink-0"></span>
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                    className="inline-block text-[#2563eb] text-xs font-medium mt-1 mb-2 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/products?category=${encodeURIComponent(category.name.toLowerCase())}`, { replace: true });
                      onClose();
                    }}
                  >
                    View All {category.name} →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-gray-200 p-4 mt-auto">
        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-[#2874f0] w-full p-2"
          >
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        )}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>© 2023 Flipkart</p>
        </div>
      </div>
    </div>
  )
}

export { Sidebar as default }