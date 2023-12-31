import { motion } from "framer-motion";
const Logo=(props)=>{
    const firstColor=props.colorObject.firstColor;
    const secondColor=props.colorObject.secondColor;
const svgVariants={
    hidden:{ rotate:180},
    visible:{
        rotate:360,
        transition:{duration:1, type:'spring'},
    }
}
const pathVariants={
    hidden:{
        
        pathLength:0,
    },
    visible:{
     
        pathLength:1,
        transition:{duration:2, ease:'easeInOut'}
    }
}
    
return (
<motion.svg variants={svgVariants} initial='hidden' animate='visible'  width="70px" height="70px" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="tagged">
    <motion.path fill={firstColor} variants={pathVariants} initial='hidden' animate='visible' d="m13.831.677c8.395 4.817 8.279 4.651 8.487 5.127.088.312-.189.611-.507.564-5.018.005-10.197-.001-15.203.004-.931.008-1.766.775-1.884 1.69-.174 1.084.736 2.176 1.833 2.224 1.045.021 2.024-.005 3.024.008.694-.01 1.313.623 1.296 1.313.042.446.17.049-4.172 8.357-.122.223-.218.467-.391.66-.214.206-.561.173-.793.015-1.078-.626-2.167-1.235-3.24-1.868-.587-.331-.982-.943-1.031-1.615v-10.399c.089-.658.499-1.241 1.071-1.574 8.89-5.121 8.687-5.048 9.295-5.183.472 0 .86-.102 2.215.677z"></motion.path>
    <motion.path variants={pathVariants} initial="hidden" animate='visible' fill={firstColor} d="m14.966 12.634c.723-1.413 2.275-2.364 3.87-2.343 1.026.004 2.616 0 3.914.003 0 2.218-.001 4.436 0 6.654-.017 1.167-.563 1.573-1.565 2.135-8.417 4.825-8.254 4.811-8.879 4.917h-.627c-.778-.169-1.411-.678-2.107-1.033 1.782-3.453 3.601-6.887 5.394-10.333z"></motion.path>
    <path fill={secondColor} d="M12.379 0h-.379v6.37c2.59 0 6.778.002 9.812-.001.318.047.594-.253.507-.564-.141-.323-.474-.506-.759-.69-9.055-5.197-8.601-4.991-9.181-5.115zM18.785 10.29c-1.577 0-3.104.945-3.819 2.344-.984 1.892-1.976 3.78-2.966 5.669v5.697c1.424-.393-1.724 1.336 9.185-4.917 1.004-.563 1.549-.969 1.565-2.135-.001-2.218 0-4.436 0-6.654-.107 0-3.806-.004-3.965-.004z"></path>
</motion.svg>
)}

export default Logo;