import { useState, useRef } from "react";
const InputArea=(props)=>{
    const [inputText,setInputText]=useState('');
    const buttonRef = useRef(null);
    
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Trigger the button's click event when Enter is pressed
          buttonRef.current.click();
        }
      };

    
        
    function handleChange(event){
        var text=event.target.value;
        setInputText(text);
    }

   
    return(

    <div>
                    
    <input onChange={handleChange} onKeyPress={handleKeyPress} value={inputText} className="outline-none left-10 mt-10 mr-10 text h-10 w-60 border-black border-b-[1px] rounded-sm ml-10 small:w-20 small:left-0" placeholder="Enter ingredient"></input>
    <button onClick={()=>{
    props.onAdd(inputText);
    setInputText("");
    }} ref={buttonRef} className="w-10 h-10 mb-10 text-center text-2xl rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-200 hover:from-yellow-200 hover:to-yellow-400">+</button>
               

    </div>
    );
}
export default InputArea;