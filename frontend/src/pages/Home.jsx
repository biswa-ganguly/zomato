import React from 'react'
import FoodCard from '../components/FoodCard'

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Food
        </h1>
        <p className="text-xl text-gray-600">
          Explore delicious recipes and food videos from our partners
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Food cards will be rendered here */}
      </div>
    </div>
  )
}

export default Home