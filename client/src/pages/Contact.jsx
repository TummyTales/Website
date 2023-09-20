import Nav from '../components/General/Nav'
import Contactus from '../components/ContactUsPage/Contactus'
import Footer from '../components/General/Footer'
import { useEffect } from 'react'

const Contact=()=>{
    useEffect(() => {
        document.title = 'Contact Us';
      }, []);
    return(
        <div className='overflow-x-hidden'>
            <Nav />
            <Contactus />
            <Footer />
    
        </div>
    )
}

export default Contact;