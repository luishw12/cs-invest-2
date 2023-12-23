import {Prisma} from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get items by Date
    await getItemsByDateHandler(req, res);
  } else {
    return res.status(405).json({message: "Method Not allowed"});
  }
}

async function getItemsByDateHandler(req: any, res: any) {
  const {dateId} = req.query
  try {
    const items = await prisma.item.findMany({
      where: {dateId}
    })
    return res.status(201).json({items});
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({message: e.message});
      }
      return res.status(400).json({message: e.message});
    }
  }
}