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
        </AnimatePresence>
    </div>
)}

export default RecipeContent;