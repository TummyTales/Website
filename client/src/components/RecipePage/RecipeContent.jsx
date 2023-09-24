import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../General/Loader';
import { motion, AnimatePresence } from "framer-motion";

const speak = (htmlContent) => {
  let msg = new SpeechSynthesisUtterance(htmlContent);
  window.speechSynthesis.speak(msg);
  const toggle = document.getElementById('toggle')
  if (toggle.textContent === "Get Cooking Instructions") {
    toggle.innerHTML = "Stop"
  } else {
    toggle.innerHTML = "Get Cooking Instructions"
    window.speechSynthesis.cancel();
  }
}

const RecipeContent = () => {
  const { data } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [minLoader, setMinLoader] = useState();
  const [responseFromServer, setResponseFromServer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMinLoader(true);
        setTimeout(() => {
          setMinLoader(false);
        }, 1500);

        setIsLoading(true);
        const requestData = { id: data };
        const response = await axios.post('http://localhost:8000/recipe', requestData);

        if (response && response.data) {
          setResponseFromServer(response.data);
          setIsLoading(false);
        } else {
          console.error('Request failed');
          setIsLoading(false);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [data]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prevSelectedIngredients) => {
      if (prevSelectedIngredients.includes(ingredient)) {
        return prevSelectedIngredients.filter((item) => item !== ingredient);
      } else {
        return [...prevSelectedIngredients, ingredient];
      }
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <AnimatePresence>
        <div className="relative mt-4">
          {(isLoading || minLoader) &&
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ x: 100, transition: { duration: 0.5 } }} className='mt-[200px] mb-[600px]'>
              <Loader />
            </motion.div>
          }
        </div>
        <div>
          {(responseFromServer && !minLoader) && (
            <div className='flex items-center justify-center'>
              {/* Left Card */}
              <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-gray-300 mx-4 my-4 p-4 max-w-sm text-center">
                <img src={responseFromServer.imageURL} width='500px' height='400px' alt="Recipe" className="rounded-lg mx-auto mb-4" />
                <h5 className="text-xl font-semibold mb-4">{responseFromServer.title}</h5>
                <div className="text-2xl font-bold font-jost mb-2">Key Ingredients</div>
                <div className='flex flex-col items-start'>
                  {responseFromServer.extendedIngredients.map((ingredients, index) => (
                    <div key={index} className="flex items-center justify-start mt-2 font-jost">
                      <button
                        onClick={() => toggleIngredient(ingredients.name)}
                        className={`mr-2 rounded-full border text-gray-300 ${selectedIngredients.includes(ingredients.name) ? 'bg-green-500 border-green-500' : 'bg-gray-600 border-gray-600'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.293 9.293a1 1 0 011.414 0L9 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className={`text-xl ${selectedIngredients.includes(ingredients.name) ? 'line-through text-gray-400' : 'text-white'}`}>
                        {capitalizeFirstLetter(ingredients.name)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right Card */}
              <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-gray-300 mx-4 my-4 p-4 w-full relative">
                <div className="text-2xl font-bold font-jost">
                  <div className="m-10" dangerouslySetInnerHTML={{ __html: responseFromServer.summary }} />
                </div>
                <div className="text-center mt-4">
                  <button id="toggle" type="submit" onClick={() => speak(responseFromServer.summary)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                  Get Cooking Instructions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default RecipeContent;
