import { Prisma } from "@prisma/client";
import {prisma} from "../../../../lib/prisma";

export default async function handle(req: any, res: any) {
  if (req.method === "PUT") {
    // edit user
    await editUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function editUserHandler(req: any, res: any) {
  const { id, ...body } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...body,
      },
    });

    return res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}