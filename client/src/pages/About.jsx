import Front from '../components/AboutUsPage/Front'
import Footer from '../components/General/Footer'
import AboutUs from '../components/AboutUsPage/Mid'
import Reviews from '../components/AboutUsPage/Reviews';
import { useEffect } from "react";
const About=()=>{
    useEffect(() => {
        document.title = 'About Us';
      }, []);
    return(
        <div>
        <Front />
        <AboutUs/>
        <Reviews/>
        
        {/* add other components here */}
        <Footer />
        </div>

    )
}
export default About;