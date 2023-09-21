import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { motion } from "framer-motion";
const Recipe=(props)=>{
    const {user}=useAuth0();
    function handleClick(){
        const data={email:user.email, id:props.id, name:props.name, imageLink: props.image, recipeLink: props.recipe};
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
        <div className="flex flex-col items-center  rounded-sm ml-2 mr-3 w-60 mt-5 mb-5 shadow-md shadow-slate-600">
            <div className=" flex justify-center text-xl bg-slate-800 w-full font-jost border-black border-b-[2px] text-center text-white p-2">{props.name}</div>
            <img src={props.image} width="150px" alt="Photo of the recipe" className="mt-2 mb-5"></img>
            <div className="flex mb-5"><div>Click Here for </div> <div className="underline ml-1" onClick={handleClick}><Link to={props.recipe}>Recipe</Link></div></div>
        </div>
    )
}

export default Recipe;