import React from 'react';
import Nav from '../General/Nav';
import { FrontData } from '../data';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../variants';

const Front = () => {
  const { pretitle, title, subtitle, btnText } = FrontData;

  return (
    <section className="min-h-screen bg-front bg-cover bg-right">
      <Nav />
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <motion.div
          variants={staggerContainer(0.3, 1)}
          initial="hidden"
          whileInView="show"
          className="text-center flex flex-col items-center text-white"
        >
          <motion.div
            variants={fadeIn('down', 'tween', 0.2, 1.1)}
            className="text-[24px] lg:text-[36px] font-primary italic font-normal mb-2"
            /* Reduced font size from 36px to 24px */
          >
            {pretitle}
          </motion.div>

          <motion.h1
            variants={fadeIn('down', 'tween', 0.3, 1.1)}
            className="text-[40px] lg:text-[56px] font-primary italic font-bold mb-4"
            /* Reduced font size from 56px to 40px */
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeIn('down', 'tween', 0.4, 1.1)}
            className="text-[16px] lg:text-[24px] max-w-[540px] mb-8"
            /* Reduced font size from 32px to 16px */
          >
            {subtitle}
          </motion.p>

          {/*<motion.div variants={fadeIn('down', 'tween', 0.5, 1.1)}>
            <button className="h-14 rounded-full bg-accent px-4 text-white text-base font-secondary font-semibold tracking-[0.02em] outline-none hover:bg-accent-hover transition-all duration-300 flex justify-center items-center">
              {btnText}
            </button>
  </motion.div>*/}
        </motion.div>
      </div>
    </section>
  );
};

export default Front;
