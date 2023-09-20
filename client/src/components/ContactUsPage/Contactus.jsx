import { useState } from "react";
import {motion} from "framer-motion";
import axios from "axios";
const Contactus=()=>{
    const [formData,setFormData]=useState({FName:'',LName:'',Email:'',Review:''});
    const [validEmail, setValidEmail]=useState(false);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        // console.log(formData);
        setFormData((pervFormData)=>{
            return { ...pervFormData, [name]:value,}

    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        const inputEmail=formData.Email;
        setValidEmail(emailPattern.test(inputEmail));
        console.log(validEmail);
        if(validEmail){
            try {
                const response = await axios.post('http://localhost:8000/contactus', formData);
                setFormData({FName:'',LName:'',Email:'',Review:''});

                if (response.status === 200) {
                    // Request was successful
                    console.log(response.data.message);
                } else {
                    // Handle errors here
                    console.error('Request failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else{
            alert("Please enter a valid Email");
        }
    };

    return(
    <motion.div initial={{y:100}} animate={{y:0}} transition={{type:"spring"}} className="flex-col justify-center mb-40 mt-20 ml-80 left-[300px] w-[800px] h-[500px] shadow-md pt-7 ">
        <div className="text-center text-[20px]">Enter your details below along with the message.</div>
        <div className="text-center font-bold text-[20px]">We will get in touch as soon as possible</div>
        <form onSubmit={handleSubmit} id='form'>
        <div><input onChange={handleChange} value={formData.FName} name="FName" className="outline-none left-10 mt-10 mr-10 text h-10 w-60 border-black border-b-[1px] rounded-sm ml-40" placeholder="First Name"></input>
        <input onChange={handleChange} value={formData.LName} name="LName" className="outline-none mt-10 text h-10 w-60 border-black border-b-[1px] rounded-sm" placeholder="Last Name"></input>
        </div>
        <div><input onChange={handleChange} value={formData.Email} name="Email" className="outline-none w-[525px] mt-7 text h-10 border-black border-b-[1px] rounded-sm ml-40" placeholder="Email"></input></div>
        <div><input onChange={handleChange} value={formData.Review} name="Review" className="outline-none w-[525px] mt-7 text h-10 border-black border-b-[1px] rounded-sm ml-40" placeholder="Review"></input></div>
        <button type='submit' className="transition ease-in-out mt-20 h-10 w-40 ml-[350px] text-white bg-black rounded-md hover:bg-white hover:text-black hover:border-black border-[1px] duration-500">Submit</button>
        </form>
    </motion.div>)
}

export default Contactus;