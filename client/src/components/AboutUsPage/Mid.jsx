import React from 'react';
import { midData } from '../data';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const AboutUs = () => {
  const { title, subtitle1, subtitle2, btnText, btnIcon } = midData;

  return (
    <section className="lg:py-16 xl:pb-16 bg-pink-200">
      <div className="container mx-auto flex flex-col lg:flex-row gap-x-8 items-center">
      <motion.div variants={fadeIn('right')}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false,amount:0.9}}
      className='flex flex-col lg:flex-row gap-x-[70px] items-center'>
        <div className='text-[180px] xl:text-[360px] leading-none font-tertiary lg:Tracking-[0.055em] bg-mid bg-no-repeat bg-right bg-clip-text text-transparent'>01
            </div >
                </motion.div>
        <motion.div variants={fadeIn('left')}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false,amount:0.9}}
            className="flex-1 xl:mt-8">
          <h2 className="text-4xl xl:text-6xl text-dark uppercase font-primary max-w-xl leading-tight mb-4">
            {title}
          </h2>
          <p className="text-gray-700 text-lg xl:text-xl mb-6">{subtitle1}</p>
          <p className="text-gray-700 text-lg xl:text-xl mb-6">{subtitle2}</p>
          <button className="font-primary text-lg tracking-[0.08em] uppercase px-[40px] transition-all duration-300 flex items-center gap-x-[10px] h-[55px] bg-primary hover:bg-primary-dark text-white">
            {btnText}
            <span className="ml-2">{btnIcon}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
