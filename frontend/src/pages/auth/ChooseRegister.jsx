import React from 'react'
import { Link } from 'react-router-dom'

function ChooseRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join Zomato
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose how you want to register
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/user/register"
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Register as User
          </Link>
          
          <Link
            to="/food-partner/register"
            className="w-full flex justify-center py-4 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Register as Food Partner
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/user/login" className="text-red-600 hover:text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChooseRegister