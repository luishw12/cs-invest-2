import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "DELETE") {
    // delete item
    await deleteItemHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function deleteItemHandler(req: any, res: any) {
  const { id } = req.query;

  try {
    const item = await prisma.item.delete({
      where: {
        id
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