"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  BarChart3,
  Package,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  MoreVertical,
  RefreshCw,
  ShoppingCart,
  DollarSign,
  CreditCard,
  CheckSquare,
  Save,
  Home,
  EyeOff,
  Image,
  Tag,
  Loader,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  PieChart,
  TrendingUp,
  Grid,
  LogOut,
  Edit,
  Trash2,
  Filter,
  Download,
  AlertTriangle,
  Eye,
  Check,
} from "lucide-react"
import HomePage from "./HomePage"

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
  const [expandedOrderId, setExpandedOrderId] = useState(null)
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
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [filterCategory, setFilterCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [userRoleEdit, setUserRoleEdit] = useState({ userId: null, role: "" })
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Flipkart",
    storeEmail: "contact@flipkart.com",
    currency: "INR",
    language: "en",
    enableCashOnDelivery: true,
    enableUPI: true,
    enableCreditCard: true,
  })
  const [showFeaturedProductModal, setShowFeaturedProductModal] = useState(false)
  const [homePageComponents, setHomePageComponents] = useState([
    { id: 1, name: "Hero Banner", type: "banner", enabled: true, description: "Main promotional banner at the top of the page", order: 1 },
    { id: 2, name: "Category Showcase", type: "categories", enabled: true, description: "Display popular product categories", order: 2 },
    { id: 3, name: "Featured Products", type: "featuredProducts", enabled: true, description: "Showcase your best products", order: 3 },
    { id: 4, name: "Special Offers", type: "offers", enabled: true, description: "Highlight current discounts and deals", order: 4 }
  ])
  const [homePageSettings, setHomePageSettings] = useState({
    layout: "standard",
    productsPerRow: "4",
    showBannerCarousel: true,
    showFeaturedCategories: true
  })
  const [editingComponent, setEditingComponent] = useState(null)
  const [componentSearchQuery, setComponentSearchQuery] = useState("")
  const [isSavingHomePage, setIsSavingHomePage] = useState(false)
  const [featuredProductSearch, setFeaturedProductSearch] = useState("")

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
            stock: 50,
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

        setUsers([
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            orders: 5,
            joined: "2023-01-15",
            status: "active",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "user",
            orders: 12,
            joined: "2023-02-20",
            status: "active",
          },
          {
            id: 3,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            orders: 0,
            joined: "2022-12-01",
            status: "active",
          },
          {
            id: 4,
            name: "Manager User",
            email: "manager@example.com",
            role: "manager",
            orders: 3,
            joined: "2023-03-10",
            status: "active",
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

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 3000)
  }

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteProduct = () => {
    // In a real app, this would be an API call
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== selectedProduct.id))
    setShowDeleteConfirmation(false)
    setSelectedProduct(null)
    showNotification("Product deleted successfully")
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

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  const toggleUserDetails = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null)
    } else {
      setExpandedUserId(userId)
    }
  }

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
    setUserRoleEdit({ userId: null, role: "" })
    showNotification("User role updated successfully")
  }

  const handleUpdateUserStatus = (userId, newStatus) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    showNotification(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`)
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
    showNotification("Order status updated successfully")
  }

  const handleSaveSettings = () => {
    // In a real app, this would update settings via API
    setShowSettingsModal(false)
    showNotification("Settings saved successfully")
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

  const categories = [...new Set(products.map((product) => product.category))]

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
              <h3 className="text-2xl font-bold">{orders.length}</h3>
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
              <h3 className="text-2xl font-bold">{users.length}</h3>
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
              <h3 className="text-2xl font-bold">{products.length}</h3>
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
            <BarChart3 className="h-32 w-32 text-gray-300" />
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
                    <button onClick={() => toggleOrderDetails(order.id)} className="text-[#2874f0] hover:text-blue-700">
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
        <h2 className="text-2xl font-bold">Products Management</h2>
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
                  Status
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
                    {userRoleEdit.userId === user.id ? (
                      <div className="flex items-center">
                        <select
                          value={userRoleEdit.role}
                          onChange={(e) => setUserRoleEdit({ ...userRoleEdit, role: e.target.value })}
                          className="border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                        >
                          <option value="user">User</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleUpdateUserRole(user.id, userRoleEdit.role)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setUserRoleEdit({ userId: null, role: "" })}
                          className="ml-1 text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
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
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleUserDetails(user.id)}
                      className="text-[#2874f0] hover:text-blue-700 mr-2"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setUserRoleEdit({ userId: user.id, role: user.role })}
                      className="text-[#2874f0] hover:text-blue-700 mr-2"
                    >
                      <Edit size={16} />
                    </button>
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleUpdateUserStatus(user.id, "inactive")}
                        className="text-red-600 hover:text-red-800"
                        title="Deactivate User"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateUserStatus(user.id, "active")}
                        className="text-green-600 hover:text-green-800"
                        title="Activate User"
                      >
                        <Check size={16} />
                      </button>
                    )}
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
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
              <input
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Currency</label>
              <select
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
              <select
                value={storeSettings.language}
                onChange={(e) => setStoreSettings({ ...storeSettings, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
              >
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
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={storeSettings.enableCreditCard}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableCreditCard: e.target.checked })}
                />
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
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={storeSettings.enableUPI}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableUPI: e.target.checked })}
                />
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
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={storeSettings.enableCashOnDelivery}
                  onChange={(e) => setStoreSettings({ ...storeSettings, enableCashOnDelivery: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleSaveSettings}
            className="bg-[#2874f0] text-white px-4 py-2 rounded-sm hover:bg-blue-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )

  const renderHomePage = () => (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Home Page Management</h1>
        <p className="text-gray-600">Customize your store's home page layout and featured content</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Components Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Page Components</h2>
            
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search components..."
                  value={componentSearchQuery}
                  onChange={(e) => setComponentSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-4">
              {homePageComponents
                .filter(comp => comp.name.toLowerCase().includes(componentSearchQuery.toLowerCase()))
                .map(component => (
                <div 
                  key={component.id} 
                  className={`border rounded-lg p-3 ${component.enabled ? 'bg-gray-50' : 'bg-gray-100 opacity-70'} cursor-pointer hover:bg-blue-50 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800">{component.name}</h3>
                    <div className="flex items-center space-x-1">
                      {component.order > 1 && (
                        <button 
                          onClick={() => moveComponentUp(component.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      )}
                      {component.order < homePageComponents.length && (
                        <button 
                          onClick={() => moveComponentDown(component.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => toggleComponentVisibility(component.id)}
                        className={`p-1 ${component.enabled ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                        title={component.enabled ? "Disable" : "Enable"}
                      >
                        {component.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{component.description}</p>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button 
                      onClick={() => setEditingComponent(component)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteComponent(component.id)}
                      className="text-red-600 text-sm font-medium hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border border-dashed rounded-lg p-3">
                <h3 className="font-medium text-gray-800 mb-2">Add New Component</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addNewComponent('banner')}
                    className="flex items-center justify-center py-2 px-2 border rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Image className="w-4 h-4 mr-1 text-blue-600" />
                    <span>Banner</span>
                  </button>
                  <button
                    onClick={() => addNewComponent('categories')}
                    className="flex items-center justify-center py-2 px-2 border rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Grid className="w-4 h-4 mr-1 text-blue-600" />
                    <span>Categories</span>
                  </button>
                  <button
                    onClick={() => addNewComponent('products')}
                    className="flex items-center justify-center py-2 px-2 border rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1 text-blue-600" />
                    <span>Products</span>
                  </button>
                  <button
                    onClick={() => addNewComponent('offers')}
                    className="flex items-center justify-center py-2 px-2 border rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Tag className="w-4 h-4 mr-1 text-blue-600" />
                    <span>Offers</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Featured Products</h2>
            
            <div className="space-y-3">
              {products.filter(p => p.featured).length === 0 ? (
                <p className="text-sm text-gray-500 italic">No featured products yet</p>
              ) : (
                products.filter(p => p.featured).map(product => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-contain mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">₹{product.price}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFeaturedProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove from featured"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
              
              <button
                onClick={() => setShowFeaturedProductModal(true)}
                className="w-full flex items-center justify-center py-2 border border-dashed rounded-lg hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-1 text-blue-600" />
                <span className="text-blue-600 text-sm">Add Featured Product</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Home Page Preview</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </button>
                <button 
                  onClick={saveHomePageSettings}
                  disabled={isSavingHomePage}
                  className="flex items-center px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 disabled:opacity-50"
                >
                  {isSavingHomePage ? (
                    <>
                      <Loader className="w-4 h-4 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 overflow-hidden bg-gray-50">
              <div className="w-full h-[600px] overflow-y-auto bg-white">
                <HomePage 
                  components={homePageComponents.filter(c => c.enabled).sort((a, b) => a.order - b.order)} 
                  featuredProducts={products.filter(p => p.featured)}
                  settings={homePageSettings}
                />
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Homepage Layout
                </label>
                <select 
                  value={homePageSettings.layout}
                  onChange={(e) => setHomePageSettings({...homePageSettings, layout: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                >
                  <option value="standard">Standard Layout</option>
                  <option value="grid">Grid Layout</option>
                  <option value="modern">Modern Layout</option>
                  <option value="minimal">Minimal Layout</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Products per row
                </label>
                <select 
                  value={homePageSettings.productsPerRow}
                  onChange={(e) => setHomePageSettings({...homePageSettings, productsPerRow: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                >
                  <option value="3">3 Products</option>
                  <option value="4">4 Products</option>
                  <option value="5">5 Products</option>
                  <option value="6">6 Products</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Show banner carousel
                  </label>
                  <p className="text-xs text-gray-500">Display rotating banners at the top</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={homePageSettings.showBannerCarousel}
                    onChange={() => setHomePageSettings({
                      ...homePageSettings, 
                      showBannerCarousel: !homePageSettings.showBannerCarousel
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Show featured categories
                  </label>
                  <p className="text-xs text-gray-500">Display category navigation blocks</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={homePageSettings.showFeaturedCategories}
                    onChange={() => setHomePageSettings({
                      ...homePageSettings, 
                      showFeaturedCategories: !homePageSettings.showFeaturedCategories
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Selection Modal */}
      {showFeaturedProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Featured Products</h2>
                <button 
                  onClick={() => setShowFeaturedProductModal(false)} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={featuredProductSearch}
                    onChange={(e) => setFeaturedProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                {filteredProductsForFeaturing.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    {featuredProductSearch 
                      ? "No products found matching your search." 
                      : "All products are already featured."}
                  </p>
                ) : (
                  filteredProductsForFeaturing.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-contain mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-500">₹{product.price} · {product.category}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => addFeaturedProduct(product.id)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        Add
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowFeaturedProductModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowFeaturedProductModal(false);
                    showNotification("Featured products updated successfully");
                  }}
                  className="px-4 py-2 bg-[#2874f0] text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Component Edit Modal */}
      {editingComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Component</h2>
                <button 
                  onClick={() => setEditingComponent(null)} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Component Name
                  </label>
                  <input
                    type="text"
                    value={editingComponent.name}
                    onChange={(e) => setEditingComponent({...editingComponent, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingComponent.description}
                    onChange={(e) => setEditingComponent({...editingComponent, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Component Type
                  </label>
                  <select
                    value={editingComponent.type}
                    onChange={(e) => setEditingComponent({...editingComponent, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                  >
                    <option value="banner">Banner</option>
                    <option value="categories">Categories</option>
                    <option value="featuredProducts">Featured Products</option>
                    <option value="products">Products Grid</option>
                    <option value="offers">Special Offers</option>
                    <option value="custom">Custom Component</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Enabled
                    </label>
                    <p className="text-xs text-gray-500">Show this component on the homepage</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={editingComponent.enabled}
                      onChange={() => setEditingComponent({
                        ...editingComponent, 
                        enabled: !editingComponent.enabled
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2874f0]"></div>
                  </label>
                </div>
                
                {/* Component-specific settings based on component type */}
                {editingComponent.type === 'banner' && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Banner Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Banner Image URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://example.com/banner.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Link URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://example.com/promo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {editingComponent.type === 'featuredProducts' && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Featured Products Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Featured Products"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Number of products to display
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0]">
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="12">12</option>
                          <option value="16">16</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setEditingComponent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateComponentSettings(editingComponent)}
                  className="px-4 py-2 bg-[#2874f0] text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // API function mocks for HomePage management
  const saveHomePageSettings = async () => {
    try {
      setIsSavingHomePage(true)
      // In a real app, this would be an API call to update homepage settings
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
      showNotification("Homepage settings saved successfully")
    } catch (error) {
      console.error("Error saving homepage settings:", error)
      showNotification("Failed to save homepage settings", "error")
    } finally {
      setIsSavingHomePage(false)
    }
  }

  const updateComponentOrder = (componentId, newOrder) => {
    setHomePageComponents(prev => {
      const updated = [...prev].map(comp => {
        if (comp.id === componentId) {
          return { ...comp, order: newOrder }
        }
        return comp
      })
      return updated.sort((a, b) => a.order - b.order)
    })
    // In a real app, you would call an API to update the order in the backend
  }

  const moveComponentUp = (componentId) => {
    const components = [...homePageComponents]
    const index = components.findIndex(c => c.id === componentId)
    if (index > 0) {
      // Swap with the component above it
      const temp = { ...components[index - 1] }
      components[index - 1] = { ...components[index], order: components[index].order - 1 }
      components[index] = { ...temp, order: temp.order + 1 }
      setHomePageComponents(components.sort((a, b) => a.order - b.order))
      // In a real app, you would call an API to update the order
    }
  }

  const moveComponentDown = (componentId) => {
    const components = [...homePageComponents]
    const index = components.findIndex(c => c.id === componentId)
    if (index < components.length - 1) {
      // Swap with the component below it
      const temp = { ...components[index + 1] }
      components[index + 1] = { ...components[index], order: components[index].order + 1 }
      components[index] = { ...temp, order: temp.order - 1 }
      setHomePageComponents(components.sort((a, b) => a.order - b.order))
      // In a real app, you would call an API to update the order
    }
  }

  const toggleComponentVisibility = (componentId) => {
    setHomePageComponents(prev =>
      prev.map(comp =>
        comp.id === componentId ? { ...comp, enabled: !comp.enabled } : comp
      )
    )
    // In a real app, you would call an API to update the component status
  }

  const deleteComponent = (componentId) => {
    setHomePageComponents(prev => prev.filter(comp => comp.id !== componentId))
    showNotification("Component removed successfully")
    // In a real app, you would call an API to delete the component
  }

  const addNewComponent = (componentType) => {
    const newId = Math.max(...homePageComponents.map(c => c.id)) + 1
    const newOrder = homePageComponents.length + 1
    const newComponentTypes = {
      banner: "New Banner",
      categories: "Category Section",
      products: "Products Grid",
      offers: "Offers Section",
      custom: "Custom Component"
    }
    
    const newComponent = {
      id: newId,
      name: newComponentTypes[componentType] || "New Component",
      type: componentType,
      enabled: true,
      description: "Newly added component",
      order: newOrder
    }
    
    setHomePageComponents([...homePageComponents, newComponent])
    setEditingComponent(newComponent)
    showNotification("New component added")
    // In a real app, you would call an API to add the component
  }

  const updateComponentSettings = (component) => {
    setHomePageComponents(prev =>
      prev.map(comp =>
        comp.id === component.id ? { ...component } : comp
      )
    )
    setEditingComponent(null)
    showNotification("Component updated successfully")
    // In a real app, you would call an API to update the component
  }

  const removeFeaturedProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, featured: false } : p
    ))
    showNotification("Product removed from featured list")
    // In a real app, you would call an API to update the product
  }

  const addFeaturedProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, featured: true } : p
    ))
    showNotification("Product added to featured list")
    // In a real app, you would call an API to update the product
  }

  // Filter products for featured products modal
  const filteredProductsForFeaturing = products
    .filter(p => !p.featured && 
      (p.name.toLowerCase().includes(featuredProductSearch.toLowerCase()) || 
       p.category.toLowerCase().includes(featuredProductSearch.toLowerCase()))
    )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600">Welcome, {currentUser?.displayName || "Admin"}</p>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "products" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package className="w-5 h-5 mr-2" />
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "users" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("homepage")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "homepage" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                Home Page
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center w-full px-4 py-2.5 text-left ${
                  activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </button>
            </li>
          </ul>
          <div className="border-t mt-4 pt-4 px-4">
            <button
              onClick={logout}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-white shadow-md w-full p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`${activeTab === "dashboard" ? "text-blue-600" : "text-gray-600"}`}
          >
            <BarChart3 className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`${activeTab === "products" ? "text-blue-600" : "text-gray-600"}`}
          >
            <Package className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`${activeTab === "orders" ? "text-blue-600" : "text-gray-600"}`}
          >
            <ShoppingBag className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`${activeTab === "users" ? "text-blue-600" : "text-gray-600"}`}
          >
            <Users className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab("homepage")}
            className={`${activeTab === "homepage" ? "text-blue-600" : "text-gray-600"}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`${activeTab === "settings" ? "text-blue-600" : "text-gray-600"}`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Notification */}
        {notification.show && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                : "bg-red-100 text-red-800 border-l-4 border-red-500"
            }`}
          >
            <div className="flex items-center">
              {notification.type === "success" ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2" />
              )}
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification({ ...notification, show: false })}
                className="ml-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "homepage" && renderHomePage()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  )
}

// Missing icons
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
