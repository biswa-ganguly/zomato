import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function BottomNav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

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
          to="/create-food"
          className={`flex flex-col items-center py-2 px-3 ${
            isActive('/create-food') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl mb-1">➕</span>
          <span className="text-xs">Create</span>
        </Link>
        
        <Link
          to="/food-partner/1"
          className={`flex flex-col items-center py-2 px-3 ${
            location.pathname.includes('/food-partner/') ? 'text-red-600' : 'text-gray-600'
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