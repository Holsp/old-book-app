import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import Link from "next/link";
import TopStyle from "../components/topBack";
import Footer from "../components/footer";
import Image from "next/image";
const prisma = new PrismaClient();


//book interface
type IBook = {
   id:   number,
   name: string,
   imgSrc: string,
}


export const getServerSideProps: GetServerSideProps = async (content) => {
   //gets all avalibe books
   const books = await prisma.book.findMany({});
   return { props: { books } }
}


const Home = (props: { books: IBook[] }) => {
   //fills books with those from the server


   /////////////////////////
   // Main book selection //
   /////////////////////////
   return (
      <div>
         <TopStyle link="/"/>
         <div className="content">
            <h1>SELECT A BOOK</h1>
            <div className={styles.books}>
               {props.books.map((item, key) =>
                  <Link key={key} href="/chapterSelection/[chapterSelection]" as={"/chapterSelection/" + item.id}>
                     <div className={styles.book}>
                        <Image src={item.imgSrc} height={300} width={200}></Image>
                        <p>{item.name}</p>
                     </div>
                  </Link>

               )}
            </div>

         </div>
         <Footer/>
      </div>
   )
}

export default Home
