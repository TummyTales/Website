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
                setIsLoading(true);
                const data={user:user,ingredients:ingredientList};
                const response = await axios.post('http://localhost:8000/api/data', data);
                setIngredientList([]);

                if (response) {
                    // Request was successful
                    setIsLoading(false);
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
            <Nav />
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
        {isLoading && 
        <Loader />
        }
        
        
        
        {responseFromServer && (
        
        <div className="flex flex-wrap">
        {responseFromServer.map((recipes,index)=>(
            <Recipe  key={index} name={recipes.name} content={recipes.content} image={recipes.imageLink} recipe={recipes.recipeLink}/>

        ))}

        </div>
        )}



        </div>

    )
}
export default Image;