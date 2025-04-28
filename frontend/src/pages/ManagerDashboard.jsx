"use client"

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
  Plus,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
  Eye,
  Trash2,
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
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productFormData, setProductFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    brand: "",
    description: "",
    colors: [],
    sizes: [],
  })
  const [colorInput, setColorInput] = useState("")
  const [sizeInput, setSizeInput] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [inventoryAlerts, setInventoryAlerts] = useState([])

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
            image: "https://placehold.co/100x100/ffffff/000000?text=iPhone+14",
            colors: ["Blue", "Black", "White"],
            sizes: [],
            brand: "Apple",
            description:
              "The iPhone 14 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).",
            featured: true,
            date: "2023-09-01",
          },
          {
            id: 2,
            name: "SAMSUNG Galaxy S23 Ultra (Green, 256 GB)",
            price: 124999,
            discount: 15,
            stock: 8,
            category: "Electronics",
            image: "https://placehold.co/100x100/ffffff/000000?text=Samsung+S23",
            colors: ["Green", "Black", "Silver"],
            sizes: [],
            brand: "Samsung",
            description:
              "The Samsung Galaxy S23 Ultra features a stunning display, powerful performance, and an advanced camera system for capturing your life's moments with incredible detail.",
            featured: true,
            date: "2023-08-15",
          },
          {
            id: 3,
            name: "PUMA Men White Sneakers",
            price: 3999,
            discount: 20,
            stock: 25,
            category: "Footwear",
            image: "https://placehold.co/100x100/ffffff/000000?text=PUMA+Sneakers",
            colors: ["White", "Black", "Blue"],
            sizes: ["7", "8", "9", "10", "11"],
            brand: "PUMA",
            description:
              "A pair of white sneakers from PUMA, has regular styling, lace-up detail. Synthetic leather upper. Cushioned footbed. Textured and patterned rubber outsole. Warranty: 3 months.",
            featured: false,
            date: "2023-10-05",
          },
          {
            id: 4,
            name: "boAt Airdopes 141 Bluetooth Headset",
            price: 1499,
            discount: 50,
            stock: 3,
            category: "Electronics",
            image: "https://placehold.co/100x100/ffffff/000000?text=boAt+Airdopes",
            colors: ["Black", "White", "Blue", "Red"],
            sizes: [],
            brand: "boAt",
            description:
              "The boAt Airdopes 141 TWS earbuds come with 8mm drivers that offer immersive sound quality. With a battery capacity that lasts for up to 42 hours, you can enjoy your favorite tunes for a long time.",
            featured: true,
            date: "2023-11-01",
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
            products: [
              { id: 1, name: "APPLE iPhone 14 (Blue, 128 GB)", price: 69999, quantity: 1, color: "Blue" },
              { id: 4, name: "boAt Airdopes 141 Bluetooth Headset", price: 1499, quantity: 2, color: "Black" },
            ],
            address: "123 Main Street, Mumbai, Maharashtra, 400001",
            paymentMethod: "Credit Card",
          },
          {
            id: "ORD-5677",
            customer: "Jane Smith",
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
            customer: "Mike Johnson",
            date: "2023-05-14",
            amount: "₹1,290",
            status: "Shipped",
            items: 2,
            products: [{ id: 4, name: "boAt Airdopes 141 Bluetooth Headset", price: 1499, quantity: 1, color: "Blue" }],
            address: "789 Lake View, Bangalore, Karnataka, 560001",
            paymentMethod: "Cash on Delivery",
          },
          {
            id: "ORD-5675",
            customer: "Sarah Williams",
            date: "2023-05-13",
            amount: "₹3,490",
            status: "Delivered",
            items: 4,
            products: [
              { id: 3, name: "PUMA Men White Sneakers", price: 3999, quantity: 1, color: "Black", size: "10" },
              { id: 4, name: "boAt Airdopes 141 Bluetooth Headset", price: 1499, quantity: 1, color: "Red" },
            ],
            address: "101 Hill Road, Chennai, Tamil Nadu, 600001",
            paymentMethod: "Net Banking",
          },
          {
            id: "ORD-5674",
            customer: "Robert Brown",
            date: "2023-05-12",
            amount: "₹6,790",
            status: "Delivered",
            items: 5,
            products: [
              {
                id: 2,
                name: "SAMSUNG Galaxy S23 Ultra (Green, 256 GB)",
                price: 124999,
                quantity: 1,
                color: "Green",
              },
            ],
            address: "202 River View, Kolkata, West Bengal, 700001",
            paymentMethod: "Credit Card",
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

  // Check for low inventory items
  useEffect(() => {
    const lowStockItems = products.filter((product) => product.stock <= 5)
    setInventoryAlerts(lowStockItems)
  }, [products])

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 3000)
  }

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetailsModal(true)
  }

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
    showNotification("Order status updated successfully")
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setProductFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      discount: product.discount.toString(),
      stock: product.stock.toString(),
      brand: product.brand || "",
      description: product.description || "",
      colors: product.colors || [],
      sizes: product.sizes || [],
    })
    setShowAddProductModal(true)
  }

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteProduct = () => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== selectedProduct.id))
    setShowDeleteConfirmation(false)
    setSelectedProduct(null)
    showNotification("Product deleted successfully")
  }

  const handleAddColor = () => {
    if (colorInput.trim() && !productFormData.colors.includes(colorInput.trim())) {
      setProductFormData({
        ...productFormData,
        colors: [...productFormData.colors, colorInput.trim()],
      })
      setColorInput("")
    }
  }

  const handleRemoveColor = (color) => {
    setProductFormData({
      ...productFormData,
      colors: productFormData.colors.filter((c) => c !== color),
    })
  }

  const handleAddSize = () => {
    if (sizeInput.trim() && !productFormData.sizes.includes(sizeInput.trim())) {
      setProductFormData({
        ...productFormData,
        sizes: [...productFormData.sizes, sizeInput.trim()],
      })
      setSizeInput("")
    }
  }

  const handleRemoveSize = (size) => {
    setProductFormData({
      ...productFormData,
      sizes: productFormData.sizes.filter((s) => s !== size),
    })
  }

  const handleProductFormChange = (e) => {
    const { name, value } = e.target
    setProductFormData({
      ...productFormData,
      [name]: value,
    })
  }

  const validateProductForm = () => {
    if (!productFormData.name.trim()) return "Product name is required"
    if (!productFormData.category.trim()) return "Category is required"
    if (!productFormData.price.trim() || isNaN(Number(productFormData.price)) || Number(productFormData.price) <= 0)
      return "Valid price is required"
    if (
      productFormData.discount.trim() &&
      (isNaN(Number(productFormData.discount)) ||
        Number(productFormData.discount) < 0 ||
        Number(productFormData.discount) > 100)
    )
      return "Discount must be between 0 and 100"
    if (!productFormData.stock.trim() || isNaN(Number(productFormData.stock)) || Number(productFormData.stock) < 0)
      return "Valid stock quantity is required"
    return null
  }

  const handleProductFormSubmit = () => {
    const error = validateProductForm()
    if (error) {
      showNotification(error, "error")
      return
    }

    // In a real app, this would be an API call
    if (selectedProduct) {
      // Edit existing product
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                name: productFormData.name,
                category: productFormData.category,
                price: Number.parseFloat(productFormData.price),
                discount: Number.parseFloat(productFormData.discount) || 0,
                stock: Number.parseInt(productFormData.stock),
                brand: productFormData.brand,
                description: productFormData.description,
                colors: productFormData.colors,
                sizes: productFormData.sizes,
              }
            : p,
        ),
      )
      showNotification("Product updated successfully")
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: productFormData.name,
        category: productFormData.category,
        price: Number.parseFloat(productFormData.price),
        discount: Number.parseFloat(productFormData.discount) || 0,
        stock: Number.parseInt(productFormData.stock),
        brand: productFormData.brand,
        description: productFormData.description,
        image: "https://placehold.co/100x100/ffffff/000000?text=New+Product",
        colors: productFormData.colors,
        sizes: productFormData.sizes,
        date: new Date().toISOString().split("T")[0],
        featured: false,
      }
      setProducts([...products, newProduct])
      showNotification("Product added successfully")
    }
    setShowAddProductModal(false)
    setSelectedProduct(null)
    setProductFormData({
      name: "",
      category: "",
      price: "",
      discount: "",
      stock: "",
      brand: "",
      description: "",
      colors: [],
      sizes: [],
    })
  }

  // Apply filters and sorting to products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory ? product.category === filterCategory : true
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date)
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "name-a-z":
          return a.name.localeCompare(b.name)
        case "name-z-a":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  // Pagination for products
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = [...new Set(products.map((product) => product.category))]

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
              <h3 className="text-2xl font-bold">{orders.length}</h3>
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
              <h3 className="text-2xl font-bold">{products.length}</h3>
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

      {/* Inventory Alerts */}
      {inventoryAlerts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium text-yellow-700">Low Inventory Alerts</h3>
          </div>
          <div className="mt-3">
            <ul className="space-y-2">
              {inventoryAlerts.map((product) => (
                <li key={product.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{product.name}</span>
                  <span className="text-sm font-medium text-red-600">{product.stock} items left</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setActiveTab("products")} className="mt-3 text-sm text-[#2874f0] hover:underline">
              View all inventory
            </button>
          </div>
        </div>
      )}

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 4).map((order) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewOrderDetails(order)}
                      className="text-[#2874f0] hover:text-blue-700"
                    >
                      <Eye size={18} />
                    </button>
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
        <button
          onClick={() => {
            setSelectedProduct(null)
            setProductFormData({
              name: "",
              category: "",
              price: "",
              discount: "",
              stock: "",
              brand: "",
              description: "",
              colors: [],
              sizes: [],
            })
            setShowAddProductModal(true)
          }}
          className="bg-[#2874f0] text-white px-4 py-2 rounded-sm flex items-center hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-sm shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>

            <button className="flex items-center text-[#2874f0] border border-[#2874f0] px-3 py-1.5 rounded-sm hover:bg-blue-50">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
            <button className="flex items-center text-[#2874f0] border border-[#2874f0] px-3 py-1.5 rounded-sm hover:bg-blue-50">
              <Download size={16} className="mr-1" />
              Export
            </button>
            <button className="flex items-center text-[#2874f0] border border-[#2874f0] px-3 py-1.5 rounded-sm hover:bg-blue-50">
              <RefreshCw size={16} className="mr-1" />
              Refresh
            </button>
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
              {currentProducts.map((product) => (
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
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-[#2874f0] hover:text-blue-700 mr-3"
                    >
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

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-sm text-gray-500 mb-2 md:mb-0">
            Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className="flex">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="border border-gray-300 rounded-l-sm px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const pageNumber = currentPage <= 2 ? i + 1 : currentPage - 1 + i
              if (pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`border border-gray-300 px-3 py-1 ${
                      currentPage === pageNumber
                        ? "bg-[#2874f0] text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              }
              return null
            })}
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="border border-gray-300 rounded-r-sm px-3 py-1 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
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
                <>
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2874f0]">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border-0 font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="text-[#2874f0] hover:text-blue-700"
                      >
                        {expandedOrderId === order.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Order Details</h4>
                            <p className="text-sm">
                              <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Shipping Address:</span> {order.address}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">Products</h4>
                            <ul className="space-y-2">
                              {order.products.map((product, index) => (
                                <li key={index} className="text-sm flex items-center">
                                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs mr-2">
                                    {product.quantity}
                                  </span>
                                  <span>
                                    {product.name}{" "}
                                    {product.color && <span className="text-gray-500">Color: {product.color}</span>}{" "}
                                    {product.size && <span className="text-gray-500">Size: {product.size}</span>}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <Check className="h-5 w-5 mr-2" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-2" />
            )}
            <p>{notification.message}</p>
          </div>
        </div>
      )}

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

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-sm">
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
                    {selectedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 object-contain"
                                src={`https://placehold.co/100x100/ffffff/000000?text=${encodeURIComponent(
                                  product.name.split(" ")[0],
                                )}`}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-2">
                              <div className="text-xs font-medium text-gray-900">{product.name}</div>
                              {product.color && <div className="text-xs text-gray-500">Color: {product.color}</div>}
                              {product.size && <div className="text-xs text-gray-500">Size: {product.size}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                          ₹{product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">{product.quantity}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                          ₹{(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <p className="text-sm">{selectedOrder.address}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Update Order Status</h4>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                    setOrders((prevOrders) =>
                      prevOrders.map((order) =>
                        order.id === selectedOrder.id ? { ...order, status: newStatus } : order,
                      ),
                    )
                    setSelectedOrder({ ...selectedOrder, status: newStatus })
                  }}
                  className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => {
                    showNotification("Order status updated successfully")
                    setShowOrderDetailsModal(false)
                  }}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-700"
                >
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

      {/* Add/Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{selectedProduct ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleProductFormSubmit()
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={productFormData.name}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    name="category"
                    value={productFormData.category}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                  <input
                    type="number"
                    name="price"
                    value={productFormData.price}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={productFormData.discount}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter discount"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                  <input
                    type="number"
                    name="stock"
                    value={productFormData.stock}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={productFormData.brand}
                    onChange={handleProductFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={productFormData.description}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                  rows={4}
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {productFormData.colors.map((color, index) => (
                    <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-sm">
                      <span className="text-sm">{color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Add a color"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="bg-[#2874f0] text-white px-3 py-2 rounded-r-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {productFormData.sizes.map((size, index) => (
                    <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-sm">
                      <span className="text-sm">{size}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                    placeholder="Add a size"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="bg-[#2874f0] text-white px-3 py-2 rounded-r-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
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
                <button type="submit" className="px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-blue-700">
                  {selectedProduct ? "Update Product" : "Add Product"}
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

export default ManagerDashboard
