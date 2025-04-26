

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { fetchProductById, fetchRelatedProducts } from "../services/api"
import ProductCard from "../components/ProductCard"
import { Star, Truck, Heart, ThumbsUp, ThumbsDown, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [expandedSpecs, setExpandedSpecs] = useState(false)
  const [pincode, setPincode] = useState("")
  const [deliveryInfo, setDeliveryInfo] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const productData = await fetchProductById(id)
        setProduct(productData)

        if (productData) {
          const related = await fetchRelatedProducts(productData.category)
          setRelatedProducts(related.filter((p) => p.id !== productData.id).slice(0, 6))
        }
      } catch (error) {
        console.error("Error loading product details:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // Reset state when product ID changes
    setSelectedImage(0)
    setQuantity(1)
    setActiveTab("description")
    setShowFullDescription(false)
    setShowAllReviews(false)
    setExpandedSpecs(false)
    setPincode("")
    setDeliveryInfo(null)

    // Scroll to top when navigating between products
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      // Show a toast or notification here
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity)
      navigate("/checkout")
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const checkDelivery = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      // In a real app, this would be an API call to check delivery availability
      setDeliveryInfo({
        available: true,
        days: 2,
        cod: true,
      })
    } else {
      setDeliveryInfo({
        available: false,
        message: "Please enter a valid 6-digit pincode",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for could not be found. It may have been removed or is no longer available.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#2874f0] text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const { name, price, description, image, rating, reviews, stock, brand, discount, specifications } = product

  // Calculate discounted price if there's a discount
  const discountedPrice = discount ? price - (price * discount) / 100 : price

  // Calculate savings
  const savings = discount ? (price - discountedPrice).toFixed(2) : 0

  // Mock images array (in a real app, this would come from the product data)
  const images = [
    image || "https://via.placeholder.com/400",
    "https://via.placeholder.com/400?text=Image+2",
    "https://via.placeholder.com/400?text=Image+3",
    "https://via.placeholder.com/400?text=Image+4",
    "https://via.placeholder.com/400?text=Image+5",
  ]

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <nav className="flex text-xs mb-4 text-gray-500">
          <Link to="/" className="hover:text-[#2874f0]">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to="/products" className="hover:text-[#2874f0]">
            Products
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-[#2874f0]">
            {product.category}
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-800 truncate">{name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Product Images - Left Column */}
          <div className="lg:w-2/5">
            <div className="bg-white p-4 sticky top-20">
              <div className="flex">
                {/* Thumbnails */}
                <div className="w-16 mr-3 space-y-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 w-14 h-14 flex items-center justify-center ${
                        selectedImage === index ? "border-[#2874f0]" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${name} - Thumbnail ${index + 1}`}
                        className="max-h-12 max-w-12 object-contain"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 border border-gray-200 h-96 flex items-center justify-center relative group">
                  <img
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={name}
                    className="max-h-80 max-w-full object-contain"
                  />

                  {/* Wishlist button */}
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md text-gray-500 hover:text-[#2874f0]">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={stock <= 0}
                  className="bg-[#ff9f00] text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center hover:bg-[#f39803] transition-colors"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={stock <= 0}
                  className="bg-[#fb641b] text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Zap size={18} className="mr-2" />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Product Info - Right Column */}
          <div className="lg:w-3/5">
            <div className="bg-white p-4 mb-4">
              <h1 className="text-xl font-medium text-gray-800 mb-1">{name}</h1>

              {/* Ratings */}
              <div className="flex items-center mb-3">
                <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
                  <span>{rating}</span>
                  <Star size={12} className="ml-0.5 fill-current" />
                </div>
                <span className="text-gray-500 text-xs ml-2">({reviews.length} Ratings & Reviews)</span>

                {stock > 0 ? (
                  <span className="ml-3 text-[#388e3c] text-sm">In Stock</span>
                ) : (
                  <span className="ml-3 text-red-500 text-sm">Out of Stock</span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-3xl font-medium text-gray-900">₹{discountedPrice.toFixed(2)}</span>
                  {discount > 0 && (
                    <>
                      <span className="ml-3 text-gray-500 line-through">₹{price.toFixed(2)}</span>
                      <span className="ml-3 text-[#388e3c] font-medium">{discount}% off</span>
                    </>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-xs text-[#388e3c] mt-1">You Save: ₹{savings} (Inclusive of all taxes)</p>
                )}
              </div>

              {/* Offers */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Available offers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Tag size={16} className="text-[#388e3c] mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium">Bank Offer:</span> 10% off on HDFC Bank Credit Card, up to ₹1500. On
                      orders of ₹5000 and above
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Tag size={16} className="text-[#388e3c] mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium">No Cost EMI:</span> Avail No Cost EMI on select cards for orders
                      above ₹3000
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Tag size={16} className="text-[#388e3c] mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium">Partner Offer:</span> Get GST invoice and save up to 28% on business
                      purchases
                    </div>
                  </li>
                </ul>
              </div>

              {/* Delivery */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Delivery</h3>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Enter delivery pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-40 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#2874f0]"
                  />
                  <button onClick={checkDelivery} className="ml-2 text-[#2874f0] text-sm font-medium">
                    Check
                  </button>
                </div>

                {deliveryInfo && (
                  <div className="mt-2 text-sm">
                    {deliveryInfo.available ? (
                      <div>
                        <div className="flex items-center text-[#388e3c]">
                          <Truck size={16} className="mr-2" />
                          <span>
                            Delivery by {new Date(Date.now() + deliveryInfo.days * 86400000).toLocaleDateString()} |{" "}
                            <span className="text-[#388e3c]">Free</span>{" "}
                            <span className="line-through text-gray-500">₹40</span>
                          </span>
                        </div>
                        {deliveryInfo.cod && <div className="mt-1 text-gray-600">Cash on Delivery available</div>}
                      </div>
                    ) : (
                      <div className="text-red-500">{deliveryInfo.message}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(specifications)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <li key={key} className="flex items-start text-sm">
                        <div className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 mr-2"></div>
                        <span>
                          {key}: {value}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-800">Specifications</h3>
                  <button
                    onClick={() => setExpandedSpecs(!expandedSpecs)}
                    className="text-[#2874f0] text-sm font-medium"
                  >
                    {expandedSpecs ? "Less" : "More"}{" "}
                    {expandedSpecs ? (
                      <ChevronUp size={16} className="inline" />
                    ) : (
                      <ChevronDown size={16} className="inline" />
                    )}
                  </button>
                </div>
                <div className="space-y-3">
                  {Object.entries(specifications)
                    .slice(0, expandedSpecs ? specifications.length : 3)
                    .map(([key, value]) => (
                      <div key={key} className="flex">
                        <div className="w-1/3 text-gray-500 text-sm">{key}</div>
                        <div className="w-2/3 text-sm">{value}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-800">Product Description</h3>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-[#2874f0] text-sm font-medium"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              </div>
              <div className="text-sm text-gray-700">
                {showFullDescription ? description : `${description.substring(0, 300)}...`}
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white p-4 mb-4">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Seller Information</h3>
              <div className="flex items-start">
                <div className="mr-4">
                  <h4 className="text-[#2874f0] font-medium">RetailNet</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
                      <span>4.8</span>
                      <Star size={10} className="ml-0.5 fill-current" />
                    </div>
                    <span className="text-gray-500 text-xs ml-2">(12,345 ratings)</span>
                  </div>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  <ul className="space-y-1">
                    <li>7 day seller replacement policy</li>
                    <li>GST invoice available</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Ratings & Reviews</h3>
                <button className="bg-[#2874f0] text-white px-3 py-1.5 text-sm rounded-sm">Rate Product</button>
              </div>

              <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                <div className="mr-6">
                  <div className="flex items-center bg-[#388e3c] text-white px-2 py-1 rounded text-lg font-medium">
                    {rating} <Star size={16} className="ml-1 fill-current" />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{reviews.length} ratings</div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-1">
                      <div className="flex items-center w-16">
                        <span className="text-sm mr-1">{star}</span>
                        <Star size={12} className="text-gray-400" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-[#388e3c] h-2 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{Math.floor(Math.random() * 1000)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-4">
                {reviews.slice(0, showAllReviews ? reviews.length : 2).map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
                        <span>{review.rating}</span>
                        <Star size={10} className="ml-0.5 fill-current" />
                      </div>
                      <h4 className="ml-2 text-sm font-medium text-gray-800">{review.title}</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <span>{review.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center text-gray-500 text-xs">
                          <ThumbsUp size={14} className="mr-1" /> Helpful
                        </button>
                        <button className="flex items-center text-gray-500 text-xs">
                          <ThumbsDown size={14} className="mr-1" /> Not Helpful
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {reviews.length > 2 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="text-[#2874f0] font-medium text-sm"
                  >
                    {showAllReviews ? "Show Less Reviews" : "Show All Reviews"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 bg-white p-4">
              <h2 className="text-xl font-medium">Similar Products</h2>
              <Link
                to={`/products?category=${product.category.toLowerCase()}`}
                className="text-[#2874f0] flex items-center text-sm"
              >
                VIEW ALL <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Missing icons
const ShoppingCart = (props) => (
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const Zap = (props) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const Tag = (props) => (
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
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

export default ProductDetailPage
