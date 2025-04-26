import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // In a real app, you would validate credentials against a backend
    // This is a simplified example with mock users
    const mockUsers = [
      {
        id: "1",
        name: "Demo User",
        email: "user@example.com",
        password: "password123",
        role: "user",
      },
      {
        id: "2",
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        id: "3",
        name: "Manager User",
        email: "manager@example.com",
        password: "manager123",
        role: "manager",
      },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      setCurrentUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return Promise.resolve(userWithoutPassword)
    } else {
      return Promise.reject(new Error("Invalid email or password"))
    }
  }

  const register = (name, email, password) => {
    // In a real app, you would send this data to your backend
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "user",
    }

    setCurrentUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return Promise.resolve(newUser)
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
