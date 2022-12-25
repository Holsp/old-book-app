import Link from "next/link"


export default function Footer() {


   return(
      <footer>
         <Link href={"/login"}><a>Login</a></Link>
      </footer>
   )
}