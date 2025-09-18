import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-600">
              Zomato
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600">
              Home
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-red-600">
              Saved
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-red-600">
              Profile
            </Link>
            <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar