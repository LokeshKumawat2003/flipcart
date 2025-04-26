// This is a mock API service that simulates fetching data from a backend
// In a real application, this would be replaced with actual API calls

// Sample data
const products = [
  {
    id: 1,
    name: "APPLE iPhone 14 (Blue, 128 GB)",
    description:
      "The iPhone 14 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).",
    price: 69999,
    image: "https://via.placeholder.com/300/ffffff?text=iPhone+14",
    rating: 4.7,
    discount: 10,
    brand: "Apple",
    category: "Electronics",
    featured: true,
    date: "2023-09-01",
    stock: 15,
    specifications: {
      Display: "6.1-inch Super Retina XDR display",
      Processor: "A15 Bionic chip",
      Camera: "12MP dual camera system",
      Battery: "Up to 20 hours video playback",
      Storage: "128GB",
    },
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        title: "Amazing phone!",
        content:
          "This is the best iPhone I've ever owned. The camera is incredible and the battery life is much improved.",
        date: "2023-10-15",
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 4,
        title: "Great but expensive",
        content: "Love the phone but it's quite expensive. The features are worth it though.",
        date: "2023-09-28",
      },
    ],
  },
  {
    id: 2,
    name: "SAMSUNG Galaxy S23 Ultra (Green, 256 GB)",
    description:
      "The Samsung Galaxy S23 Ultra features a stunning display, powerful performance, and an advanced camera system for capturing your life's moments with incredible detail.",
    price: 124999,
    image: "https://via.placeholder.com/300/ffffff?text=Samsung+S23+Ultra",
    rating: 4.8,
    discount: 15,
    brand: "Samsung",
    category: "Electronics",
    featured: true,
    date: "2023-08-15",
    stock: 8,
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 2",
      Camera: "200MP quad camera system",
      Battery: "5000mAh",
      Storage: "256GB",
    },
    reviews: [
      {
        id: 1,
        author: "Mike Johnson",
        rating: 5,
        title: "Best Android phone",
        content: "This is hands down the best Android phone on the market. The camera is incredible!",
        date: "2023-09-10",
      },
    ],
  },
  {
    id: 3,
    name: "PUMA Men White Sneakers",
    description:
      "A pair of white sneakers from PUMA, has regular styling, lace-up detail. Synthetic leather upper. Cushioned footbed. Textured and patterned rubber outsole. Warranty: 3 months.",
    price: 3999,
    image: "https://via.placeholder.com/300/ffffff?text=PUMA+Sneakers",
    rating: 4.3,
    discount: 20,
    brand: "PUMA",
    category: "Footwear",
    featured: false,
    date: "2023-10-05",
    stock: 25,
    specifications: {
      Material: "Synthetic Leather",
      Sole: "Rubber",
      Closure: "Lace-Up",
      Pattern: "Solid",
      Warranty: "3 months",
    },
    reviews: [],
  },
  {
    id: 4,
    name: "boAt Airdopes 141 Bluetooth Headset",
    description:
      "The boAt Airdopes 141 TWS earbuds come with 8mm drivers that offer immersive sound quality. With a battery capacity that lasts for up to 42 hours, you can enjoy your favorite tunes for a long time.",
    price: 1499,
    image: "https://via.placeholder.com/300/ffffff?text=boAt+Airdopes",
    rating: 4.2,
    discount: 50,
    brand: "boAt",
    category: "Electronics",
    featured: true,
    date: "2023-11-01",
    stock: 50,
    specifications: {
      "Bluetooth Version": "5.0",
      "Battery Life": "Up to 42 Hours",
      "Driver Size": "8mm",
      "Charging Time": "1.5 Hours",
      Warranty: "1 Year",
    },
    reviews: [],
  },
  {
    id: 5,
    name: "Men Slim Fit Checkered Casual Shirt",
    description:
      "Blue and black checked casual shirt, has a spread collar, long sleeves, button placket, curved hem, and 1 patch pocket",
    price: 1999,
    image: "https://via.placeholder.com/300/ffffff?text=Casual+Shirt",
    rating: 4.1,
    discount: 30,
    brand: "Roadster",
    category: "Fashion",
    featured: false,
    date: "2023-10-20",
    stock: 35,
    specifications: {
      Fabric: "Cotton",
      Pattern: "Checkered",
      Fit: "Slim Fit",
      Sleeve: "Long Sleeves",
      Collar: "Spread Collar",
    },
    reviews: [],
  },
  {
    id: 6,
    name: "ASIAN Men's Wonder-13 Sports Running Shoes",
    description:
      "Mesh upper provides lightweight breathability. Soft foam midsole delivers lightweight, responsive cushioning. Rubber outsole offers excellent traction and durability.",
    price: 1299,
    image: "https://via.placeholder.com/300/ffffff?text=ASIAN+Running+Shoes",
    rating: 4.0,
    discount: 45,
    brand: "ASIAN",
    category: "Footwear",
    featured: true,
    date: "2023-09-15",
    stock: 40,
    specifications: {
      Material: "Mesh",
      Sole: "EVA",
      Closure: "Lace-Up",
      Pattern: "Solid",
      Warranty: "1 month",
    },
    reviews: [],
  },
  {
    id: 7,
    name: "HP Pavilion 15 Laptop",
    description:
      "HP Pavilion 15 Laptop, 11th Gen Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 512 GB SSD Storage, 15.6-inch Full HD IPS Display, Windows 11 Home, Compact Design, Long Battery Life",
    price: 59999,
    image: "https://via.placeholder.com/300/ffffff?text=HP+Pavilion+Laptop",
    rating: 4.5,
    discount: 12,
    brand: "HP",
    category: "Electronics",
    featured: false,
    date: "2023-08-01",
    stock: 10,
    specifications: {
      Processor: "11th Gen Intel Core i5",
      RAM: "8GB",
      Storage: "512GB SSD",
      Display: "15.6-inch Full HD",
      OS: "Windows 11",
    },
    reviews: [],
  },
]

