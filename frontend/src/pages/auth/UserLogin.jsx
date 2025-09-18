import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UserLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data)
    login(response.data.user, 'user')
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-zinc-300 p-8 rounded-lg shadow-md" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="text-3xl font-extrabold text-gray-900 text-center">Sign in to your account</h1>
          <p className="text-center text-sm text-gray-600 mt-2">Welcome back! Please sign in to continue.</p>
        </header>
        <nav className="text-center text-sm">
          <strong className="font-semibold">Switch:</strong> <Link to="/user/login" className="text-red-600 hover:text-red-500">User</Link> • <Link to="/food-partner/login" className="text-blue-600 hover:text-blue-500">Food partner</Link>
        </nav>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" type="submit">Sign In</button>
        </form>
        <div className="text-center text-sm">
          Don't have an account? <Link to="/user/register" className="text-red-600 hover:text-red-500">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin