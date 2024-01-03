import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "PUT") {
    // set sold item
    await changeHighlighHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function changeHighlighHandler(req: any, res: any) {
  const { id, remove } = req.body;

  try {
    const currentItem = await prisma.item.findUnique({
      where: {id}
    })

    if (!currentItem) return res.status(400).json({ message: "Deu bigode" });

    const item = await prisma.item.update({
      where: {
        id
      },
      data: {
        highlights: remove ? currentItem.highlights -= 2 : currentItem.highlights += 2,
        realProfit: remove ? currentItem.realProfit! += 2 : currentItem.realProfit! -= 2,
        percentage: Math.round(currentItem.realProfit! / currentItem.buyPrice * 100) / 100,
      },
    });

    return res.status(201).json({ item });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}