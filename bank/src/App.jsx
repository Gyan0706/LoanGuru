import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Login from './components/login'; // Adjust import paths as needed
import Register from './components/register';
import Dashboard from './components/dashboard';

const App = () => {
  return (
    <Router>
      {/* Add Navbar for navigation */}
      <div className="w-full overflow-hidden">
        <Navbar />
      </div>

      {/* Define routes for the app */}
      <Routes>
        {/* Render existing components on the homepage */}
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden">
              <Header />
              <About />
              <Projects />
              <Contact />
            </div>
          }
        />

        {/* Define additional routes for login and register */}
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
