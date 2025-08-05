import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage.jsx'
import StaffDashboard from './pages/StaffDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
     
    </Routes>
    
    
  )
}

export default App
