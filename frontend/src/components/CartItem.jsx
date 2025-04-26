

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { Plus, Minus, Heart } from "lucide-react"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = (newQuantity) => {
    setIsUpdating(true)
    updateQuantity(item.id, newQuantity)
    setTimeout(() => setIsUpdating(false), 300)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  // Calculate discounted price if there's a discount
  const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

  const totalPrice = discountedPrice * item.quantity

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4 relative">
      <div className="flex-shrink-0 w-24 h-24 sm:mr-6">
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image || "https://via.placeholder.com/100"}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      <div className="flex-grow mt-3 sm:mt-0">
        <Link to={`/products/${item.id}`} className="text-sm text-gray-800 font-medium hover:text-[#2874f0]">
          {item.name}
        </Link>

        {item.brand && <p className="text-xs text-gray-500 mt-1">{item.brand}</p>}

        <div className="mt-1 flex items-center">
          <span className="text-gray-900 font-medium">₹{discountedPrice.toFixed(2)}</span>
          {item.discount > 0 && (
            <>
              <span className="ml-2 text-gray-500 text-xs line-through">₹{item.price.toFixed(2)}</span>
              <span className="ml-2 text-[#388e3c] text-xs font-medium">{item.discount}% off</span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-sm">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <Minus size={14} />
            </button>

            <span className="px-3 py-1 text-gray-800 text-sm min-w-[40px] text-center border-x border-gray-300">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <Plus size={14} />
            </button>
          </div>

          <button onClick={handleRemove} className="ml-4 text-[#2874f0] hover:text-blue-700 text-sm font-medium">
            REMOVE
          </button>

          <button className="ml-4 text-[#2874f0] hover:text-blue-700 text-sm font-medium flex items-center">
            <Heart size={14} className="mr-1" />
            SAVE FOR LATER
          </button>
        </div>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-4 text-right">
        <span className="text-gray-900 font-medium">₹{totalPrice.toFixed(2)}</span>
        <div className="text-xs text-[#388e3c] mt-1">Free Delivery</div>
      </div>
    </div>
  )
}

export default CartItem
