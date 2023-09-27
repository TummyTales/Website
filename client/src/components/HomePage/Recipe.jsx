import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Next from '../General/Next';

const Recipe=(props)=>{
  const [showFullText, setShowFullText] = useState(false);
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
   
    const {user}=useAuth0();
    const recipeId=props.id;
    function handleClick(){
        const data={email:user.email, id:props.id, name:props.name, content:props.content, imageLink: props.image, recipeLink: props.recipe};
        axios.post('http://localhost:8000/cache',data)
        .then((response) => {
          console.log(response.data);
          props.cacheFunction(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

    }

   
    return(
        <div className="flex flex-col items-center  rounded-sm ml-2 mr-3 w-[300px] mt-5 mb-5 shadow-md shadow-slate-400">
            <img src={props.image} width="full" alt="the recipe" className=""></img> 

            <div className=" flex justify-center text-2xl w-full font-jost text-center text-black p-1">{props.name}</div>
            
            
            <div className="text-sm m-2">
            {showFullText ? (
                <div dangerouslySetInnerHTML={{ __html: props.content }} />
               ) : (
              <div>
                <div dangerouslySetInnerHTML={{ __html: props.content.substring(0, 100) }} />            
              </div>
              )}
              <button className="text-blue-400" onClick={toggleShowFullText}>Read More</button>
            </div>


           <div className='flex mt-3 h-10 bg-gray-100  w-full items-center justify-end'>
           <Link className="flex text-base text-blue-500 cursor-pointer mr-2" to={`/recipe/${recipeId}`} onClick={handleClick}>
            <div className='mt-[5px] mr-1'><Next /></div> 
           <div>View More</div></Link></div> 
        </div>
    )
}

export default Recipe;