import { useState } from "react";
import Ingredients from './Ingredients';
import InputArea from "./InputArea";
import { motion} from "framer-motion";
import axios from "axios";
import Nav from '../General/Nav';
import Recipe from './Recipe'
import Loader from '../General/Loader'
import { useAuth0 } from '@auth0/auth0-react';
const Image = () =>{
    const {loginWithRedirect,user,isAuthenticated }=useAuth0();
    
    const [ingredientList,setIngredientList]=useState([]);
    const [responseFromServer, setResponseFromServer] = useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const [cacheResult,setCacheResult]=useState(null);
    const [minLoader, setMinLoader]=useState();

    function handleClick(inputText){
        setIngredientList((prevItems)=>{
            return [...prevItems,inputText];

        });

    }
    function deleteItem(id) {
        setIngredientList((prevItems) => {
          return prevItems.filter((ingredientList, index) => {
            return index !== id;
          });
        });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        if(isAuthenticated){
            try {
                setMinLoader(true);
                setTimeout(() => {
                    setMinLoader(false);     
                  }, 1000);

                setIsLoading(true);
                const data={user:user,ingredients:ingredientList};
                const response = await axios.post('http://localhost:8000/api/data', data);
                
                setIngredientList([]);
                setIsLoading(false);
                setResponseFromServer(response.data);
                 

                if (response) {
                    // Request was successful
                    // setIsLoading(false);
                    setResponseFromServer(response.data);
                    // console.log(responseFromServer);
                } else {
                    // Handle errors here
                    console.error('Request failed');
                }
           
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }
        else{
            loginWithRedirect();

        }
    };



    return(
        <div>
        <div className="top-0 h-screen max-h-[100vh] w-screen bg-bottom bg-food bg-cover overflow-x-hidden">
            <Nav cacheFunction={setCacheResult} />
            <div className="relative flex justify-left small:justify-center items-center top-40 ">

            <motion.div initial={{scale:0.90}} animate={{scale:1}} transition={{type:"spring"}} className="small:left-4 small:h-auto relative left-20 flex flex-col items-center bg-white w-[500px] mr-20 shadow-md shadow-black-700 border-[0.2px] border-gray rounded-sm" >
                <p className="relative font-bold text-2xl mt-3">Search for a recipe</p>
            
                <InputArea onAdd={handleClick} />
                <div className="flex-grow">
                <ul className="w-[200px]">
                
                {ingredientList.map((ingredients,index)=>(
                    <Ingredients key={index} id={index} text={ingredients} onChecked={deleteItem}/>
                ))}  
                </ul>
                </div>
                <motion.button type="submit" whileHover={{ backgroundColor: "#D4A7FB" }} transition={{duration:1 ,ease:"easeOut"}} onClick={handleSubmit} className="mt-10 mb-7 w-20 h-10
                 text-white bg-black shadow-lg shadow-gray-400 hover:shadow-lg hover:scale-110">
                    Search
                </motion.button>
            
            </motion.div>
            </div>
            



        </div>
        {(isLoading || minLoader) && 
        <Loader />
        }
        {cacheResult && !responseFromServer &&( 
            <div className="flex flex-col items-center">
            <div className="text-3xl font-jost font-bold underline">Past Searches</div>
            <div className="flex flex-wrap justify-around">
        {cacheResult.map((recipes,index)=>(
            <Recipe  key={index} name={recipes.name} content={recipes.content} image={recipes.imageLink} recipe={recipes.recipeLink}/>

        ))}
        </div>
        </div>
        )}
        
        
        
        
        {responseFromServer && !minLoader && (
        
        <div className="flex flex-wrap justify-around">
        {responseFromServer.map((recipes,index)=>(
            <Recipe  key={index} name={recipes.name} content={recipes.content} image={recipes.imageLink} recipe={recipes.recipeLink}/>

        ))}

        </div>
        )}



        </div>

    )
}
export default Image;