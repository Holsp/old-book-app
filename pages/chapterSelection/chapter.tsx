import { useRouter } from "next/router";
import { useState } from "react";
import TopStyle from "../../components/topStyle";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type IChapter = {
   number: number,
   title: string,
   content: string,
   bookId: number,
}

export const getServerSideProps: GetServerSideProps = async (context) => {

   const chapter = (context.query.chapterNumber)!.toString();
   const chapterNumber = parseInt(chapter);

   const chapterData = await prisma.chapter.findFirst({
      where: {
         number: chapterNumber
      }
   });

   return { props: { chapterData } }
}

export default function Chapter({ chapterData }: { chapterData: IChapter }) {

   const router = useRouter()
   const maxChapter = parseInt((router.query.maxChapter)!.toString());
   console.log(maxChapter);


   //////////////////
   // CHAPTER PAGE //
   //////////////////
   return (
      <div>
         <TopStyle link="/chapterSelection/[book]" as={"/chapterSelection/" + chapterData.bookId} />
         <div className="content">
            <h1>{chapterData.title}</h1>
            <div className="text">
               {chapterData.content}
            </div>
            <div className="chapterSelect">
               <div>
                  {chapterData.number === 1 ? null : <Link href={{ pathname: "/chapterSelection/chapter", query: { chapterNumber: chapterData.number - 1, maxChapter: maxChapter } }}>Previous chapter</Link>}
               </div>

               <div>
                  {chapterData.number === maxChapter ? null : <Link href={{ pathname: "/chapterSelection/chapter", query: { chapterNumber: chapterData.number + 1, maxChapter: maxChapter } }}>Next chapter</Link>}
               </div>
            </div>
         </div>


      </div>
   )
}