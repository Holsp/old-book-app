import TopStyle from "../../components/topStyle"
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const prisma = new PrismaClient();

type IChapter = {
   number: number,
   title: string,
   content: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {

   const book = (context.query.book)!.toString();
   const bookId = parseInt(book);


   const chapters = await prisma.chapter.findMany({
      where: {
         bookId: bookId
      }
   });

   return { props: { chapters } }
}



export default function ChapterSelection(props: { chapters: IChapter[] }) {

   const router = useRouter()
   const { book } = router.query;
   const [chapters, setChapters] = useState(props.chapters);

   return (
      <div>
         <TopStyle />
         <div className="content">
            <p>Post: {book}</p>
            {chapters.map(item =>
               <Link href={{
                  pathname: "/chapterSelection/chapter",
                  query: {title: item.title, content: item.content} 
               }}>
                  {item.title}
               </Link>
            )}
         </div>

      </div>

   )
}