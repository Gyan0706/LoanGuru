import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirect to the login route
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to the register route
    };

    return (
        <div className='absolute top-0 left-0 w-full z-10'>
            <div className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent'>
                <img src={assets.logo1} alt="Logo"  className="w-18 h-8"/>
                <ul className='hidden md:flex gap-7 text-white'>
                    {/* Replace <a> with <Link> */}
                    <Link to="/" className='cursor-pointer hover:text-gray-400'>Home</Link>
        
                    <a href="#About" className='cursor-pointer hover:text-gray-400'>About</a>
                    <a href="#Projects" className='cursor-pointer hover:text-gray-400'>Loans</a>
                </ul>
                <div className='hidden md:flex gap-4'>
                    <button onClick={handleLogin} className='bg-white px-8 py-2 rounded-full'>Login</button>
                    <button onClick={handleRegister} className='bg-white px-8 py-2 rounded-full'>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
