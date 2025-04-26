

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  Package,
  ShoppingBag,
  BarChart2,
  PieChart,
  DollarSign,
  TrendingUp,
  Grid,
  LogOut,
  Search,
  Edit,
  X,
} from "lucide-react"

const ManagerDashboard = () => {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Mock data for dashboard
  const dashboardStats = {
    totalSales: "₹845,290",
    totalOrders: 943,
    totalProducts: 328,
    recentOrders: [
      { id: "ORD-5678", customer: "John Doe", date: "2023-05-15", amount: "₹4,590", status: "Delivered" },
      { id: "ORD-5677", customer: "Jane Smith", date: "2023-05-14", amount: "₹2,190", status: "Processing" },
      { id: "ORD-5676", customer: "Mike Johnson", date: "2023-05-14", amount: "₹1,290", status: "Shipped" },
      { id: "ORD-5675", customer: "Sarah Williams", date: "2023-05-13", amount: "₹3,490", status: "Delivered" },
    ],
    salesData: [
      { month: "Jan", sales: 12000 },
      { month: "Feb", sales: 19000 },
      { month: "Mar", sales: 15000 },
      { month: "Apr", sales: 22000 },
      { month: "May", sales: 28000 },
      { month: "Jun", sales: 32000 },
    ],
  }

  useEffect(() => {
    // Fetch products and orders
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // Mock data for now
        setProducts([
          {
            id: 1,
            name: "APPLE iPhone 14 (Blue, 128 GB)",
            price: 69999,
            discount: 10,
            stock: 15,
            category: "Electronics",
            image: "https://via.placeholder.com/100/ffffff?text=iPhone+14",
          },
          {
            id: 2,
            name: "SAMSUNG Galaxy S23 Ultra (Green, 256 GB)",
            price: 124999,
            discount: 15,
            stock: 8,
            category: "Electronics",
            image: "https://via.placeholder.com/100/ffffff?text=Samsung+S23",
          },
          {
            id: 3,
            name: "PUMA Men White Sneakers",
            price: 3999,
            discount: 20,
            stock: 25,
            category: "Footwear",
            image: "https://via.placeholder.com/100/ffffff?text=PUMA+Sneakers",
          },
          {
            id: 4,
            name: "boAt Airdopes 141 Bluetooth Headset",
            price: 1499,
            discount: 50,
            stock: 50,
            category: "Electronics",
            image: "https://via.placeholder.com/100/ffffff?text=boAt+Airdopes",
          },
        ])

        setOrders([
          {
            id: "ORD-5678",
            customer: "John Doe",
            date: "2023-05-15",
            amount: "₹4,590",
            status: "Delivered",
            items: 3,
          },
          {
            id: "ORD-5677",
            customer: "Jane Smith",
            date: "2023-05-14",
            amount: "₹2,190",
            status: "Processing",
            items: 1,
          },
          {
            id: "ORD-5676",
            customer: "Mike Johnson",
            date: "2023-05-14",
            amount: "₹1,290",
            status: "Shipped",
            items: 2,
          },
          {
            id: "ORD-5675",
            customer: "Sarah Williams",
            date: "2023-05-13",
            amount: "₹3,490",
            status: "Delivered",
            items: 4,
          },
          {
            id: "ORD-5674",
            customer: "Robert Brown",
            date: "2023-05-12",
            amount: "₹6,790",
            status: "Delivered",
            items: 5,
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetailsModal(true)
  }

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#2874f0]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Sales</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalSales}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-[#2874f0]" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> 8% increase from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#ff9f00]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalOrders}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-[#ff9f00]" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> 5% increase from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#fb641b]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalProducts}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-[#fb641b]" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> 3% increase from last month
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart2 className="h-32 w-32 text-gray-300" />
            <p className="text-gray-500 ml-4">Sales chart visualization would appear here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h3 className="text-lg font-medium mb-4">Top Products</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="h-32 w-32 text-gray-300" />
            <p className="text-gray-500 ml-4">Product distribution chart would appear here</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-sm text-[#2874f0] hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardStats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2874f0]">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products Inventory</h2>
      </div>

      <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filter by:</span>
            <select className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="footwear">Footwear</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 object-contain"
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.discount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#2874f0] hover:text-blue-700">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderOrders = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders Management</h2>

      <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filter by:</span>
            <select className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
              <option value="">All Statuses</option>
              <option value="delivered">Delivered</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2874f0]">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewOrderDetails(order)}
                      className="text-[#2874f0] hover:text-blue-700 mr-3"
                    >
                      View Details
                    </button>
                    <button className="text-[#2874f0] hover:text-blue-700">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No orders found matching your search.</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex">
            <button className="border border-gray-300 rounded-l-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200">
              Previous
            </button>
            <button className="border border-gray-300 px-3 py-1 bg-[#2874f0] text-white">1</button>
            <button className="border border-gray-300 px-3 py-1 bg-white text-gray-600 hover:bg-gray-100">2</button>
            <button className="border border-gray-300 rounded-r-sm px-3 py-1 bg-white text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#2874f0] text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Manager Dashboard</h1>
        <div className="flex items-center">
          <div className="mr-4 text-sm">
            Welcome, <span className="font-medium">{currentUser?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-white bg-[#1a5dc8] px-3 py-1 rounded-sm hover:bg-blue-700"
          >
            <LogOut size={16} className="mr-1" /> Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <nav className="mt-6">
            <div
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === "dashboard" ? "bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Grid className="h-5 w-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </div>
            <div
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === "products" ? "bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Package className="h-5 w-5 mr-3" />
              <span className="font-medium">Products</span>
            </div>
            <div
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === "orders" ? "bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag className="h-5 w-5 mr-3" />
              <span className="font-medium">Orders</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "orders" && renderOrders()}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Order Details - {selectedOrder.id}</h3>
              <button onClick={() => setShowOrderDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">{selectedOrder.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="border rounded-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Mock order items - in a real app, these would come from the order data */}
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img
                              className="h-8 w-8 object-contain"
                              src="https://via.placeholder.com/100/ffffff?text=iPhone+14"
                              alt="iPhone 14"
                            />
                          </div>
                          <div className="ml-2">
                            <div className="text-xs font-medium text-gray-900">APPLE iPhone 14 (Blue, 128 GB)</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">₹69,999.00</td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">1</td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">₹69,999.00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img
                              className="h-8 w-8 object-contain"
                              src="https://via.placeholder.com/100/ffffff?text=boAt+Airdopes"
                              alt="boAt Airdopes"
                            />
                          </div>
                          <div className="ml-2">
                            <div className="text-xs font-medium text-gray-900">boAt Airdopes 141 Bluetooth Headset</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">₹1,499.00</td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">2</td>
                      <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">₹2,998.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <p className="text-sm">
                123 Main Street, Apartment 4B
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Update Order Status</h4>
              <div className="flex items-center space-x-2">
                <select className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-700">
                  Update Status
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowOrderDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerDashboard
