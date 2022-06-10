import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//Checks the request METHOD
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      return await createChapter(req, res);
   }
   else {
      return res.status(405).json({ message: 'Method not allowed', success: false });
   }
}

async function createChapter(req: NextApiRequest, res: NextApiResponse) {
   const body = req.body;
   try {
      const newEntry = await prisma.chapter.create({
         data: {
            number: body.number,
            title: body.title,
            content: body.content,
            bookId: body.bookId
         }
      });
      return res.status(200).json(newEntry);
   } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error creating question", success: false });
   }
}