const categories = [
  { id: 1, name: "Electronics", image: "https://via.placeholder.com/80/ffffff?text=Electronics" },
  { id: 2, name: "Fashion", image: "https://via.placeholder.com/80/ffffff?text=Fashion" },
  { id: 3, name: "Footwear", image: "https://via.placeholder.com/80/ffffff?text=Footwear" },
  { id: 4, name: "Appliances", image: "https://via.placeholder.com/80/ffffff?text=Appliances" },
  { id: 5, name: "Mobiles", image: "https://via.placeholder.com/80/ffffff?text=Mobiles" },
  { id: 6, name: "Grocery", image: "https://via.placeholder.com/80/ffffff?text=Grocery" },
  { id: 7, name: "Home", image: "https://via.placeholder.com/80/ffffff?text=Home" },
  { id: 8, name: "Beauty", image: "https://via.placeholder.com/80/ffffff?text=Beauty" },
  { id: 9, name: "Toys", image: "https://via.placeholder.com/80/ffffff?text=Toys" },
]

const brands = ["Apple", "Samsung", "PUMA", "boAt", "Roadster", "ASIAN", "HP"]

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// API functions
export const fetchProducts = async (filters = {}) => {
  await delay(800) // Simulate network delay

  let filteredProducts = [...products]

  // Apply filters
  if (filters.categories && filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.categories.includes(product.category.toLowerCase()))
  }

  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.brands.includes(product.brand))
  }

  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )
  }

  if (filters.rating > 0) {
    filteredProducts = filteredProducts.filter((product) => product.rating >= filters.rating)
  }

  // Apply sorting
  if (filters.sort) {
    switch (filters.sort) {
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 'featured' is default
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  return filteredProducts
}

export const fetchProductById = async (id) => {
  await delay(500)
  return products.find((product) => product.id.toString() === id.toString()) || null
}

export const fetchFeaturedProducts = async () => {
  await delay(600)
  return products.filter((product) => product.featured).sort((a, b) => b.rating - a.rating)
}

export const fetchNewArrivals = async () => {
  await delay(600)
  return [...products].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const fetchRelatedProducts = async (category) => {
  await delay(400)
  return products.filter((product) => product.category === category)
}

export const fetchCategories = async () => {
  await delay(300)
  return categories
}

export const fetchBrands = async () => {
  await delay(300)
  return brands
}
