import TopStyle from "../../components/topStyle"
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const prisma = new PrismaClient();

type IChapter = {
   number: number,
   title: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {

   const book = (context.query.chapterSelection)!.toString();
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
   console.log(router.query);
   const { chapterSelection } = router.query;
   const [chapters, setChapters] = useState(props.chapters);

   const maxChapter = Math.max(...chapters.map(chapter => chapter.number));



   ///////////////////////
   // CHAPTER SELECTION //
   ///////////////////////
   // Page for selecting individual chapters
   // Goes back to book selection
   ///////////////////////
   return (
      <div>
         <TopStyle link="/" />
         <div className="content">
            <h1>SELECT A CHAPTER</h1>
            {chapters.map((item, key) =>
               <Link key={key} href={{
                  pathname: "/chapterSelection/chapter",
                  query: { chapterNumber: item.number, maxChapter: maxChapter }
               }}>
                  {item.title}
               </Link>
            )}
         </div>

      </div>

   )
}