import React from 'react'
import img1 from '../assets/img1.jpg'



import { motion } from "motion/react"
const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}



            className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full ' id='About'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2'  >About <span className='underline underline-offset-4 decoration-1 under'>Our Brand</span></h1>
            <p className='text-gray-500 max-w-80 text-center mb-8'>Empowering Financial Confidence and Opportunity</p>
            <div className='flex flex-col md:flex-row items-center md:tems-start md:gap-20'>

                <img src={img1} alt="" className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 max-w-lg rounded' />

                <div className='flex flex-col items-center md:items-start mt-10 text -gray-600'>
                    <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'>
                        <div>
                            <p className='text-4xl font-medium text-gray-800'>15+</p>
                            <p className='text-gray-600 '>of Financial Expertise</p>
                        </div>
                        <div>
                            <p className='text-4xl font-medium text-gray-800'>50,000+</p>
                            <p className='text-gray-600 '>Credit Assessments Delivered</p>
                        </div>
                        <div>
                            <p className='text-4xl font-medium text-gray-800'>10,000+</p>
                            <p className='text-gray-600 '>Loans Approved and Counting</p>
                        </div>
                        <div>
                            <p className='text-4xl font-medium text-gray-800'>25+</p>
                            <p className='text-gray-600 '>Bank acesss</p>
                        </div>

                    </div>
                    <p className='my-10 max-w-lg text-xl'>At Score to Loan, we believe in bridging the gap between financial potential and opportunity. Our mission is to provide seamless access to credit scores and loan options tailored to your needs—all at the click of a button. With years of industry expertise, we’ve empowered thousands to achieve their financial goals, from securing dream homes to launching businesses.
                    </p>
                    <button className='bg-blue-600 text-white px-8 py-2 rounded'>Learn more</button>
                </div>

            </div>
        </motion.div>
    )
}

export default About
