"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Package, ShoppingBag, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const OrderPage = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would fetch orders from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-5678",
          date: "2023-05-15",
          amount: "₹4,590",
          status: "Delivered",
          items: 3,
          products: [
            { id: 1, name: "APPLE iPhone 14 (Blue, 128 GB)", price: 69999, quantity: 1, color: "Blue" },
            { id: 4, name: "boAt Airdopes 141 Bluetooth Headset", price: 1499, quantity: 2, color: "Black" },
          ],
          address: "123 Main Street, Mumbai, Maharashtra, 400001",
          paymentMethod: "Credit Card",
        },
        {
          id: "ORD-5677",
          date: "2023-05-14",
          amount: "₹2,190",
          status: "Processing",
          items: 1,
          products: [{ id: 3, name: "PUMA Men White Sneakers", price: 3999, quantity: 1, color: "White", size: "9" }],
          address: "456 Park Avenue, Delhi, 110001",
          paymentMethod: "UPI",
        },
        {
          id: "ORD-5676",
          date: "2023-05-14",
          amount: "₹1,290",
          status: "Shipped",
          items: 2,
          products: [{ id: 4, name: "boAt Airdopes 141 Bluetooth Headset", price: 1499, quantity: 1, color: "Blue" }],
          address: "789 Lake View, Bangalore, Karnataka, 560001",
          paymentMethod: "Cash on Delivery",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Processing":
        return <Package className="h-5 w-5 text-yellow-600" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "Cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">You need to log in to view your orders</h3>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2874f0] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse h-6 w-40 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="animate-pulse h-64 bg-gray-200 rounded-lg mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2874f0] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Products
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Order {order.id}</h2>
                      <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span
                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500">Total:</span>{" "}
                      <span className="font-medium text-gray-900">{order.amount}</span>
                    </div>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-sm font-medium text-[#2874f0] hover:text-blue-700"
                    >
                      {expandedOrderId === order.id ? "Hide details" : "View details"}
                    </button>
                  </div>

                  {expandedOrderId === order.id && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                          {order.products.map((product) => (
                            <li key={product.id} className="p-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center mr-4">
                                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {product.color && `Color: ${product.color}`}
                                    {product.size && `, Size: ${product.size}`}
                                  </p>
                                  <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                ₹{(product.price * product.quantity).toLocaleString()}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                          <p className="text-sm text-gray-500">{order.address}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h3>
                          <p className="text-sm text-gray-500">Method: {order.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => navigate(`/products`)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2874f0] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OrderPage
