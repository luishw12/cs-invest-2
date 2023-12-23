import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "PUT") {
    // remove sold item
    await removeSoldItemHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function removeSoldItemHandler(req: any, res: any) {
  const { id } = req.body;

  try {
    const item = await prisma.item.update({
      where: {
        id
      },
      data: {
        dateSold: null
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