

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { ChevronRight, ChevronLeft, Clock, TrendingUp, Gift, Percent } from "lucide-react"
import { fetchFeaturedProducts, fetchNewArrivals, fetchCategories } from "../services/api"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const timerRef = useRef(null)

  const banners = [
    {
      id: 1,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20",
      alt: "Big Savings Days Sale",
      url: "/products?sale=true",
    },
    {
      id: 2,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
      alt: "New Season Collection",
      url: "/products?new=true",
    },
    {
      id: 3,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/aa1b2bdcf519b468.jpg?q=20",
      alt: "Electronics Sale",
      url: "/products?category=electronics",
    },
    {
      id: 4,
      image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20",
      alt: "Fashion Sale",
      url: "/products?category=fashion",
    },
  ]

  const dealsOfTheDay = [
    {
      id: 1,
      name: "Best of Electronics",
      image:
        "https://rukminim1.flixcart.com/image/200/200/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70",
      discount: "Up to 80% Off",
      brand: "Canon, Sony, Fujifilm",
      url: "/products?category=electronics",
    },
    {
      id: 2,
      name: "Best of Home Appliances",
      image:
        "https://rukminim1.flixcart.com/image/200/200/xif0q/refrigerator-new/h/a/k/-original-imaggsgpbfpwwgt7.jpeg?q=70",
      discount: "Up to 65% Off",
      brand: "Samsung, LG, Whirlpool",
      url: "/products?category=appliances",
    },
    {
      id: 3,
      name: "Fashion Top Deals",
      image: "https://rukminim1.flixcart.com/image/200/200/l3rmzrk0/shoe/u/b/u/-original-imagetgzg8crupfk.jpeg?q=70",
      discount: "Min 50% Off",
      brand: "Nike, Adidas, Puma",
      url: "/products?category=fashion",
    },
    {
      id: 4,
      name: "Top Deals on Furniture",
      image:
        "https://rukminim1.flixcart.com/image/200/200/jlph9jk0/cycle/h/f/k/skyper-26t-sskp26bk0001-16-hero-original-imaf8ru5xysfgtmx.jpeg?q=70",
      discount: "From ₹1,999",
      brand: "Modern, Vintage, Classic",
      url: "/products?category=furniture",
    },
    {
      id: 5,
      name: "Best of Toys",
      image:
        "https://rukminim1.flixcart.com/image/200/200/kzfvzww0/stuffed-toy/t/w/m/cute-nylex-mother-teddy-with-2-babies-40-fluffies-original-imagbgc6zcgfh3xz.jpeg?q=70",
      discount: "Up to 70% Off",
      brand: "Disney, Barbie, Lego",
      url: "/products?category=toys",
    },
    {
      id: 6,
      name: "Premium Mobiles",
      image:
        "https://rukminim1.flixcart.com/image/200/200/ks0onm80/monitor/w/6/6/ha270-um-hw0si-a01-acer-original-imag5zjnk4yad4uz.jpeg?q=70",
      discount: "Up to ₹20,000 Off",
      brand: "Apple, Samsung, Google",
      url: "/products?category=mobiles",
    },
    {
      id: 7,
      name: "Best of Beauty",
      image:
        "https://rukminim1.flixcart.com/image/200/200/kx50gi80/pen/h/z/k/119766-flair-original-imag9nzubznagufg.jpeg?q=70",
      discount: "From ₹99",
      brand: "Lakme, Maybelline, MAC",
      url: "/products?category=beauty",
    },
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredData, newArrivalsData, categoriesData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchNewArrivals(),
          fetchCategories(),
        ])

        setFeaturedProducts(featuredData)
        setNewArrivals(newArrivalsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading homepage data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Auto-rotate banners
    timerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timerRef.current)
  }, [banners.length])

  const nextBanner = () => {
    clearInterval(timerRef.current)
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    timerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)
  }

  const prevBanner = () => {
    clearInterval(timerRef.current)
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
    timerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Carousel */}
      <div className="relative mb-1">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-full">
                <Link to={banner.url}>
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.alt}
                    className="w-full h-auto object-cover"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevBanner}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>

        <button
          onClick={nextBanner}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100"
        >
          <ChevronRight size={20} className="text-gray-800" />
        </button>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                clearInterval(timerRef.current)
                setCurrentBannerIndex(index)
                timerRef.current = setInterval(() => {
                  setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
                }, 5000)
              }}
              className={`w-2 h-2 rounded-full ${currentBannerIndex === index ? "bg-[#2874f0]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white mb-1 py-4 px-4">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="flex flex-col items-center category-card"
            >
              <div className="w-16 h-16 mb-2">
                <img
                  src={category.image || "https://via.placeholder.com/80"}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-center font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Deals of the Day */}
      <div className="bg-white mb-1 p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center">
            <h2 className="text-xl font-medium">Deals of the Day</h2>
            <Clock size={18} className="ml-2 text-gray-600" />
            <div className="ml-2 text-sm text-gray-600">
              <span className="font-medium">22:10:36 Left</span>
            </div>
          </div>
          <Link to="/products?deals=true" className="text-[#2874f0] flex items-center text-sm font-medium">
            VIEW ALL <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {dealsOfTheDay.map((deal) => (
            <Link
              key={deal.id}
              to={deal.url}
              className="flex flex-col items-center p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-32 mb-4">
                <img src={deal.image || "/placeholder.svg"} alt={deal.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-sm font-medium text-center">{deal.name}</h3>
              <p className="text-sm text-green-600 mt-1">{deal.discount}</p>
              <p className="text-xs text-gray-500 mt-1">{deal.brand}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mid Banner */}
      <div className="mb-1">
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/2000/150/image/7b4f2ce4d9a1e740.jpg?q=50"
          alt="Special Offers"
          className="w-full h-auto"
        />
      </div>

      {/* Featured Products */}
      <div className="bg-white mb-1 p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center">
            <h2 className="text-xl font-medium">Featured Products</h2>
            <TrendingUp size={18} className="ml-2 text-gray-600" />
          </div>
          <Link to="/products?featured=true" className="text-[#2874f0] flex items-center text-sm font-medium">
            VIEW ALL <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="bg-white mb-1 p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center">
            <h2 className="text-xl font-medium">New Arrivals</h2>
            <Gift size={18} className="ml-2 text-gray-600" />
          </div>
          <Link to="/products?sort=newest" className="text-[#2874f0] flex items-center text-sm font-medium">
            VIEW ALL <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {newArrivals.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Discount Section */}
      <div className="bg-white mb-1 p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center">
            <h2 className="text-xl font-medium">Top Discounts</h2>
            <Percent size={18} className="ml-2 text-gray-600" />
          </div>
          <Link to="/products?discount=true" className="text-[#2874f0] flex items-center text-sm font-medium">
            VIEW ALL <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Up to 80% Off</h3>
            <p className="mb-4">End of Season Sale</p>
            <Link
              to="/products?discount=80"
              className="bg-white text-indigo-600 px-4 py-2 rounded-sm font-medium inline-block"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-md p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Buy 1 Get 1 Free</h3>
            <p className="mb-4">On Selected Fashion Items</p>
            <Link
              to="/products?offer=bogo"
              className="bg-white text-pink-600 px-4 py-2 rounded-sm font-medium inline-block"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-md p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Clearance Sale</h3>
            <p className="mb-4">Everything Must Go!</p>
            <Link
              to="/products?clearance=true"
              className="bg-white text-teal-600 px-4 py-2 rounded-sm font-medium inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="bg-white mb-1 p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-medium">Featured Brands</h2>
          <Link to="/brands" className="text-[#2874f0] flex items-center text-sm font-medium">
            VIEW ALL <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=brand${brand}`}
              className="bg-gray-50 p-4 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <img
                src={`https://via.placeholder.com/150x80/ffffff/333333?text=Brand+${brand}`}
                alt={`Brand ${brand}`}
                className="max-h-12"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "Free Shipping",
              description: "On orders over ₹500",
              icon: (
                <svg
                  className="w-10 h-10 mx-auto mb-4 text-[#2874f0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              ),
            },
            {
              id: 2,
              title: "Easy Returns",
              description: "10-day return policy",
              icon: (
                <svg
                  className="w-10 h-10 mx-auto mb-4 text-[#2874f0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
              ),
            },
            {
              id: 3,
              title: "Secure Payments",
              description: "Multiple payment options",
              icon: (
                <svg
                  className="w-10 h-10 mx-auto mb-4 text-[#2874f0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.id} className="text-center p-4 border border-gray-100">
              {feature.icon}
              <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
