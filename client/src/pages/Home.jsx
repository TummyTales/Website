import Image from '../components/HomePage/Image';
import Footer from '../components/General/Footer'
import { useEffect } from 'react';
// import { motion } from 'framer-motion';

export default function Home() {

  useEffect(() => {
    document.title = 'Tummy Tales';
  }, []);
  return (
    
    <div className="relative overflow-x-hidden">
      <Image />
      <Footer />
    </div>
   


)}