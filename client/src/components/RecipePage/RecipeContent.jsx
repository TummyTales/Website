import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from '../General/Loader'
import { motion, AnimatePresence } from "framer-motion";

const RecipeContent=()=>{
    const { data } = useParams();
    const [isLoading,setIsLoading]=useState(false);
    const [minLoader, setMinLoader]=useState();
    const [responseFromServer, setResponseFromServer] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
        console.log(data);

        try {
            setMinLoader(true);
            setTimeout(() => {
                setMinLoader(false);     
              }, 1500);

            setIsLoading(true);
            const requestData = { id:data };
            const response= await axios.post('http://localhost:8000/recipe', requestData);
            console.log(response.data);
             
            if (response) {
                // Request was successful
                // setIsLoading(false);
                setResponseFromServer(response.data);
                setIsLoading(false);
                // console.log(responseFromServer);
            } else {
                // Handle errors here
                console.error('Request failed');
                setIsLoading(false);
            }
       
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }
    fetchData();
      }, []);
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };


    return(
    <div>
        <AnimatePresence>
        <div className="relative mt-4">
        {(isLoading || minLoader) && 
            <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.2}}}
             exit={{x:100,transition:{duration:0.5}}} className='mt-[200px] mb-[600px]'>
                <Loader />
            </motion.div>

        }
        </div>
        <div>
            {(responseFromServer && !minLoader &&
              <div className='flex flex-col items-center'>
              
              
              <div><img src={responseFromServer.imageURL} width='500px' height='400px'></img></div>
              
              <div className='mt-20'>
              <div className="text-2xl font-bold font-jost">Key Ingredients</div>
              <div className='flex flex-col flex-wrap'>
              {responseFromServer.extendedIngredients.map((ingredients,index)=>(
                
                    <div key={index} className="flex flex-col flex-wrap mt-1 font-jost">
                     <div className='text-xl'>{capitalizeFirstLetter(ingredients.name)} </div>
                     <div className='flex text-sm'><>{ingredients.amount}</><>{ingredients.unit}</></div>
                    </div>
                    
                )
                )}</div>
                </div> 
              
              
              <div className="m-10" dangerouslySetInnerHTML={{ __html: responseFromServer.summary }} />
              </div>
            )}
        </div>
        </AnimatePresence>
    </div>
)}

export default RecipeContent;