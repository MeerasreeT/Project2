import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Empowering Student Records Management</h2>
        <p>Secure • Scalable • Professional Academic Platform</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/')}>Student Portal</button>
          <button className="outline" onClick={() => navigate('/')}>Staff Portal</button>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>Manage Records</h3>
          <p>Easily add, view, and update student records securely.</p>
        </div>
        <div className="feature-card">
          <h3>Track Attendance</h3>
          <p>Monitor student attendance and generate reports efficiently.</p>
        </div>
        <div className="feature-card">
          <h3>Generate Reports</h3>
          <p>Generate detailed academic reports in just a few clicks.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
