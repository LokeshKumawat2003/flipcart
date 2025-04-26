import { createContext, useState, useContext, useEffect } from "react"

const WishlistContext = createContext()

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    setTotalItems(wishlist.length)
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === product.id)

      if (existingItem) {
        return prevWishlist
      } else {
        return [...prevWishlist, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const value = {
    wishlist,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
