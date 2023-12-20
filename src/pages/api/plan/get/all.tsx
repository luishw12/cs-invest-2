import { Prisma } from "@prisma/client";
import {prisma} from "../../../../../lib/prisma";
export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    // get plans
    await getPlansHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
async function getPlansHandler(req: any, res: any) {
  try {
    const plans = await prisma.plan.findMany()
    return res.status(201).json({ plans });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}