import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../General/Loader';
import { motion, AnimatePresence } from "framer-motion";
import Nav from '../General/Nav';

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


  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
     <Nav />
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
            <div className='flex items-start justify-center'>
              {/* Left Card */}
              <div className="rounded-lg overflow-hidden shadow-md bg-gray-800 text-gray-300 mx-4 my-4 p-4 max-w-sm text-center w-1/5">
                
                
                <img src={responseFromServer.parsedData1.imageURL} width='500px' height='400px' alt="Recipe" className="rounded-lg mx-auto mb-1" />
                <h5 className="text-xl text-gray-500 font-jost mb-6">{responseFromServer.parsedData1.title}</h5>
                <div className="text-2xl font-bold font-jost mb-2">Key Ingredients</div>                
                <div className='flex flex-col items-start'>                              
                  {responseFromServer.parsedData1.extendedIngredients.map((ingredients, index) => (
                    <div key={index} className="w-full flex items-center justify-between mt-2 mb-2 font-jost">
                      
                      <div className='text-xl text-white'>
                        {capitalizeFirstLetter(ingredients.name)}
                      </div>
                     
                        <div className="flex text-sm italic text-gray-600 ">
                        <div>{ingredients.amount}</div>
                        <div>{ingredients.unit}</div>
                        </div>
                   
                    </div>
                  ))}                
                </div>
              </div>
              
              
              {/* Right Card */}
              <div className='flex flex-col w-4/5'>
              <div className="relative top-10 rounded-lg overflow-hidden shadow-md bg-gray-800 text-gray-300 mx-4 p-4 w-full">
                <div className="text-xl font-bold font-jost">
                  <div className="m-10" dangerouslySetInnerHTML={{ __html: responseFromServer.parsedData1.summary }} />
                </div>

                </div>
              
            
            
            
            <div className="mt-20 flex flex-col bg-gray-800 p-4">
            <div className='text-2xl font-jost w-full text-center mb-7 font-bold '  >Instructions</div>
            {responseFromServer.parsedData2.instructions.map((instructions, index) => (
                    <div key={index} className="w-full flex items-center justify-start mt-2 mb-2 font-jost">
                      
                      <div className='flex mb-2 font-jost '>
                      <div className='flex text-xl text-white'>
                        <>{instructions.number}</>
                        <>.</>
                      </div>
                     
                 
                        <div className='ml-5 top-2 text-xl'>{instructions.step}</div>
                      </div>
                      
                     
                    </div>
                  ))}

                  <div className="text-center mt-4">
                  <button id="toggle" type="submit" onClick={() => speak(responseFromServer.parsedData2.instructions.step)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                  Get Cooking Instructions
                  </button>
                </div>
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
