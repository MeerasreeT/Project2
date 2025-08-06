import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import About from './pages/About';
import Records from './pages/Records';
import Contact from './pages/Contact';

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/records" element={<Records />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    
  );
}

export default App;
