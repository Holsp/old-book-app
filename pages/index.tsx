import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import Link from "next/link";
import TopStyle from "../components/topStyle";
const prisma = new PrismaClient();


//book interface
type IBook = {
   id:   number,
   name: string,
}


export const getServerSideProps: GetServerSideProps = async (content) => {
   //gets all avalibe books
   const books = await prisma.book.findMany({});
   return { props: { books } }
}


const Home = (props: { books: IBook[] }) => {
   //fills books with those from the server
   const books = props.books;


   /////////////////////////
   // Main book selection //
   /////////////////////////
   return (
      <div>
         <TopStyle link="/"/>
         <div className="content">
            <h1>SELECT A BOOK</h1>
            <div className={styles.books}>
               {books.map((item, key) =>
                  <Link key={key} href="/chapterSelection/[chapterSelection]" as={"/chapterSelection/" + item.id}>
                     <div className={styles.book}>
                        {item.name}
                     </div>
                  </Link>

               )}
            </div>

         </div>
      </div>
   )
}

export default Home
