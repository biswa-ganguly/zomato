import React from 'react'

function FoodCard({ food }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <video 
        className="w-full h-48 object-cover"
        controls
        poster={food?.thumbnail}
      >
        <source src={food?.video} type="video/mp4" />
      </video>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {food?.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {food?.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
              <span>❤️</span>
              <span>{food?.likeCount || 0}</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
              <span>🔖</span>
              <span>{food?.savesCount || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard