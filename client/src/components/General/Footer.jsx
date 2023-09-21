// import Github from '../General/github';
import Copyright from './copyright';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import CardInfo from "../ContactUsPage/CardInfo";
import { Link } from 'react-router-dom'; 
import StaticLogoFooter from './StaticLogoFooter';


const Footer=()=>{

    return(
    <div className=" w-full flex flex-col mb-0 mt-1 bg-zinc-800">
   
    <div className='relative mt-1 items-center justify-around flex flex-wrap border-b-[0.5px] border-gray-700 pb-6 mb-5'>
        <div className="flex flex-col flex-wrap justify-center items-center basis-1/2 border-r-[1px] small:border-0 border-stone-50 h-[100px]">
           <div className='flex'><StaticLogoFooter /><div className="text-white text-center font-fjalla mt-5 text-4xl italic">ummyTales</div></div> 
            <div className='relative flex top-6'><div className='mr-2' ><Facebook /></div><div className='mr-2'><Twitter /></div><div className='mr-2'><Instagram /></div></div>
        </div>
        <div className="flex flex-col basis-1/2 w-1/2 font-jost">
            <div><h1 className="relative text-center text-3xl mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Developers</h1></div>
            <div className="relative flex flex-col flex-wrap justify-around mt-1 mb-4 small:mb-10">
            <CardInfo name="Utkarsh Singh" email="singhutkarsh.1210@gmail.com"/>
            <CardInfo name="Shreyash" email="shreyashsingh10@gmail.com"/>
            <CardInfo name="Aditya Raut" email="shreyashsingh10@gmail.com"/>
            <CardInfo name="Tanisha Saxena" email="shreyashsingh10@gmail.com"/>
            </div>
        </div>
    </div>
    <div className='relative flex small:flex-col justify-center mt-3 mb-7'>
    <div className='flex justify-center text-gray-500'><Copyright /><div className='relative bottom-[3px] text-sm font-jost text-[12px]'>2023 TummyTales. All rights reserved</div></div>
    <Link to="/TermsAndConditions" className='relative text-gray-500 ml-20 bottom-[3px] text-[12px] font-jost hover:underline'>Terms</Link>
    </div>
    

    </div>
    )
}
export default Footer;
