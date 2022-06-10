import { useRouter } from "next/router";
import { useState } from "react";
import TopStyle from "../../components/topStyle";

export default function Chapter() {
   const router = useRouter()
   const { title, content } = router.query;

   return (
      <div>
         <TopStyle />
         <div className="content">
            <h1>{title}</h1>
            {content}
         </div>
      </div>
   )
}