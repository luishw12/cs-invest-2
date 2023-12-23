import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "PUT") {
    // edit item
    await editItemHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function editItemHandler(req: any, res: any) {
  const { id } = req.body;

  try {
    const item = await prisma.item.update({
      where: {
        id
      },
      data: {
        dateSold: new Date().toISOString()
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