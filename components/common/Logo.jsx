
import Image from "next/image";

// import { LogoProps } from "@/interfaces/Interfaces";
import Link from "next/link";
  
const Logo= ({icon, width, height, alt}) =>{
  
    return(
      
        <Image src={icon}
         alt={alt} 
         width={width}  
         height={height}
        
         />
  
       
    )
}

export default Logo;
