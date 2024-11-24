import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { assets } from '../assets/assets';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track footer hover

  const contributors = [
    { name: 'Aditya Singh', github: 'https://github.com/AKdevi99' },
    { name: 'Apeksha D Jawali', github: 'https://github.com/Apekshajawali' },
    { name: 'Gyanada', github: 'https://github.com/Gyan0706' },
    { name: 'Aiman', github: 'https://github.com/Shaiman-N' }
  ];

  return (
    <footer
      className={`py-12 px-6 mt-20 border-t border-gray-400 transition-colors duration-500 ${
        isHovered ? 'bg-gray-800' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)} // Activate hover state
      onMouseLeave={() => setIsHovered(false)} // Deactivate hover state
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="transform hover:scale-110 transition-transform duration-300">
            <img
              src={isHovered ? assets.logo1 : assets.black} // Change logo dynamically
              alt="Logo"
              className="w-18 h-8"
            />
          </div>
        </div>

        {/* Contributors Section */}
        <div className="mb-8">
          <h3
            className={`text-center text-2xl font-semibold mb-6 ${
              isHovered ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            Contributors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {contributors.map((contributor) => (
              <a
                key={contributor.name}
                href={contributor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex flex-col items-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-2 group-hover:shadow-xl transition-shadow">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`${
                      isHovered ? 'text-gray-300' : 'text-gray-700'
                    } font-medium text-sm text-center`}
                  >
                    {contributor.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`text-center text-sm transition-colors duration-500 ${
            isHovered ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <p className="mb-2">Made with ❤️ by our amazing team</p>
          <p>© {new Date().getFullYear()} LoanGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
