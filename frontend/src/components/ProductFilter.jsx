

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

const ProductFilter = ({ categories, brands, onFilterChange, initialFilters = {}, isMobile = false }) => {
  const [filters, setFilters] = useState({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    priceRange: initialFilters.priceRange || [0, 100000],
    rating: initialFilters.rating || 0,
    ...initialFilters,
  })

  const [expanded, setExpanded] = useState({
    categories: !isMobile,
    brands: !isMobile,
    price: !isMobile,
    rating: !isMobile,
    discount: !isMobile,
    availability: !isMobile,
  })

  const [priceInput, setPriceInput] = useState({
    min: filters.priceRange[0],
    max: filters.priceRange[1],
  })

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const toggleCategory = (category) => {
    setFilters((prev) => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return { ...prev, categories: updatedCategories }
    })
  }

  const toggleBrand = (brand) => {
    setFilters((prev) => {
      const updatedBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand]

      return { ...prev, brands: updatedBrands }
    })
  }

  const handlePriceInputChange = (e, type) => {
    const value = Number.parseInt(e.target.value, 10) || 0
    setPriceInput((prev) => ({ ...prev, [type]: value }))
  }

  const applyPriceRange = () => {
    const min = Math.min(priceInput.min, priceInput.max)
    const max = Math.max(priceInput.min, priceInput.max)

    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }))
  }

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({ ...prev, rating }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 100000],
      rating: 0,
    })
    setPriceInput({ min: 0, max: 100000 })
  }

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className={`bg-white ${isMobile ? "p-4" : "rounded-sm shadow-sm p-4"}`}>
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="text-base font-medium text-gray-900 flex items-center">
          <Filter size={16} className="mr-2" /> Filters
        </h3>
        <button onClick={clearFilters} className="text-xs text-[#2874f0] hover:underline">
          CLEAR ALL
        </button>
      </div>

      {/* Categories */}
      <div className="mb-5 border-b pb-3">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => toggleSection("categories")}
        >
          <h4 className="text-sm font-medium text-gray-800">CATEGORIES</h4>
          {expanded.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.categories && (
          <div className="space-y-2 ml-1">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.categories.includes(category.toLowerCase())}
                  onChange={() => toggleCategory(category.toLowerCase())}
                  className="h-4 w-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-5 border-b pb-3">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection("price")}>
          <h4 className="text-sm font-medium text-gray-800">PRICE</h4>
          {expanded.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.price && (
          <div className="space-y-3 ml-1">
            <div className="flex items-center justify-between">
              <div className="w-2/5">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceInput.min}
                  onChange={(e) => handlePriceInputChange(e, "min")}
                  className="w-full px-2 py-1 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#2874f0]"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="w-2/5">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceInput.max}
                  onChange={(e) => handlePriceInputChange(e, "max")}
                  className="w-full px-2 py-1 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#2874f0]"
                />
              </div>
            </div>

            <button
              onClick={applyPriceRange}
              className="bg-[#2874f0] text-white text-xs font-medium px-3 py-1 rounded-sm"
            >
              APPLY
            </button>

            <div className="pt-2">
              <div className="relative h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute h-1 bg-[#2874f0] rounded-full"
                  style={{
                    left: `${(filters.priceRange[0] / 100000) * 100}%`,
                    right: `${100 - (filters.priceRange[1] / 100000) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="mb-5 border-b pb-3">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection("discount")}>
          <h4 className="text-sm font-medium text-gray-800">DISCOUNT</h4>
          {expanded.discount ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.discount && (
          <div className="space-y-2 ml-1">
            {[10, 20, 30, 40, 50, 60, 70].map((discount) => (
              <div key={discount} className="flex items-center">
                <input
                  type="checkbox"
                  id={`discount-${discount}`}
                  className="h-4 w-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
                />
                <label htmlFor={`discount-${discount}`} className="ml-2 text-sm text-gray-700">
                  {discount}% or more
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="mb-5 border-b pb-3">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection("brands")}>
          <h4 className="text-sm font-medium text-gray-800">BRAND</h4>
          {expanded.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.brands && (
          <div className="space-y-2 ml-1">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
                />
                <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection("availability")}>
          <h4 className="text-sm font-medium text-gray-800">AVAILABILITY</h4>
          {expanded.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.availability && (
          <div className="space-y-2 ml-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="availability-in-stock"
                className="h-4 w-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
              />
              <label htmlFor="availability-in-stock" className="ml-2 text-sm text-gray-700">
                In Stock
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFilter
