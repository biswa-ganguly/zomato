import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function BottomNav() {
  const location = useLocation()
  const { user, userType } = useAuth()

  const isActive = (path) => location.pathname === path

  const getProfilePath = () => {
    if (!user) return '/user/login'
    if (userType === 'foodPartner') return `/food-partner/${user._id}`
    return '/user/profile'
  }

  const isProfileActive = () => {
    if (userType === 'foodPartner') {
      return location.pathname.includes('/food-partner/')
    }
    return location.pathname === '/user/profile'
  }

  // Show different navigation based on user type
  if (userType === 'foodPartner') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 px-3 ${
              isActive('/') ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/create-food"
            className={`flex flex-col items-center py-2 px-3 ${
              isActive('/create-food') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="text-xl mb-1">➕</span>
            <span className="text-xs">Create</span>
          </Link>
          
          <Link
            to={getProfilePath()}
            className={`flex flex-col items-center py-2 px-3 ${
              isProfileActive() ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    )
  }

  // Default navigation for regular users
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center py-2 px-3 ${
            isActive('/') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl mb-1">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        
        <Link
          to="/saved"
          className={`flex flex-col items-center py-2 px-3 ${
            isActive('/saved') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl mb-1">🔖</span>
          <span className="text-xs">Saved</span>
        </Link>
        
        <Link
          to={getProfilePath()}
          className={`flex flex-col items-center py-2 px-3 ${
            isProfileActive() ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl mb-1">👤</span>
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNav