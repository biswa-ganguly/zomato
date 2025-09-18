import React from 'react'
import { useAuth } from '../context/AuthContext'

function UserProfile() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    // Optionally call backend logout endpoint
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user?.fullName || 'User'}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  defaultValue={user?.fullName || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  defaultValue={user?.email || ''}
                />
              </div>
            </div>
            
            <div className="mt-6 space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Update Profile
              </button>
              <button 
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile