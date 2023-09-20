import React, { useState } from 'react';
import { reviewData } from '../data';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewData.length - 1 : prevIndex - 1
    );
  };

  const { quoteImg, message, name, occupation } = reviewData[currentIndex];

  return (
    <motion.section
      variants={fadeIn('up')}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.2 }}
      style={{
        backgroundColor: '#ffcccc', // Light red
        padding: '40px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
        }}
      >
        <img
          src={quoteImg}
          alt=''
          style={{ width: '154px', height: '109px', marginBottom: '20px' }}
        />
        <p
          style={{
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333', // Dark gray
          }}
        >
          {message}
        </p>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ff9900', // Orange
            textAlign: 'center',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 'lighter',
            color: '#666', // Medium gray
            textAlign: 'center',
          }}
        >
          {occupation}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: '#ff9900', // Orange
            color: '#fff', // White
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: '#ff9900', // Orange
            color: '#fff', // White
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Next
        </button>
      </div>
    </motion.section>
  );
};

export default Reviews;
