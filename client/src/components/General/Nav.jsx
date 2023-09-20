import Login from './Login'
import { Link,useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import axios from 'axios';
const Nav = (props) =>{
    const {loginWithRedirect,logout,user,isAuthenticated}=useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    
    
    const clicker=()=>{
        setIsOpen(!isOpen);
    }
    const location = useLocation();
    const locationPath = location.pathname; // Assuming you have access to the location pathname

    // Check if the current location pathname matches either '/' or '/About'
    const textColorClass = locationPath === '/' || locationPath === '/about' ? 'text-white':'text-black';
    
    useEffect(() => {
      // Check if authentication is complete and the user is available
      if (isAuthenticated) {  
        const data={email:user.email};
        console.log('User email:', data);
        axios.post('http://localhost:8000/login',data)
        .then((response) => {
          console.log(response.data);
          props.cacheFunction(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
       
      }
    }, [isAuthenticated,user]);
    
    
    const Logging = async () => {
        try {
          await loginWithRedirect();
         
          // Wait for the authentication to complete   
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
    
    
    
    return(
        <div className={`relative z-10 flex items-center justify-between mt-0 h-[60px] pl-10 pr-20 ${textColorClass}`}>
            <Link to="/"><div className="small:text-red-400 w-1 font-fjalla text-3xl font-bold italic">TummyTales</div></Link>
            <div className="flex justify-around text-xl font-fjalla small:relative small:top-10 small:justify-between">
                <Link to="/about"> <button className="mr-20 h-full hover:font-bold">AboutUs</button></Link>
                <Link to="/contact"><button className="h-full w-full hover:font-bold">Contact</button></Link>
            </div>
            {isAuthenticated? <div><button onClick={clicker}><img className="rounded-full h-10 border-white border-2" src={user.picture} alt={user.name} /></button>
            {isOpen && (
            <motion.div initial={{y:0, scale:0}} animate={{y:1,scale:1}} className="absolute flex items-center justify-center mt-1 w-20 bg-white right-[60px] rounded-sm text-black border-black border-[1px] h-5 text-sm text-center hover:bg-black hover:text-white">
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className='text-center font-sans'>Log Out</button>
            </motion.div>
            )}</div>: <div onClick={Logging}><Login /></div>}
           

        </div>

    )
}
export default Nav;