import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
      })
      .catch((error) => {
        console.error('Error fetching profile:', error)
        // Handle error - maybe show a message or redirect
      })
  }, [id])

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <section className="bg-white shadow rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
            alt="Profile Avatar"
          />

          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile?.name}
            </h1>
            <p className="text-gray-600">{profile?.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:flex md:gap-10 text-center">
          <div className="bg-gray-100 rounded-lg px-4 py-2 shadow-sm">
            <span className="block text-sm text-gray-500">Total Meals</span>
            <span className="block text-lg font-semibold text-indigo-600">
              {profile?.totalMeals ?? 0}
            </span>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-2 shadow-sm">
            <span className="block text-sm text-gray-500">Customers Served</span>
            <span className="block text-lg font-semibold text-indigo-600">
              {profile?.customersServed ?? 0}
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-8 border-gray-200" />

      {/* Videos Grid */}
      <section
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-label="Videos"
      >
        {videos.map((v) => (
          <div
            key={v.id}
            className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <video
              className="w-full h-64 object-cover"
              src={v.video}
              muted
              loop
              autoPlay
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default Profile
