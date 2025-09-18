import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ChooseRegister from './pages/auth/ChooseRegister'
import UserRegister from './pages/auth/UserRegister'
import UserLogin from './pages/auth/UserLogin'
import FoodPartnerLogin from './pages/auth/FoodPartnerLogin'
import FoodPartnerRegister from './pages/auth/FoodPartnerRegister'
import Home from './pages/Home'
import Saved from './pages/Saved'
import CreateFood from './pages/CreateFood'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import BottomNav from './components/BottomNav'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen ">
          <Routes>
            <Route path="/register" element={<ChooseRegister />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path="/" element={<><Home /><BottomNav /></>} />
            <Route path="/saved" element={<><Saved /><BottomNav /></>} />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App