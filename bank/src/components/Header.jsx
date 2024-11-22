import React from 'react'
import Navbar from './Navbar'
import sunsetVideo from '../assets/sunsetVideo.mp4'
import { motion } from "motion/react"

const Header = () => {
    return (
        <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full  relative' id='Header'>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={sunsetVideo}
                autoPlay
                loop
                muted
                aria-hidden="true"
            ></video>
            < Navbar />
            < motion.div
                initial={{ opacity: 0, y: 100 }}
                transition={{ duration: 1.5, type: 'tween' }}
                animate={{ opacity: 1, y: 0 }}

                className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white z-10 '>
                <h2 className='text-5xl sm:text-6xl md-text-[82px] inline-block max-w-3xl font-semibold pt-20 '>Credit Scores and Loans, One Click Away.</h2>
                <div className='space-x-6 mt-16'>
                    <a href="#Projects" className='border border-white px-8 py-3 rounded'>Loans</a>
                    <a href="#Contact" className='bg-blue-500 px-8 py-3 rounded'>Contact Us</a>


                </div>
            </motion.div>
        </div>
    )
}

export default Header
