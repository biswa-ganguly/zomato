import React from 'react'
import FoodCard from '../components/FoodCard'

function Saved() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Foods</h1>
        <p className="text-gray-600 mt-2">Your favorite recipes and food videos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved foods yet</h3>
          <p className="text-gray-600">Start exploring and save your favorite recipes!</p>
        </div>
      </div>
    </div>
  )
}

export default Saved