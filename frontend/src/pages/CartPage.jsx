

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import CartItem from "../components/CartItem"
import { ArrowLeft, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react"

const CartPage = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleApplyCoupon = (e) => {
    e.preventDefault()

    // Simple coupon validation - in a real app, this would be validated against a backend
    if (couponCode.toLowerCase() === "discount10") {
      setDiscount(totalPrice * 0.1)
      setCouponError("")
    } else if (couponCode.toLowerCase() === "discount20") {
      setDiscount(totalPrice * 0.2)
      setCouponError("")
    } else {
      setDiscount(0)
      setCouponError("Invalid coupon code")
    }
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  // Calculate final price after discount
  const finalPrice = totalPrice - discount

  // Shipping cost (free over $50)
  const shippingCost = finalPrice > 50 ? 0 : 5.99

  // Tax (simplified as 8% of the total)
  const tax = finalPrice * 0.08

  // Order total
  const orderTotal = finalPrice + shippingCost + tax

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Cart ({totalItems})</h1>

      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Cart Items ({totalItems})</h2>
                <button onClick={clearCart} className="text-sm text-[#2874f0] hover:text-blue-700">
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-6">
                <Link to="/products" className="flex items-center text-[#2874f0] hover:text-blue-700">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Delivery and policies */}
            <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-6 w-6 text-[#2874f0] mb-2" />
                  <p className="text-xs text-gray-600">Free delivery for orders above ₹500</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="h-6 w-6 text-[#2874f0] mb-2" />
                  <p className="text-xs text-gray-600">10 days easy return on all items</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-[#2874f0] mb-2" />
                  <p className="text-xs text-gray-600">Secure payment with buyer protection</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-sm shadow-sm p-6 sticky top-6">
              <h2 className="text-base font-medium text-gray-700 pb-4 border-b">PRICE DETAILS</h2>

              <div className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price ({totalItems} items)</span>
                  <span className="text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={shippingCost === 0 ? "text-green-600" : "text-gray-900"}>
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">GST (8%)</span>
                  <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-dashed pt-3 mt-3 flex justify-between font-medium">
                  <span className="text-base">Total Amount</span>
                  <span className="text-base">₹{orderTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="text-green-600 text-sm font-medium">
                    You will save ₹{discount.toFixed(2)} on this order
                  </div>
                )}
              </div>

              <div className="mt-6">
                <form onSubmit={handleApplyCoupon} className="mb-4">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Have a Coupon?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] text-sm"
                    />
                    <button type="submit" className="px-4 py-2 bg-[#2874f0] text-white rounded-r-sm hover:bg-blue-700">
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="mt-1 text-sm text-red-600">{couponError}</p>}
                  {discount > 0 && <p className="mt-1 text-sm text-green-600">Coupon applied successfully!</p>}
                </form>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#fb641b] text-white px-6 py-3 rounded-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-sm shadow-sm">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingBag size={32} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block bg-[#2874f0] text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage
