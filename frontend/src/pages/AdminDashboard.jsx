

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  Users,
  Package,
  ShoppingBag,
  Settings,
  BarChart2,
  PieChart,
  DollarSign,
  TrendingUp,
  Grid,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
} from "lucide-react"

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Mock data for dashboard
  const dashboardStats = {
    totalSales: "₹1,245,890",
    totalOrders: 1243,
    totalUsers: 856,
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
    // Fetch products, users, and orders
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

        setUsers([
          { id: 1, name: "John Doe", email: "john@example.com", role: "user", orders: 5, joined: "2023-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", orders: 12, joined: "2023-02-20" },
          { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", orders: 0, joined: "2022-12-01" },
          {
            id: 4,
            name: "Manager User",
            email: "manager@example.com",
            role: "manager",
            orders: 3,
            joined: "2023-03-10",
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

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteProduct = () => {
    // In a real app, this would be an API call
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== selectedProduct.id))
    setShowDeleteConfirmation(false)
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderDashboard = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <TrendingUp className="h-3 w-3 mr-1" /> 12% increase from last month
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
            <TrendingUp className="h-3 w-3 mr-1" /> 8% increase from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#388e3c]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalUsers}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-[#388e3c]" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> 15% increase from last month
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
            <TrendingUp className="h-3 w-3 mr-1" /> 5% increase from last month
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
          <h3 className="text-lg font-medium mb-4">Top Categories</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="h-32 w-32 text-gray-300" />
            <p className="text-gray-500 ml-4">Category distribution chart would appear here</p>
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
        <h2 className="text-2xl font-bold">Products Management</h2>
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-[#2874f0] text-white px-4 py-2 rounded-sm flex items-center hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </button>
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
                    <button className="text-[#2874f0] hover:text-blue-700 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteProduct(product)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
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

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
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

  const renderUsers = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users Management</h2>

      <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filter by:</span>
            <select className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "manager"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#2874f0] hover:text-blue-700 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No users found matching your search.</p>
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
                    <button className="text-[#2874f0] hover:text-blue-700 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
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

  const renderSettings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                defaultValue="Flipkart"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
              <input
                type="email"
                defaultValue="contact@flipkart.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Credit/Debit Cards</h4>
                  <p className="text-xs text-gray-500">Accept payments via credit and debit cards</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">UPI Payments</h4>
                  <p className="text-xs text-gray-500">Accept payments via UPI</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Cash on Delivery</h4>
                  <p className="text-xs text-gray-500">Accept cash on delivery</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <button className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-700">Save Settings</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#2874f0] text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
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
            <div
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === "users" ? "bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-5 w-5 mr-3" />
              <span className="font-medium">Users</span>
            </div>
            <div
              className={`px-6 py-3 flex items-center cursor-pointer ${
                activeTab === "settings" ? "bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Settings</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Product</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent">
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter discount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                  rows={4}
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center">
                  <input type="file" className="hidden" id="product-image" />
                  <label
                    htmlFor="product-image"
                    className="cursor-pointer text-[#2874f0] hover:text-blue-700 font-medium"
                  >
                    Click to upload
                  </label>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="button" className="px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-blue-700">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Delete Product</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Missing icons
const CreditCard = (props) => (
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
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
)

const Wallet = (props) => (
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
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

export default AdminDashboard
