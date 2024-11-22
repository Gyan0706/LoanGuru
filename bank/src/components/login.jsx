import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying errors
  const [loading, setLoading] = useState(false); // Loading state to show spinner during request
  const [isHovered, setIsHovered] = useState(false); // Button hover state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      // Make the login API call
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      console.log(response);

      // Check for a successful login response
    //   if (response.request.status == 200) {
    //     navigate(`/dashboard/${username}`); // Navigate to the dashboard
    // } else {
    //     setError(response.data?.message || 'Invalid credentials'); // Display backend error message or fallback
    // }
    if (response.data.success && response.data.message === "Login successful!") {
        alert(response.data.message);
        
        // Redirect to the dashboard with the usernames
        navigate(`/dashboard/${username}`);
    } else {
        // If the login was not successful, show error
        setError('Invalid credentials');
    }
      
    } catch (err) {
      // Handle request errors (e.g., network/server issues)
      setError('Invalid credentials or server error');
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center overflow-hidden relative">
      {/* Floating Background Elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
          transition: { duration: 5, repeat: Infinity, repeatType: 'reverse' },
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -10, 10, 0],
          transition: { duration: 6, repeat: Infinity, repeatType: 'reverse' },
        }}
      />
      <motion.div
        className="absolute top-10 left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 4, repeat: Infinity, repeatType: 'reverse' },
        }}
      />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 z-10 relative overflow-hidden"
      >
        {/* Login Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
            {isHovered && !loading && (
              <ArrowRight className="ml-2 inline-block" size={20} />
            )}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline transition-colors duration-200">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
