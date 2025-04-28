"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children, adminOnly = false, managerOnly = false }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2874f0]"></div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/" replace />
  }

  if (managerOnly && currentUser.role !== "manager" && currentUser.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
