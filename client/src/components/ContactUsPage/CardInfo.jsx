const CardInfo=(props)=>{
    return(
        <div className="relative flex flex-col items-center justify-center text-white mt-[1px]">
        <div className="flex flex-col items-start"> 
         <p className="text-md">{props.name}</p>
         {/* <p className="italic text-[10px]">{props.email}</p> */}
         {/* <div className='flex justify-center w-full mt-2'><div className='mr-2 mt-1'><Github /></div><p className='italic text-sm'>https://github.com/utkarshhh17</p></div> */}
        </div>
        </div>
   
 
    )

}
export default CardInfo;