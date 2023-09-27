import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import QuoteImg from '../assets/quote.svg';

export const FrontData = {
  pretitle: 'Nothing brings people together like Food!',
  title: 'TummyTales',
  subtitle:
    "We invite you to join us on this exciting culinary journey. Whether you are looking for quick weeknight dinners, elegant dishes for special occasions, or simply seeking inspiration, TummyTales is your trusted culinary companion. "+
    "Together, let's embark on a flavorful adventure that will tantalize your taste buds and bring the world's cuisines to your table.",
  btnText: 'Find out more',
};

export const midData = {
  title: 'Our Story:',
  subtitle1: [
    "At TummyTales, our mission is to make cooking an enjoyable and accessible experience for everyone, from beginners to seasoned chefs. We believe that the kitchen is a place of creativity, connection, and joy. Through our diverse range of recipes, cooking tips, and culinary stories, we aim to:",
    "Inspire you to try new flavors and techniques.",
    "Help you create memorable meals for your loved ones.",
    "Encourage a deeper appreciation for the art of cooking.",
    "Promote a healthy and balanced approach to food.",
    "Share our passion for culinary exploration.",
  ],
  btnText: 'Know more',
  btnIcon: <IoMdArrowForward />,
};

export const reviewData = [
  {
    quoteImg: QuoteImg,
    message:
      "The entire team is extremely kind and friendly. They're fantastic. They're great at what they do! And it's unique. They will properly consult with you.",
    name: 'Doreamon Gada',
    occupation: 'Cook',
  },
  {
    quoteImg: QuoteImg,
    message:
      "These recipes from Food Network are the best of the best. With 5-star ratings and 500+ reviews, you can't go wrong with these user favorites for main dishes",
    name: 'Shizuka Mehta',
    occupation: 'Food Blogger',
  }
  ,
];
