import React from 'react'
import Nav from '../General/Nav'
//yaha data import kare
import { FrontData } from '../data'
//import the motion for compn
import {motion} from 'framer-motion'
//import variants(j-Query effects mtlb koi hidden chiz ko fade in wagera)
import { fadeIn,staggerContainer } from '../../variants'
const Front = ()=>{
    const {pretitle,title,subtitle,btnText}=FrontData;
    return(
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
            className="text-[36px] lg:text-[48px] font-primary italic font-normal mb-2"
            >
            {pretitle}
            </motion.div>

            <motion.h1
            variants={fadeIn('down', 'tween', 0.3, 1.1)}
            className="text-[56px] lg:text-[72px] font-primary italic font-bold mb-4"
            >
            {title}
            </motion.h1>


          <motion.p
            variants={fadeIn('down', 'tween', 0.4, 1.1)}
            className="text-[24px] lg:text-[32px] max-w-[540px] mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={fadeIn('down', 'tween', 0.5, 1.1)}>
            <button className="h-14 rounded-full bg-accent px-4 text-white text-base font-secondary font-semibold tracking-[0.02em] outline-none hover:bg-accent-hover transition-all duration-300 flex justify-center items-center">
                {btnText}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    );
};
export default Front;
