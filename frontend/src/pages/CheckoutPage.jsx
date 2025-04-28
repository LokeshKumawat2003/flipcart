"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { CheckCircle, CreditCard, Truck, Package } from "lucide-react"

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(" ")[0] || "",
    lastName: currentUser?.name?.split(" ")[1] || "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Calculate final price
  const discount = 0 // You can implement discount logic here
  const finalPrice = totalPrice - discount

  // Shipping cost (free over ₹500)
  const shippingCost = finalPrice > 500 ? 0 : 40

  // Tax (simplified as 18% GST of the total)
  const tax = finalPrice * 0.18

  // Order total
  const orderTotal = finalPrice + shippingCost + tax

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Shipping info validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "PIN code is required"
    if (!/^\d{6}$/.test(formData.zipCode)) newErrors.zipCode = "PIN code must be 6 digits"

    // Payment info validation
    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits"
      }
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Expiry date must be in MM/YY format"
      }
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
      if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would send the order to your backend
      // This is a simplified example
      setTimeout(() => {
        setOrderPlaced(true)
        setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
        clearCart()
      }, 1500)
    }
  }

  const handleContinueShopping = () => {
    navigate("/")
  }

  if (cart.length === 0 && !orderPlaced) {
    navigate("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order number is <span className="font-medium">{orderNumber}</span>. We've
            sent a confirmation email to <span className="font-medium">{formData.email}</span>.
          </p>
          <p className="text-gray-600 mb-8">You will receive an email when your order ships.</p>
          <button
            onClick={handleContinueShopping}
            className="w-full bg-[#2874f0] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h2>

              <div className="mb-6 space-y-4">
                <div className="flex items-center">
                  <input
                    id="payment-card"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 text-[#2874f0] focus:ring-[#2874f0] border-gray-300"
                  />
                  <label htmlFor="payment-card" className="ml-3 flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Credit/Debit Card</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="payment-upi"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="h-4 w-4 text-[#2874f0] focus:ring-[#2874f0] border-gray-300"
                  />
                  <label htmlFor="payment-upi" className="ml-3 flex items-center">
                    <img src="https://placehold.co/20x20/ffffff/000000" alt="UPI" className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium text-gray-700">UPI</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="payment-netbanking"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                    className="h-4 w-4 text-[#2874f0] focus:ring-[#2874f0] border-gray-300"
                  />
                  <label htmlFor="payment-netbanking" className="ml-3 flex items-center">
                    <img src="https://placehold.co/20x20/ffffff/000000" alt="Net Banking" className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Net Banking</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="payment-cod"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 text-[#2874f0] focus:ring-[#2874f0] border-gray-300"
                  />
                  <label htmlFor="payment-cod" className="ml-3 flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                          errors.expiryDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-md">
                    <Truck className="h-6 w-6 text-[#2874f0] mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700">
                        Pay on delivery (Cash/Card/UPI). Cash on delivery is available for orders under ₹10,000.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Please keep exact change handy to help us serve you better
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-[#fb641b] text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
              >
                {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

            <div className="border-t border-gray-200 py-4">
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3 className="pr-2">{item.name}</h3>
                            <p className="ml-4">₹{item.price.toFixed(2)}</p>
                          </div>
                          {item.selectedColor && (
                            <p className="mt-1 text-sm text-gray-500">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>}
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">₹{finalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-gray-900">
                  {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                </p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p className="text-gray-600">GST (18%)</p>
                <p className="font-medium text-gray-900">₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>₹{orderTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 text-[#388e3c] mr-2" />
                <p className="text-sm font-medium text-gray-700">Free delivery on orders above ₹500</p>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-[#388e3c] mr-2" />
                <p className="text-sm font-medium text-gray-700">7 day replacement policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
