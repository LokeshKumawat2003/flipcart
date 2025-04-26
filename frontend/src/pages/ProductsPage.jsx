

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductFilter from "../components/ProductFilter"
import { fetchProducts, fetchCategories, fetchBrands } from "../services/api"
import { ChevronDown, X, Search, Filter, Grid, List } from "lucide-react"

const ProductsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [viewMode, setViewMode] = useState("grid") // grid or list

  // Get initial filters from URL
  const initialFilters = {
    categories: queryParams.get("category") ? [queryParams.get("category")] : [],
    brands: queryParams.get("brand") ? [queryParams.get("brand")] : [],
    priceRange: [
      Number.parseInt(queryParams.get("minPrice") || "0", 10),
      Number.parseInt(queryParams.get("maxPrice") || "100000", 10),
    ],
    rating: Number.parseInt(queryParams.get("rating") || "0", 10),
    sort: queryParams.get("sort") || "featured",
  }

  const [filters, setFilters] = useState(initialFilters)
  const [sortOption, setSortOption] = useState(initialFilters.sort)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [productsData, categoriesData, brandsData] = await Promise.all([
          fetchProducts({ ...filters, search: searchQuery, sort: sortOption }),
          fetchCategories(),
          fetchBrands(),
        ])

        setProducts(productsData)
        setCategories(categoriesData.map((cat) => cat.name))
        setBrands(brandsData)
      } catch (error) {
        console.error("Error loading products data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Update URL with filters
    const params = new URLSearchParams()
    if (filters.categories.length > 0) params.set("category", filters.categories[0])
    if (filters.brands.length > 0) params.set("brand", filters.brands[0])
    if (filters.priceRange[0] > 0) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] < 100000) params.set("maxPrice", filters.priceRange[1].toString())
    if (filters.rating > 0) params.set("rating", filters.rating.toString())
    if (sortOption !== "featured") params.set("sort", sortOption)
    if (searchQuery) params.set("search", searchQuery)

    navigate(`${location.pathname}?${params.toString()}`, { replace: true })

    // Calculate active filters count
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) count++
    if (filters.rating > 0) count++
    setActiveFiltersCount(count)
  }, [filters, sortOption, searchQuery, navigate, location.pathname])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // The search will be triggered by the useEffect when searchQuery changes
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 100000],
      rating: 0,
    })
    setSearchQuery("")
    setSortOption("featured")
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-medium text-gray-900">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : filters.categories.length > 0
                ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1)
                : "All Products"}
          </h1>
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="ml-2 text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search bar - visible on all devices */}
        <div className="mb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2874f0] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2 text-gray-500">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4 sticky top-16 z-10 bg-white shadow-sm">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-center w-full px-4 py-3 text-[#2874f0] font-medium"
          >
            <Filter size={18} className="mr-2" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="bg-white h-full w-4/5 max-w-xs overflow-y-auto">
                <div className="sticky top-0 z-10 bg-[#2874f0] text-white flex justify-between items-center p-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button onClick={toggleFilters} className="p-1">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilter
                    categories={categories}
                    brands={brands}
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                    isMobile={true}
                  />
                </div>
                <div className="sticky bottom-0 flex border-t border-gray-200 bg-white p-4">
                  <button
                    onClick={toggleFilters}
                    className="w-full bg-[#2874f0] text-white py-3 rounded-sm font-medium"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter
              categories={categories}
              brands={brands}
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="bg-white p-3 mb-4 flex justify-between items-center rounded-sm shadow-sm">
              <p className="text-sm text-gray-600">
                {loading ? "Loading products..." : `${products.length} results found`}
              </p>

              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 ${viewMode === "grid" ? "text-[#2874f0]" : "text-gray-500"}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 ${viewMode === "list" ? "text-[#2874f0]" : "text-gray-500"}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-300 rounded-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#2874f0] text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
              </div>
            ) : products.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 flex border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="w-40 h-40 flex-shrink-0">
                        <img
                          src={product.image || "https://via.placeholder.com/200"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-base font-medium text-gray-800 mb-1">{product.name}</h3>
                        {product.brand && <p className="text-xs text-gray-500 mb-1">{product.brand}</p>}

                        <div className="flex items-center mb-2">
                          <div className="flex items-center bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded">
                            <span>{product.rating}</span>
                            <Star size={10} className="ml-0.5 fill-current" />
                          </div>
                          <span className="text-gray-500 text-xs ml-2">(210)</span>
                        </div>

                        <div className="flex items-center mb-2">
                          <span className="text-gray-900 font-medium text-lg">
                            ₹
                            {(product.discount
                              ? product.price - (product.price * product.discount) / 100
                              : product.price
                            ).toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <>
                              <span className="text-gray-500 text-xs line-through ml-2">
                                ₹{product.price.toFixed(2)}
                              </span>
                              <span className="text-[#388e3c] text-xs font-medium ml-2">{product.discount}% off</span>
                            </>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Add to cart logic
                          }}
                          className="px-4 py-1.5 bg-[#ff9f00] text-white text-sm font-medium rounded-sm hover:bg-[#f39803] transition-colors"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="bg-white rounded-sm shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button onClick={clearAllFilters} className="bg-[#2874f0] text-white px-4 py-2 rounded-sm">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Star icon component
const Star = (props) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default ProductsPage
