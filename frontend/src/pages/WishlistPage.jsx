

import { useState } from "react"
import { Link } from "react-router-dom"
import { useWishlist } from "../contexts/WishlistContext"
import { useCart } from "../contexts/CartContext"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [notification, setNotification] = useState(null)

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    setNotification({
      type: "success",
      message: "Item removed from wishlist",
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    setNotification({
      type: "success",
      message: "Item added to cart",
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleClearWishlist = () => {
    if (wishlist.length > 0) {
      clearWishlist()
      setNotification({
        type: "success",
        message: "Wishlist cleared",
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist ({wishlist.length})</h1>
        {wishlist.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-sm text-[#2874f0] hover:text-blue-700 flex items-center"
          >
            <Trash2 size={16} className="mr-1" /> Clear Wishlist
          </button>
        )}
      </div>

      {notification && (
        <div
          className={`mb-4 ${
            notification.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          } border px-4 py-3 rounded-sm flex items-center justify-between`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-sm font-medium">
            Dismiss
          </button>
        </div>
      )}

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => {
            // Calculate discounted price if there's a discount
            const discountedPrice = product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price

            return (
              <div
                key={product.id}
                className="bg-white rounded-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 relative"
              >
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="bg-white rounded-full p-1.5 shadow-md text-red-500 hover:text-red-700"
                  >
                    <Heart size={16} className="fill-current" />
                  </button>
                </div>

                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative pt-[100%] overflow-hidden">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
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

                    <h3 className="text-sm text-gray-800 font-medium line-clamp-2 h-10 mb-1">{product.name}</h3>

                    <div className="flex items-center mb-1.5">
                      <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
                        <span>{product.rating}</span>
                        <Star size={10} className="ml-0.5 fill-current" />
                      </div>
                      <span className="text-gray-500 text-xs ml-2">(210)</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">₹{discountedPrice.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-gray-500 text-xs line-through ml-2">₹{product.price.toFixed(2)}</span>
                          <span className="text-[#388e3c] text-xs font-medium ml-2">{product.discount}% off</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="px-3 pb-3 mt-1">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-1.5 bg-[#ff9f00] text-white text-sm font-medium rounded-sm hover:bg-[#f39803] transition-colors"
                  >
                    <ShoppingCart size={14} className="inline mr-1" /> ADD TO CART
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-sm shadow-sm">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <Heart size={32} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items that you like in your wishlist and review them anytime.</p>
          <Link
            to="/products"
            className="inline-block bg-[#2874f0] text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

// Star icon component
const Star = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

export default WishlistPage
