import Link from "next/link"
import { useState, useEffect } from "react"

   /////////////////
   // COLORED TOP //
   /////////////////
export default function TopStyle({link, as, text} : {link: string, as? : string, text? : string}) {

   const [asData, setAsData] = useState<string>();

   useEffect(() => {
      if (as === null || as === "") {
         setAsData(link);
      }
      else {
         setAsData(as);
      }

   }, [])
   


   return (
      <div>
         <Link href={link} as={asData}>
            <div className="topColor" style={{ backgroundColor: "#813333" }}>
               <h2>{text}</h2>
               </div>
            </Link>
         <div className="topCorners"></div>
      </div>
   )
}