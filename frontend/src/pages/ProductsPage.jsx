"use client"

import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import ProductFilter from "../components/ProductFilter"
import { productService, categoryService } from "../services/apiService"
import { ChevronDown, X, Search, Filter, Grid, List } from "lucide-react"
import { Link } from "react-router-dom"

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

  // Listen for URL changes to update all filter values
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");
    const brandParam = params.get("brand");
    const minPriceParam = params.get("minPrice");
    const maxPriceParam = params.get("maxPrice");
    const ratingParam = params.get("rating");
    const sortParam = params.get("sort");
    
    // Update search query
    setSearchQuery(searchParam || "");
    
    // Update filters
    setFilters({
      categories: categoryParam ? [categoryParam] : [],
      brands: brandParam ? [brandParam] : [],
      priceRange: [
        minPriceParam ? Number.parseInt(minPriceParam, 10) : 0,
        maxPriceParam ? Number.parseInt(maxPriceParam, 10) : 100000,
      ],
      rating: ratingParam ? Number.parseInt(ratingParam, 10) : 0,
    });
    
    // Update sort option
    setSortOption(sortParam || "featured");
    
    // Force reload data by setting loading state
    setLoading(true);
  }, [location.search]);

  // Remove the duplicate effect that was updating URL since we're handling URL changes now
  // and keep only the data loading effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          productService.getProducts({ ...filters, search: searchQuery, sort: sortOption }),
          categoryService.getCategories(),
          productService.getProducts({ limit: 100 }), // Use this to get unique brands
        ])
        
        setProducts(productsData.data.data || [])
        setCategories(categoriesData.data.data || [])
        
        // Extract unique brands from products
        const uniqueBrands = [...new Set((productsData.data.data || []).map(product => product.brand))];
        setBrands(uniqueBrands)
        
        setTotalItems(productsData.data.total || 0)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery, filters, sortOption, currentPage])

  // Update URL when filters change - only run when filters are changed programmatically
  // not from URL changes
  useEffect(() => {
    // Skip initial render or URL-triggered filter changes
    if (location.search) {
      const currentParams = new URLSearchParams(location.search);
      const currentCategory = currentParams.get("category");
      const currentBrand = currentParams.get("brand");
      const currentSort = currentParams.get("sort");
      
      // If these match our state, this effect was triggered by URL change, so skip it
      if (
        (currentCategory === (filters.categories[0] || null)) &&
        (currentBrand === (filters.brands[0] || null)) &&
        (currentSort === sortOption || (currentSort === null && sortOption === "featured"))
      ) {
        return;
      }
    }
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (filters.categories.length > 0) params.set("category", filters.categories[0]);
    if (filters.brands.length > 0) params.set("brand", filters.brands[0]);
    if (filters.priceRange[0] > 0) params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1] < 100000) params.set("maxPrice", filters.priceRange[1].toString());
    if (filters.rating > 0) params.set("rating", filters.rating.toString());
    if (sortOption !== "featured") params.set("sort", sortOption);
    if (searchQuery) params.set("search", searchQuery);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });

    // Calculate active filters count
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) count++;
    if (filters.rating > 0) count++;
    setActiveFiltersCount(count);
  }, [filters, sortOption, searchQuery, navigate, location.pathname]);

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
    // Update the URL with the search query
    const params = new URLSearchParams(location.search)
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    } else {
      params.delete("search")
    }
    navigate(`${location.pathname}?${params.toString()}`)
    
    // Focus on results when search is submitted
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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

  // New function to highlight search terms in product descriptions
  const highlightSearchTerm = (text) => {
    if (!searchQuery || !text) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <mark key={i} className="bg-yellow-100 px-0.5">{part}</mark> 
        : part
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-medium text-gray-900">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : filters.categories.length > 0
                ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1)
                : "All Products"}
          </h1>
          {searchQuery && (
            <button onClick={() => {
              setSearchQuery("")
              // Update URL to remove search parameter
              const params = new URLSearchParams(location.search)
              params.delete("search")
              navigate(`${location.pathname}?${params.toString()}`)
            }} className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100">
              <X size={18} />
            </button>
          )}
          
          {/* Show current category indicator */}
          {filters.categories.length > 0 && !searchQuery && (
            <div className="ml-2 flex items-center">
              <span className="text-xs text-gray-500">|</span>
              <span className="ml-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {filters.categories[0]}
              </span>
              <button 
                onClick={() => {
                  // Clear category and update URL
                  const newFilters = {...filters, categories: []};
                  setFilters(newFilters);
                  
                  const params = new URLSearchParams(location.search);
                  params.delete("category");
                  navigate(`${location.pathname}?${params.toString()}`);
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </div>
          )}
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
            <div className="bg-white p-4 rounded-sm shadow-sm mb-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in results..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("")
                        // Update URL to remove search parameter
                        const params = new URLSearchParams(location.search)
                        params.delete("search")
                        navigate(`${location.pathname}?${params.toString()}`)
                      }}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>
            
              <ProductFilter
                categories={categories}
                brands={brands}
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </div>
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
              <>
                {searchQuery && (
                  <div className="bg-blue-50 p-3 mb-4 rounded-sm shadow-sm border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">{products.length}</span> results found for "<span className="font-medium">{searchQuery}</span>"
                    </p>
                  </div>
                )}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
                            src={product.image || "https://placehold.co/200x200/ffffff/000000"}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
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

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{highlightSearchTerm(product.description)}</p>

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
                )}
              </>
            ) : (
              <div className="bg-white p-8 text-center rounded-sm shadow-sm">
                <img
                  src="https://placehold.co/200x200/ffffff/000000?text=No+Results"
                  alt="No results"
                  className="mx-auto mb-4 w-32 h-32 opacity-50"
                />
                <h2 className="text-xl font-medium text-gray-800 mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-blue-600 transition-colors"
                >
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
