"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { Heart } from "lucide-react"
import { useLocation } from "react-router-dom"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isInWishlistState, setIsInWishlistState] = useState(isInWishlist(product.id))
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search") || ""

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (isInWishlistState) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    setIsInWishlistState(!isInWishlistState)
  }

  // Function to highlight search terms in text
  const highlightSearchTerm = (text) => {
    if (!searchQuery || !text) return text;
    
    // Split text on the search term with case-insensitive matching
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <mark key={i} className="bg-yellow-100 px-0.5">{part}</mark> 
        : part
    );
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 relative">
        <div className="absolute top-2 right-2 z-10">
          <button onClick={handleWishlistToggle} className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100">
            <Heart size={16} className={isInWishlistState ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>

        <div className="relative pt-[100%] overflow-hidden">
          <img
            src={product.image || "https://placehold.co/200x200/ffffff/000000"}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
          {product.discount > 0 && (
            <div className="absolute bottom-0 left-0 bg-[#388e3c] text-white text-xs px-2 py-0.5">
              {product.discount}% off
            </div>
          )}
        </div>

        <div className="p-3">
          {product.brand && <p className="text-xs text-gray-500 mb-1">{product.brand}</p>}

          <h3 className="text-sm text-gray-800 font-medium line-clamp-2 h-10 mb-1">
            {searchQuery ? highlightSearchTerm(product.name) : product.name}
          </h3>

          <div className="flex items-center mb-1.5">
            <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star size={8} className="ml-0.5 fill-current" />
            </div>
            <span className="text-gray-500 text-xs ml-2">(210)</span>
          </div>

          <div className="flex flex-wrap items-center">
            <span className="text-gray-900 font-medium text-sm md:text-base">₹{discountedPrice.toFixed(0)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 text-xs line-through ml-1 md:ml-2">₹{product.price.toFixed(0)}</span>
                <span className="text-[#388e3c] text-xs font-medium ml-1 md:ml-2">{product.discount}% off</span>
              </>
            )}
          </div>
        </div>

        <div className="px-3 pb-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className="w-full py-1.5 bg-[#ff9f00] text-white text-sm font-medium rounded-sm hover:bg-[#f39803] transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  )
}

// Star icon component
const Star = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default ProductCard
