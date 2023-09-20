import { Link } from "react-router-dom";
const Recipe=(props)=>{
   
    return(
        <div className="flex flex-col items-center  rounded-sm ml-2 mr-3 w-60 mt-5 mb-5 shadow-md shadow-slate-400">
            <div className=" flex justify-center text-xl bg-slate-800 w-full font-jost border-black border-b-[2px] text-center text-white">{props.name}</div>
            <img src={props.image} width="150px" alt="Photo of the recipe" className="mt-2 mb-5"></img>
            <div className="flex mb-5"><div>Click Here for </div> <div className="underline ml-1"><Link to={props.recipe}>Recipe</Link></div></div>
        </div>
    )
}

export default Recipe;