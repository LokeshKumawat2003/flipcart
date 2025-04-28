"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Filter, Search, Star, X } from "lucide-react"

const ProductFilter = ({ categories, brands, onFilterChange, initialFilters = {}, isMobile = false }) => {
  const [filters, setFilters] = useState({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    priceRange: initialFilters.priceRange || [0, 100000],
    rating: initialFilters.rating || 0,
    discount: initialFilters.discount || 0,
    availability: initialFilters.availability || false,
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

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    onFilterChange(filters)

    // Update active filters for display
    const newActiveFilters = []

    if (filters.categories.length > 0) {
      filters.categories.forEach((cat) => {
        newActiveFilters.push({
          type: "category",
          value: cat,
          label: `Category: ${cat}`,
        })
      })
    }

    if (filters.brands.length > 0) {
      filters.brands.forEach((brand) => {
        newActiveFilters.push({
          type: "brand",
          value: brand,
          label: `Brand: ${brand}`,
        })
      })
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) {
      newActiveFilters.push({
        type: "price",
        value: filters.priceRange,
        label: `Price: ₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`,
      })
    }

    if (filters.rating > 0) {
      newActiveFilters.push({
        type: "rating",
        value: filters.rating,
        label: `Rating: ${filters.rating}★ & above`,
      })
    }

    if (filters.discount > 0) {
      newActiveFilters.push({
        type: "discount",
        value: filters.discount,
        label: `Discount: ${filters.discount}% & above`,
      })
    }

    if (filters.availability) {
      newActiveFilters.push({
        type: "availability",
        value: true,
        label: "In Stock Only",
      })
    }

    setActiveFilters(newActiveFilters)
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
    setFilters((prev) => ({ ...prev, rating: prev.rating === rating ? 0 : rating }))
  }

  const handleDiscountChange = (discount) => {
    setFilters((prev) => ({ ...prev, discount: prev.discount === discount ? 0 : discount }))
  }

  const toggleAvailability = () => {
    setFilters((prev) => ({ ...prev, availability: !prev.availability }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 100000],
      rating: 0,
      discount: 0,
      availability: false,
    })
    setPriceInput({ min: 0, max: 100000 })
    setSearchQuery("")
  }

  const removeFilter = (type, value) => {
    if (type === "category") {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }))
    } else if (type === "brand") {
      setFilters((prev) => ({
        ...prev,
        brands: prev.brands.filter((b) => b !== value),
      }))
    } else if (type === "price") {
      setFilters((prev) => ({
        ...prev,
        priceRange: [0, 100000],
      }))
      setPriceInput({ min: 0, max: 100000 })
    } else if (type === "rating") {
      setFilters((prev) => ({
        ...prev,
        rating: 0,
      }))
    } else if (type === "discount") {
      setFilters((prev) => ({
        ...prev,
        discount: 0,
      }))
    } else if (type === "availability") {
      setFilters((prev) => ({
        ...prev,
        availability: false,
      }))
    }
  }

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Filter categories and brands based on search query
  const filteredCategories = searchQuery
    ? categories.filter((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories

  const filteredBrands = searchQuery
    ? brands.filter((brand) => brand.toLowerCase().includes(searchQuery.toLowerCase()))
    : brands

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

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <div key={index} className="flex items-center bg-blue-50 text-[#2874f0] px-2 py-1 rounded-sm text-xs">
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.type, filter.value)}
                  className="ml-1 text-[#2874f0] hover:text-blue-700"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Filter */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#2874f0]"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
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
          <div className="space-y-2 ml-1 max-h-60 overflow-y-auto">
            {filteredCategories.map((category) => (
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
            {filteredCategories.length === 0 && (
              <p className="text-sm text-gray-500">No categories match your search</p>
            )}
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

      {/* Rating */}
      <div className="mb-5 border-b pb-3">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection("rating")}>
          <h4 className="text-sm font-medium text-gray-800">CUSTOMER RATINGS</h4>
          {expanded.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.rating && (
          <div className="space-y-2 ml-1">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2874f0] focus:ring-[#2874f0]"
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  {rating}
                  <Star size={12} className="ml-1 fill-current text-yellow-500" /> & above
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="mb-5 border-b pb-3">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => toggleSection("discount")}
        >
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
                  checked={filters.discount === discount}
                  onChange={() => handleDiscountChange(discount)}
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
          <div className="space-y-2 ml-1 max-h-60 overflow-y-auto">
            {filteredBrands.map((brand) => (
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
            {filteredBrands.length === 0 && <p className="text-sm text-gray-500">No brands match your search</p>}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => toggleSection("availability")}
        >
          <h4 className="text-sm font-medium text-gray-800">AVAILABILITY</h4>
          {expanded.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.availability && (
          <div className="space-y-2 ml-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="availability-in-stock"
                checked={filters.availability}
                onChange={toggleAvailability}
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
