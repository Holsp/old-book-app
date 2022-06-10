import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import TopStyle from "../components/topStyle";


const prisma = new PrismaClient();

//book interface
type IBook = {
   name: String,
}

//gets all avalibe books
export const getServerSideProps: GetServerSideProps = async (content) => {
   const books = await prisma.book.findMany({});

   return { props: { books } }
}

const Home = (props: { books: IBook[] }) => {
   //fills books with those from the server
   const [books, setBooks] = useState<IBook[]>(props.books);


   return (
      <div>
         <TopStyle/>
         <div className="content">
            <h1>SELECT A BOOK</h1>
            <div className={styles.books}>
               {books.map(item =>
                  <Link href="/chapterSelection/[chapter]" as="/chapterSelection/1">
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
